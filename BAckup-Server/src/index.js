import express from "express";
import { connectDB } from "./Config/connectDB.js";
import 'dotenv/config'

const app = express();
const port = process.env.PORT || 7000

await connectDB();
app.listen(port, () => {
    console.log("Server is on port no: ", port)
});