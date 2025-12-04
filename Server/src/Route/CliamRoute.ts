import { Hono } from "hono";
import { verifyMiddleware } from "../Middleware/verify";
import { requestClaim, updateClaimStatus } from "../Service/ClaimService";

const router = new Hono();

router.post("/claimItem", verifyMiddleware, requestClaim);
router.put("/shangeStatus", verifyMiddleware, updateClaimStatus);

export default router;