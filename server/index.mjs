import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connect from './connection.mjs';
import routes from './routes/routes.mjs';

dotenv.config(); // Ensure this is called before using any environment variables

const app = express();
const port = process.env.PORT || 5000;

connect();

app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(bodyParser.json());
<<<<<<< HEAD
app.use(cookieParser());
=======
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

>>>>>>> 0e77bbc (inventory)
app.use('/api', routes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});