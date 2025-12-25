import { Hono } from "hono";
import { verifyMiddleware } from "../Middleware/verify";
import { getAllClaims, requestClaim, updateClaimStatus } from "../Service/ClaimService";

const router = new Hono();

router.post("/claimItem", verifyMiddleware, requestClaim);
router.put("/changeStatus", verifyMiddleware, updateClaimStatus);
router.get("/getAllClaims", verifyMiddleware, getAllClaims);

export default router;