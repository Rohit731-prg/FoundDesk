import { MongoClient } from "mongodb";

if (!process.env.DB_URL) {
    throw new Error("DB_URL is not defined in environment variables");
}

const url = process.env.DB_URL

const client = new MongoClient(url);
export const db = client.db("lost_and_find");

export const collection_user = db.collection("users");
export const collection_item = db.collection("items");