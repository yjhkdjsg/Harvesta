
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.mjs';
import nodemailer from 'nodemailer';

const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const { name, email, phone, address, password, confirmpassword } = req.body;
        if (!name || !email || !phone || !address || !password || !confirmpassword) {
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

        const user = new User({ name, email, phone, address, password: hashedPassword });
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

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, 'your_jwt_secret_key', {
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
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.UNAME, // Replace with your Mailtrap username
                pass: process.env.PWORD // Replace with your Mailtrap password
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

        // Update the user's password and clear the OTP
        user.password = hashedPassword;
        user.otp = null;
        await user.save({ validateBeforeSave: false });

        return res.status(200).json({ message: "Password reset successful!" });
    } catch (error) {
        console.error('Error during verifying OTP:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default router;