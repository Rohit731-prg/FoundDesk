import { Context } from "hono";
import { ItemSchma } from "../Model/ItemModel";
import { collection_item, collection_user } from "../Config/DbConnection";
import { ObjectId } from "mongodb";
import { deleteImage, generateUrl } from "../Utils/uploadImage";

export const postItem = async (c: Context) => {
    const formData = await c.req.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const location = formData.get("location") as string;
    const post_by = formData.get("post_by") as string;
    const status = formData.get("status") as string;
    const image = formData.get("image") as File | null;

    const parsed = ItemSchma.safeParse({ title, description, category, location, post_by, status });

    if (!parsed.success) {
        const errors = parsed.error.flatten().fieldErrors;
        return c.json({ message: "Validation failed", errors }, 400);
    }
    if (!image) return c.json({ message: "Image is required" }, 400);
    try {
        const user = await collection_user.findOne({ _id: new ObjectId(post_by) });
        if (!user) return c.json({ message: "User not found" }, 404);
        if (user.role !== 'admin') return c.json({ message: "Only admin can post items" }, 403);

        const imageDetails = await generateUrl(image as File);
        const url = (imageDetails as any).url;
        const public_id = (imageDetails as any).public_id;

        const newItem = {
            title,
            description,
            category,
            location,
            post_by: new ObjectId(post_by),
            status,
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
    const { status } = await c.req.json();
    if (!id) return c.json({ message: "Item ID is required" }, 400);

    const parsed = ItemSchma.safeParse({ status });
    if (!parsed.success) {
        const errors = parsed.error.flatten().fieldErrors;
        return c.json({ message: "Validation failed", errors }, 400);
    }
    try {
        const item = await collection_item.findOne({ _id: new ObjectId(id) });
        if (!item) return c.json({ message: "Item not found" }, 404);

        await collection_item.updateOne({ _id: new ObjectId(id) }, { $set: { status } });
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
            return c.json({ message: "Failed to delete image from cloudinary" }, 500);
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
                    from: "users",
                    localField: "post_by",
                    foreignField: "_id",
                    as: "user",
                    pipeline: [
                        { $project: { password: 0, __v: 0 } }
                    ]
                }
            }, {
                $unwind: "$user"
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
    if (!category) return c.json({ message: "Category is required" }, 400);
    console.log(category);
    try {
        const items = await collection_item.aggregate([
            {
                $match: { category },
                $lookup: {
                    from: "users",
                    localField: "post_by",
                    foreignField: "_id",
                    as: "user",
                    pipeline: [
                        { $project: { password: 0, __v: 0 } }
                    ]
                }
            }, {
                $unwind: "$user"
            }
        ]).toArray();

        if (items.length === 0) return c.json({ message: "No items found for this category" }, 404);
        return c.json({ items }, 200);
    } catch (error: any) {
        return c.json({ message: error.message }, 500);
    }
}