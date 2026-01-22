import mongoose, { Schema } from "mongoose";

const ClaimSchema = new Schema({
    item_id: { type: string, require: true },
    claim_by: { type: string, require: true },
    proof: { type: string, require: true },
    claim_date: { type: string, require: true },
    status: { type: string, require: true },
});

export const Claim = mongoose.Model(ClaimSchema, "ClaimSchema");