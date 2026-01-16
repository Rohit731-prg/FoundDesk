import { Hono } from "hono";
import { getAllAdmins, Login, Signup } from "../Service/AdminService";
import { verifyMiddleware } from "../Middleware/verify";

const router = new Hono();

router.post("/signup", Signup);
router.post("/login", Login);
router.get("/getAllAdmis", verifyMiddleware, getAllAdmins);

export default router;