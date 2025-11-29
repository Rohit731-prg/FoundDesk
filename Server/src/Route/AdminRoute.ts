import { Hono } from "hono";
import { Login, Signup } from "../Service/AdminService";

const router = new Hono();

router.post("/signup", Signup);
router.post("/login", Login);

export default router;