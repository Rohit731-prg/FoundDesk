import { Hono } from "hono";
import { askQuestion, getAllQuestionByStudent, getStudentList } from "../Service/QuestionService";
import { verifyMiddleware } from "../Middleware/verify";

const router = new Hono();

router.get("/getAllQuestions/:id", getAllQuestionByStudent);
router.post("/askQuestion", verifyMiddleware, askQuestion);
router.get("/getStudents", verifyMiddleware, getStudentList);

export default router;