import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export default async function connect() {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI);
        if (!connection) throw new Error("Connection to the database failed");
        console.log("Successfully connected to the database");
    } catch (error) {
        console.error("Error connecting to database: ", error);
    }
}