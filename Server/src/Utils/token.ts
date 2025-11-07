import { sign } from "hono/jwt"

export const generateToken = async (payload: any) => {
    const serect_key = process.env.JWT_SECRET
    if (!serect_key) return false;
    
    return await sign(payload, serect_key);
}