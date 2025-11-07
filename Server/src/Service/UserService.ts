import { Context } from "hono";
import { collection_user } from "../Config/DbConnection";
import * as bcrypt from "bcryptjs";
import { generateToken } from "../Utils/token";
import { setCookie } from "hono/cookie";
import { UserSchema } from "../Model/UserModel";
import { generateUrl } from "../Utils/uploadImage";

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

        const token = await generateToken({ id: user._id, email: user.email, role: user.role });
        if (!token) return c.json({ message: "Failed to generate token" }, 500);

        setCookie(c, "token", token, { httpOnly: true, secure: true, sameSite: "strict", path: "/" });
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