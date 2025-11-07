import { z } from 'zod';

export const ItemSchma = z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    location: z.string(),
    post_by: z.string(),
    status: z.enum(['open', 'claimed', 'closed']),
    image: z.string().optional(),
    image_public_id: z.string().optional(),
    createdAt: z.date().optional(),
})