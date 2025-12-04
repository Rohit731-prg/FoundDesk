import { z } from 'zod';

export const ClaimSchema = z.object({
    item_id: z.string().min(1, "Item ID is required"),
    claim_by: z.string(),
    proof: z.string().default(""),
    claim_date: z.string(),
    status: z.enum(['pending', 'approved', 'rejected']).default('pending'),
});