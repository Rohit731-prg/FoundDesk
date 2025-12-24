import { Context } from "hono";
import { ItemSchma } from "../Model/ItemModel";
import { collection_item } from "../Config/DbConnection";
import { ObjectId } from "mongodb";
import { deleteImage, generateUrl } from "../Utils/uploadImage";

export const postItem = async (c: Context) => {
    const formData = await c.req.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const location = formData.get("location") as string;
    const post_by = formData.get("post_by") as string;
    const image = formData.get("image") as File | null;

    const UpdateItemSchema = ItemSchma.partial();
    const parsed = UpdateItemSchema.safeParse({
        title,
        description,
        category,
        location,
    });

    if (!parsed.success) {
        const errors = parsed.error.flatten().fieldErrors;
        return c.json({ message: "Validation failed", errors }, 400);
    }

    if (!image) return c.json({ message: "Image is required" }, 400);
    try {
        let postBy = c.get("staff");
        if (!postBy) postBy = c.get("admin");
        if (!postBy) return c.json({ message: "Admin or Staff not found" }, 404);
        const imageDetails = await generateUrl(image as File);
        const url = (imageDetails as any).url;
        const public_id = (imageDetails as any).public_id;

        const newItem = {
            title,
            description,
            category,
            location,
            post_by: new ObjectId(postBy._id),
            status: "open",
            image: url,
            image_public_id: public_id,
            createdAt: new Date(),
        };

        await collection_item.insertOne(newItem);
        return c.json({ message: "Item posted successfully" }, 201);
    } catch (error: any) {
        console.log(error as Error);
        return c.json({ message: error.message }, 500);
    }
}

export const updateItemStatus = async (c: Context) => {
    const { id } = c.req.param();
    const { title, description, category, location, status } = await c.req.json();
    if (!id) return c.json({ message: "Item ID is required" }, 400);

    const parsed = ItemSchma.safeParse({ title, description, category, location, status });
    if (!parsed.success) {
        const errors = parsed.error.flatten().fieldErrors;
        return c.json({ message: "Validation failed", errors }, 400);
    }
    try {
        const item = await collection_item.findOne({ _id: new ObjectId(id) });
        if (!item) return c.json({ message: "Item not found" }, 404);

        await collection_item.updateOne({ _id: new ObjectId(id) }, { $set: { status, title, description, category, location } });
        return c.json({ message: "Item status updated successfully" }, 200);
    } catch (error: any) {
        return c.json({ message: error.message }, 500);
    }
}

export const deleteItem = async (c: Context) => {
    const { id } = c.req.param();
    if (!id) return c.json({ message: "Item ID is required" }, 400);

    try {
        const item = await collection_item.findOne({ _id: new ObjectId(id) });
        if (!item) return c.json({ message: "Item not found" }, 404);

        const deleteimage = await deleteImage(item.image_public_id);
        if ((deleteimage as any).result !== 'ok') {
            await collection_item.deleteOne({ _id: new ObjectId(id) });
            return c.json({ message: "Item deleted successfully but image not deleted from cloud" }, 200);
        }
        await collection_item.deleteOne({ _id: new ObjectId(id) });

        return c.json({ message: "Item deleted successfully" }, 200);
    } catch (error: any) {
        return c.json({ message: error.message }, 500);
    }
}

export const getAllItems = async (c: Context) => {
    try {
        const items = await collection_item.aggregate([
            {
                $lookup: {
                    from: "admins",
                    localField: "post_by",
                    foreignField: "_id",
                    as: "post_by",
                    pipeline: [
                        { $project: { password: 0, __v: 0 } }
                    ]
                }
            }, {
                $unwind: "$post_by"
            }
        ]).toArray();
        if (items.length === 0) return c.json({ message: "No items found" }, 404);
        return c.json({ items }, 200);
    } catch (error) {
        return c.json({ message: (error as Error).message }, 500);
    }
}

export const getitemByFilter = async (c: Context) => {
    const { category } = await c.req.json();
    const parse = ItemSchma.pick({ category: true }).safeParse({ category });
    if (!parse.success) {
        const errors = parse.error.flatten().fieldErrors;
        return c.json({ message: "Validation failed", errors }, 400);
    }
    try {
        const items = await collection_item.aggregate([
            {
                $match: { category },
            }, {
                $lookup: {
                    from: "admins",
                    localField: "post_by",
                    foreignField: "_id",
                    as: "post_by",
                    pipeline: [
                        { $project: { password: 0, __v: 0 } }
                    ]
                }
            }, {
                $unwind: "$post_by"
            }
        ]).toArray();

        if (items.length === 0) return c.json({ message: "No items found for this category" }, 404);
        return c.json({ items }, 200);
    } catch (error: any) {
        return c.json({ message: error.message }, 500);
    }
}