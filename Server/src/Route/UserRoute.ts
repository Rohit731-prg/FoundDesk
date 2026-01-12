import { Hono } from "hono";
import { authenticateUser, getAllStudents, login, logout, signUp, updatePassword } from "../Service/UserService";
import { verifyMiddleware } from "../Middleware/verify";

const router = new Hono();

router.post("/signup", signUp);
router.post("/login", login);
router.put("/authenticate", verifyMiddleware, authenticateUser);
router.put("/updatePassword", verifyMiddleware, updatePassword);
router.get("/logout", logout);

router.get("/getAllStudents", verifyMiddleware, getAllStudents);

export default router;