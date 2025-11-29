import { z } from "zod";

export const AdminSchema = z.object({
    name: z.string(),
    email: z.string().email('Invalid email address'),
    phone: z.string(),
    adminID: z.string().min(1, 'Admin ID is required'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    image: z.string().optional(),
    image_public_id: z.string().optional(),
    createdAt: z.date().optional(),
    role: z.enum(['admin', 'student']),
});