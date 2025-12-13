import { Hono } from "hono";
import { getAllQuestionByStudent } from "../Service/QuestionService";

const router = new Hono();

router.get("/getAllQuestions/:id", getAllQuestionByStudent);

export default router;