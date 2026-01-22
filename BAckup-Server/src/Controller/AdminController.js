export const insertAdmin = async (req, res) => {
    // const {name, email, phone, adminID, password,  image, image_public_id, createdAt, role} = req.body();
    const data = req.body();
    try {
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}