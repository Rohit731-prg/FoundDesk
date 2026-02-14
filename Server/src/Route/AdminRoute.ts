import { Hono } from "hono";
import { getAllAdmins, Login, Signup, terminateAdmin } from "../Service/AdminService";
import { verifyMiddleware } from "../Middleware/verify";

const router = new Hono();

router.post("/signup", Signup);
router.post("/login", Login);
router.get("/getAllAdmis", verifyMiddleware, getAllAdmins);
router.delete('/terminate/:id', verifyMiddleware, terminateAdmin);

export default router;