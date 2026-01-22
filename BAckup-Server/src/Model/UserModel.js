import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    name: { type: string, require: true },
    email: { type: string, require: true },
    collage_id: { type: string, require: true },
    password: { type: string, require: true },
    role: { type: string, require: true },
    auth: { type: string, require: true },
});

export const User = mongoose.Model(UserSchema, "UserSchema");