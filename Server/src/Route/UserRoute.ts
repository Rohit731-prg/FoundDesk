import { Hono } from "hono";
import { authenticateUser, login, logout, signUp } from "../Service/UserService";
import { verifyMiddleware } from "../Middleware/verify";

const router = new Hono();

router.post("/signup", signUp);
router.post("/login", login);
router.put("/authenticate", verifyMiddleware, authenticateUser);
router.get("/logout", logout);

export default router;