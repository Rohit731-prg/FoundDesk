import { Hono } from "hono";
import { verifyMiddleware } from "../Middleware/verify";
import { deleteClaim, getAllClaims, getAllClaimsByStudent, requestClaim, updateClaimStatus } from "../Service/ClaimService";

const router = new Hono();

router.post("/claimItem", verifyMiddleware, requestClaim);
router.put("/changeStatus/:id", verifyMiddleware, updateClaimStatus);
router.get("/getAllClaimsByStudent", verifyMiddleware, getAllClaimsByStudent);
router.get("/getAllClaims", verifyMiddleware, getAllClaims);
router.delete("/deleteClaim/:id", verifyMiddleware, deleteClaim);

export default router;