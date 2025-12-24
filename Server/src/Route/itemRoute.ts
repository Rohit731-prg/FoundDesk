import { Hono } from "hono";
import { deleteItem, getAllItems, getitemByFilter, postItem, updateItemStatus } from "../Service/ItemService";
import { verifyMiddleware } from "../Middleware/verify";

const router = new Hono();

router.get("/getAllItems", verifyMiddleware, getAllItems);
router.post("/getAllItemsByFilter", verifyMiddleware, getitemByFilter);
router.post("/createItem", verifyMiddleware, postItem);
router.delete("/deleteItem/:id", verifyMiddleware, deleteItem);
router.delete("/updateItem/:id", verifyMiddleware, updateItemStatus);

export default router;