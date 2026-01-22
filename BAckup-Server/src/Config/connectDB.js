import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URL);
        console.log("Database is connected to: ", conn.connection.host);
    } catch (error) {
        console.log("Error from connect DB: ", error);
    }
}