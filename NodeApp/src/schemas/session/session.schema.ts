import mongoose from "mongoose"
import bcrypt from "bcrypt"
import pion from "pino"
import config from "config"
import { UserDocument } from "../user.schema"

export interface SessionDocument extends mongoose.Document {
    user: UserDocument["_id"];
    valid: boolean;
    usersAgent: Date;
    deleted_at: Date;
    updated_at: Date;
    created_at: Date;
}


const SessionSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        valid: { type: Boolean, default: true },
        usersAgent: { type: String },
    }
    , {
        timestamps: true
    }
)

 

export default mongoose.model<SessionDocument>("Session", SessionSchema);