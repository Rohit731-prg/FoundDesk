import { z } from 'zod';

export const UserSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    collage_id: z.string(),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    role: z.enum(['admin', 'student']),
    auth: z.boolean().default(false),
});