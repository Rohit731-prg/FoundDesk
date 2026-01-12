import { Context } from "hono";
import { collection_claim, collection_item, collection_user } from "../Config/DbConnection";
import { ObjectId } from "mongodb";
import { generateUrl } from "../Utils/uploadImage";

export const requestClaim = async (c: Context) => {
    const fromData = await c.req.formData();
    const item_id = fromData.get("item_id") as string;
    const proof = fromData.get("proof") as File | null;

    if (!item_id || !proof) return c.json({ message: "Item ID and proof is required" }, 400);

    try {
        const item_exists = await collection_item.findOne({ _id: new ObjectId(item_id) });
        if (!item_exists) return c.json({ message: "Item not found" }, 404);

        const claim_by = c.get("student");
        const user_has_claimed = await collection_user.findOne({ _id: new ObjectId(claim_by._id) });
        if (!user_has_claimed) return c.json({ message: "User not found" }, 404);
        if (!user_has_claimed?.auth) return c.json({ message: "User is not verified yet" });

        const is_exist = await collection_claim.findOne({ item_id, claim_by });
        console.log(is_exist);
        if (is_exist) return c.json({ message: "User already claim for this item! " });

        const imageDetails = await generateUrl(proof as File);
        const proof_url = (imageDetails as any).url;
        const proof_public_id = (imageDetails as any).public_id;

        const newClaim = {
            item_id: new ObjectId(item_id),
            claim_by: new ObjectId(claim_by._id),
            proof: proof_url,
            proof_public_id: proof_public_id,
            claim_date: new Date(),
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
        console.log(id);
        const claim = await collection_claim.findOne({ _id: new ObjectId(id) });
        if (!claim) return c.json({ message: "Claim not found" }, 404);

        if (!['pending', 'approved', 'rejected'].includes(status)) return c.json({ message: "Invalid status value" }, 400);
        if (claim.status === status) return c.json({ message: `Claim is already ${status}` }, 400);

        await collection_claim.updateOne({ _id: new ObjectId(id) }, { $set: { status } });
        await collection_item.updateOne({ _id: claim.item_id }, { $set: { status: "claimed" }});
        return c.json({ message: `Claim status updated to ${status}` }, 200);
    } catch (error) {
        return c.json({ message: (error as Error).message }, 500);
    }
}

export const getAllClaimsByStudent = async (c: Context) => {
    const student = c.get("student");
    try {
        const claims = await collection_claim.aggregate([
            {
                $match: {
                    claim_by: student._id
                },
            },
            {
                $sort: { claim_date: -1 },
            },
            {
                $lookup: {
                    from: "items",
                    localField: "item_id",
                    foreignField: "_id",
                    as: "item",
                    pipeline: [
                        { $project: { __v: 0 } },
                    ],
                },
            },
            {
                $unwind: "$item",
            },
        ]).toArray();
        if (!claims) return c.json({ message: "No data found " }, 400);

        return c.json({ claims });
    } catch (error) {
        return c.json({ message: (error as Error).message }, 500);
    }
}

export const getAllClaims = async (c: Context) => {
    try {
        const claims = await collection_claim.aggregate([
            {
                $sort: { claim_date: -1 },
            },
            {
                $lookup: {
                    from: "items",
                    localField: "item_id",
                    foreignField: "_id",
                    as: "item",
                    pipeline: [
                        { $project: { __v: 0 } },
                    ],
                }
            },
            {
                $unwind: "$item",
            },
            {
                $lookup: {
                    from: "users",
                    localField: "claim_by",
                    foreignField: "_id",
                    as: "student",
                    pipeline: [
                        { $project: { password: 0, __v: 0, auth: 0 } },
                    ],
                }
            },
            {
                $unwind: "$student"
            }
        ]).toArray();
        if (!claims) return c.json({ message: "No data found " }, 400);
        return c.json({ claims });
    } catch (error) {
        return c.json({ message: (error as Error).message }, 500);
    }
}

export const deleteClaim = async (c: Context) => {
    const { id } = c.req.param();
    try {
        const result = await collection_claim.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) return c.json({ message: "Claim not found" }, 404);
        return c.json({ message: "Claim deleted successfully" }, 200);
    } catch (error) {
        return c.json({ message: (error as Error).message }, 500);
    }
}