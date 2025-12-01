import { Context } from "hono";
import { collection_user } from "../Config/DbConnection";
import * as bcrypt from "bcryptjs";
import { generateToken } from "../Utils/token";
import { setCookie } from "hono/cookie";
import { UserSchema } from "../Model/UserModel";
import { generateUrl } from "../Utils/uploadImage";
import { ObjectId } from "mongodb";
import { password } from "bun";

export const signUp = async (c: Context) => {
    const formData = await c.req.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const collage_id = formData.get("collage_id") as string;
    const password = formData.get("password") as string;
    const role = formData.get("role") as string;
    const image = formData.get("image") as File | null;

    const parsed = UserSchema.safeParse({ name, email, collage_id, password, role });

    if (!parsed.success) {
        const errors = parsed.error.flatten().fieldErrors;
        return c.json({ message: "Validation failed", errors }, 400);
    }
    if (!image) return c.json({ message: "Image is required" }, 400);

    try {
        const is_exist = await collection_user.findOne({ email });
        if (is_exist) return c.json({ message: "User already exists" }, 400);

        const hashedPassword = await bcrypt.hash(password, 10);
        const imageUrl = await generateUrl(image as File);
        const url = (imageUrl as any).url;
        const public_id = (imageUrl as any).public_id;
        const newUser = {
            name,
            email,
            collage_id,
            password: hashedPassword,
            image: url,
            image_public_id: public_id,
            role,
            createdAt: new Date(),
            auth: false,
        };

        await collection_user.insertOne(newUser);
        return c.json({ message: "User registered successfully" }, 201);
    } catch (error: any) {
        return c.json({ message: error.message }, 500);
    }
}

export const login = async (c: Context) => {
    const { email, password } = await c.req.json();
    if (!email || !password) return c.json({ message: "Email and password are required" }, 400);
    try {
        const user = await collection_user.findOne({ email });
        if (!user) return c.json({ message: "User not found" }, 404);

        const compair = await bcrypt.compare(password, user.password);
        if (!compair) return c.json({ message: "Invalid credentials" }, 401);
        if (!user.auth) return c.json({ message: "User is not authenticated" }, 400);

        const token = await generateToken({ id: user._id, email: user.email, role: user.role });
        if (!token) return c.json({ message: "Failed to generate token" }, 500);

        setCookie(c, "token", token, { httpOnly: true, secure: false, sameSite: "strict", path: "/" });
        const userDetails = {
            _id: user._id,
            name: user.name,
            email: user.email,
            collage_id: user.collage_id,
            image: user.image,
        }
        return c.json({ message: "Login successful", user: userDetails, token: token }, 200);
    } catch (error) {
        return c.json({ message: "Internal server error" }, 500);
    }
}

export const authenticateUser = async (c: Context) => {
    const { email } = await c.req.json();
    if (!email) return c.json({ message: "Email is required" }, 400);

    try {
        const user = await collection_user.findOne({ email });
        if (!user) return c.json({ message: "User not found" }, 404);
        if (user.auth) return c.json({ message: "User is already authenticated" }, 400);

        await collection_user.updateOne({ email }, { $set: { auth: true } });
        return c.json({ message: "User authenticated successfully" }, 200);
    } catch (error) {
        return c.json({ message: (error as Error).message }, 500);
    }
}

export const logout = async (c: Context) => {
    try {
        setCookie(c, "token", "", {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            path: "/",
            maxAge: 0, // delete cookie
        });

        return c.json({ message: "Logout successful" }, 200);
    } catch (error) {
        return c.json({ message: (error as Error).message }, 500);
    }
}

export const updatePassword = async (c: Context) => {
    const { oldPassword, newPassword } = await c.req.json();
    if (!oldPassword || !newPassword) return c.json({ message: "Old and new password are required" }, 400);
    const student = c.get("student");
    try {
        const compair = await bcrypt.compare(oldPassword, student?.password as string);
        if (!compair) return c.json({ message: "Password not match" }, 404);
        if (oldPassword == newPassword) return c.json({ message: "Old and new password are same" }, 400);
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await collection_user.updateOne({ _id: new ObjectId(student?._id) }, { $set: { password: hashedPassword } });
        const newUserDetails = {
            _id: student?._id,
            name: student?.name,
            email: student?.email,
            collage_id: student?.collage_id,
            image: student?.image,
        };
        return c.json({ message: "Password is updated successfully", user: newUserDetails }, 200);
    } catch (error: any) {
        return c.json({ message: error.message as string });
    }
}