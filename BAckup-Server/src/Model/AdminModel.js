import mongoose, { Schema } from "mongoose";

const AdminSchema = new Schema({
    name: { type: string, require: true },
    email: { type: string, require: true },
    phone: { type: string, require: true },
    adminID: { type: string, require: true },
    password: { type: string, require: true },
    image: { type: string, require: true },
    image_public_id: { type: string, require: true },
    createdAt: { type: Date, require: true },
    role: { type: string, require: true },
});

export const Admin = mongoose.Model(AdminSchema, "AdminSchema");