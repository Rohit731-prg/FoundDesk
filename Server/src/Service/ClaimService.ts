import { Context } from "hono";
import { ClaimSchema } from "../Model/ClaimsModel";
import { collection_claim, collection_item, collection_user } from "../Config/DbConnection";
import { ObjectId } from "mongodb";
import { generateUrl } from "../Utils/uploadImage";

export const requestClaim = async (c: Context) => {
    try {
        const fromData = await c.req.formData();
        const item_id = fromData.get("item_id") as string;
        const claim_by = fromData.get("claim_by") as string;
        const proof = fromData.get("proof") as File | null;
        const claim_date = fromData.get("claim_date") as string;

        const parsed = ClaimSchema.safeParse({ item_id, claim_by, claim_date });
        if (!parsed.success) {
            const errors = parsed.error.flatten().fieldErrors;
            return c.json({ message: "Validation failed", errors }, 400);
        }
        if (!proof) return c.json({ message: "Proof is required" }, 400);

        const item_exists = await collection_item.findOne({ _id: new ObjectId(item_id) });
        if (!item_exists) return c.json({ message: "Item not found" }, 404);

        const user_has_claimed = await collection_user.findOne({ _id: new ObjectId(claim_by) });
        if (!user_has_claimed) return c.json({ message: "User not found" }, 404);

        
        if (user_has_claimed.role !== 'user') return c.json({ message: "Only users can claim items" }, 403);

        const imageDetails = await generateUrl(proof as File);
        const proof_url = (imageDetails as any).url;
        const proof_public_id = (imageDetails as any).public_id;

        const newClaim = {
            item_id,
            claim_by,
            proof: proof_url,
            proof_public_id: proof_public_id,
            claim_date,
            status: 'pending'
        };

        await collection_claim.insertOne(newClaim);
        return c.json({ message: "Claim request submitted successfully" }, 201);
    } catch (error: any) {
        return c.json({ message: error.message }, 500);
    }
}

export const updateClaimStatus = async (c: Context) => {
    const { id } = c.req.param();
    const { status } = await c.req.json();
    if (!status) return c.json({ message: "Status is required" }, 400);

    try {
        const claim = await collection_claim.findOne({ _id: new ObjectId(id) });
        if (!claim) return c.json({ message: "Claim not found" }, 404);

        if (!['pending', 'approved', 'rejected'].includes(status)) return c.json({ message: "Invalid status value" }, 400);
        if (claim.status === status) return c.json({ message: `Claim is already ${status}` }, 400);

        await collection_claim.updateOne({ _id: new ObjectId(id) }, { $set: { status } });
        return c.json({ message: `Claim status updated to ${status}` }, 200);
    } catch (error) {
        return c.json({ message: (error as Error).message }, 500);
    }
}