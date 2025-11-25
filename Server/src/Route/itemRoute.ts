import { Hono } from "hono";
import { getAllItems, getitemByFilter, postItem } from "../Service/ItemService";
import { verifyMiddleware } from "../Middleware/verify";

const router = new Hono();

router.get("/getAllItems", verifyMiddleware, getAllItems);
router.post("/getAllItemsByFilter", verifyMiddleware, getitemByFilter);
router.post("/createItem", verifyMiddleware, postItem);

export default router;