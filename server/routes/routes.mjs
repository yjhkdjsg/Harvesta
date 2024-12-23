import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.mjs';
import Inventory from '../models/inventory.mjs';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uploadsDir = path.join(__dirname, '../uploads');


if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

dotenv.config();

const router = express.Router();

const authenticateUser = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        console.log('No auth header');
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        console.log('No token');
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        console.log('Authenticated user ID:', req.userId); // Log the user ID for debugging
        next();
    } catch (error) {
        console.log('Token verification failed', error);
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

router.post('/signup', async (req, res) => {
    try {
        const { name, email, phone, address, password, confirmpassword, userType, kccNumber, bankName } = req.body;
        if (!name || !email || !phone || !address || !password || !confirmpassword || !userType) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (password !== confirmpassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            phone,
            address,
            password: hashedPassword,
            userType,
            kccNumber: userType === 'Farmer' ? kccNumber : null,
            bankName: userType === 'Farmer' ? bankName : null
        });
        await user.save();

        res.status(200).json({ message: 'Signup successful!' });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password, phone } = req.body;
    try {
        if (!email || !password || !phone) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        if (user.phone !== phone) {
            return res.status(400).json({ message: "Invalid phone number" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: true
        });

        res.status(200).json({ message: "User logged in successfully!", token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post('/send-otp', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        // Generate a random OTP
        const generateOtp = Math.floor(100000 + Math.random() * 900000);

        // Update the user's record with the generated OTP
        user.otp = generateOtp;
        await user.save({ validateBeforeSave: false });

        // Send the OTP to the user's email
        const transporter = nodemailer.createTransport({
            host: 'smtp.mailtrap.io',
            port: 587,
            auth: {
                user: process.env.UNAME, // Replace with your Mailtrap username
                pass: process.env.PWORD  // Replace with your Mailtrap password
            }
        });

        const mailOptions = {
            from: process.env.EMAIL, // Replace with your email
            to: email,
            subject: 'Password Reset OTP',
            text: `Your OTP for password reset is ${generateOtp}`
        };

        const info = await transporter.sendMail(mailOptions);

        if (info.messageId) {
            return res.status(200).json({ message: "OTP sent successfully" });
        } else {
            return res.status(500).json({ message: "Failed to send OTP" });
        }
    } catch (error) {
        console.error('Error during sending OTP:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post('/verify-otp', async (req, res) => {
    const { email, otp, newPassword } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        if (user.otp !== parseInt(otp)) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        user.otp = null;
        await user.save({ validateBeforeSave: false });

        return res.status(200).json({ message: "Password reset successful!" });
    } catch (error) {
        console.error('Error during verifying OTP:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'User logged out successfully!' });
});

router.get('/profile', authenticateUser, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password -otp');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post('/sell-items', authenticateUser, upload.single('image'), async (req, res) => {
    try {
        const { itemName, price, quantity, category } = req.body;
        const image = req.file ? req.file.path : null; 
        console.log('Request Body:', req.body); 
        console.log('User ID:', req.userId); 
        if (!itemName || !price || !quantity || !category) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newItem = new Inventory({
            itemName,
            price,
            quantity,
            category,
            user: req.userId,
            image 
        });

        await newItem.save();
        res.status(200).json({ message: 'Item added to inventory successfully!' });
    } catch (error) {
        console.error('Error adding item to inventory:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/inventory', authenticateUser, async (req, res) => {
    try {
        const inventoryItems = await Inventory.find({ user: req.userId });
        res.status(200).json(inventoryItems);
    } catch (error) {
        console.error('Error fetching inventory items:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/inventory/:id', authenticateUser, async (req, res) => {
    try {
        const itemId = req.params.id;
        const item = await Inventory.findById(itemId);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        if (item.user.toString() !== req.userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        res.status(200).json(item);
    } catch (error) {
        console.error('Error fetching item:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.put('/inventory/:id', authenticateUser, async (req, res) => {
    try {
        const itemId = req.params.id;
        const { itemName, price, quantity, category } = req.body;

        const item = await Inventory.findById(itemId);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        if (item.user.toString() !== req.userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        item.itemName = itemName;
        item.price = price;
        item.quantity = quantity;
        item.category = category;

        await item.save();
        res.status(200).json({ message: 'Item updated successfully' });
    } catch (error) {
        console.error('Error updating item:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.delete('/inventory/:id', authenticateUser, async (req, res) => {
    try {
        const itemId = req.params.id;
        const item = await Inventory.findById(itemId);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        if (item.user.toString() !== req.userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        await Inventory.findByIdAndDelete(itemId);
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default router;