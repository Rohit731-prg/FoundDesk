import cloudinary from "../Config/CoudinaryConfig";

export const generateUrl = async (file: File): Promise<object> => {
    try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const result = await new Promise((resolve, reject) => {
            const upload = cloudinary.uploader.upload_stream(
                { folder: "lost_and_found" },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            )
            upload.end(buffer);
        });

        const url = (result as any).secure_url;
        const public_id = (result as any).public_id;

        return { url, public_id };
    } catch (error: any) {
        console.log(error);
        return new Error(error.message);
    }
}

export const deleteImage = async (public_id: string) => {
    try {
        const result = await cloudinary.uploader.destroy(public_id);
        return result;
    } catch (error: any) {
        console.log(error);
        return false;
    }
}