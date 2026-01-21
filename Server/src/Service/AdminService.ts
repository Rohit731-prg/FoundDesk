import { Context } from "hono";
import { collection_Admin } from "../Config/DbConnection";
import * as bcrypt from "bcryptjs";
import { generateToken } from "../Utils/token";
import { setCookie } from "hono/cookie";
import { AdminSchema } from "../Model/AdminModel";
import { generateUrl } from "../Utils/uploadImage";
import { ObjectId } from "mongodb";

export const Login = async (c: Context) => {
    const { email, password } = await c.req.json();
    if ( !email || !password ) return c.json({ message: "Email and password are required" }, 400);

    try {
        const admin = await collection_Admin.findOne({ email });
        if (!admin) return c.json({ message: "Admin not found" }, 404);

        const compair = await bcrypt.compare(password, admin.password);
        if (!compair) return c.json({ message: "Invalid credentials" }, 401);

        const token = await generateToken({ id: admin._id, email: admin.email, role: admin.role });
        if (!token) return c.json({ message: "Failed to generate token" }, 500);

        setCookie(c, "token", token, { httpOnly: true, secure: false, sameSite: "strict", path: "/" });
        const adminDetails = {
            _id: admin._id,
            name: admin.name,
            email: admin.email,
            phone: admin.phone,
            image: admin.image,
            role: admin.role
        };
        return c.json({ message: "Login successful", admin: adminDetails }, 200);
    } catch (error: any) {
        return c.json({ message: error.message as string }, 500);
    }
}

export const Signup = async (c: Context) => {
    const formData = await c.req.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const adminID = formData.get("adminID") as string;
    const password = formData.get("password") as string;
    const role = formData.get("role") as string;
    const image = formData.get("image") as File | null;

    const parsed = AdminSchema.safeParse({ name, email, phone, adminID, password, role });
    if (!parsed.success) {
        const errors = parsed.error.flatten().fieldErrors;
        return c.json({ message: "Validation failed", errors }, 400);
    }
    if (!image) return c.json({ message: "Image is required" }, 400);

    try {
        const is_exist = await collection_Admin.findOne({ email });
        if (is_exist) return c.json({ message: "Admin already exists" }, 400);

        const hashPassword = await bcrypt.hash(password, 10);
        const imageURL = await generateUrl(image as File);

        const url = (imageURL as any).url;
        const public_id = (imageURL as any).public_id;

        const newAdmin = {
            name,
            email,
            phone,
            adminID,
            password: hashPassword,
            image: url,
            image_public_id: public_id,
            createdAt: new Date(),
            role: role
        };

        await collection_Admin.insertOne(newAdmin);
        return c.json({ message: "Signup successful" }, 200);
    } catch (error: any) {
        return c.json({ message: error.message as string }, 500);
    }
}

export const getAllAdmins = async (c: Context) => {
    try {
        const admins = await collection_Admin.find().toArray();
        if (!admins || admins.length === 0) return c.json({ message: "No Records found" }, 400);
        return c.json({ admins }, 200);
    } catch (error: any) {
        return c.json({ message: error.message}, 500)
    }
}

export const terminateAdmin = async (c: Context) => {
    const { id } = c.req.param();
    try {
        const adminID = c.get("admin");
        if (id === adminID) return c.json({ message: "You can't terminate yourself" });

        const admin = await collection_Admin.findOne({ _id: new ObjectId(id) });
        if (admin?.role == "admin") return c.json({ message: "You can't terminate Super admin" });

        
    } catch (error) {
        
    }
}