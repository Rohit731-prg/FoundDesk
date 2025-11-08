import { z } from 'zod';

export const ClaimSchema = z.object({
    item_id: z.string().min(1, "Item ID is required"),
    claim_by: z.string().min(1, "Claimed by is required"),
    proof: z.string().min(1, "Proof is required"),
    claim_date: z.string().min(1, "Claim date is required"),
    status: z.enum(['pending', 'approved', 'rejected']).default('pending'),
});