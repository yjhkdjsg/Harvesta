import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connect from './connection.mjs';
import routes from './routes/routes.mjs';

dotenv.config(); 

const app = express();
const port = process.env.PORT || 5000;

connect();

app.use(cors({
    origin: 'http://localhost:3000',
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Use body-parser middleware
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

app.use('/api', routes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});