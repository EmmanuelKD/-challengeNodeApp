import mongoose from "mongoose"
import bcrypt from "bcrypt"
import pion from "pino"
import config from "config"

export interface UserDocument extends mongoose.Document {
    name: string;
    email: string;
    deleted_at: Date;
    updated_at: Date;
    created_at: Date;
    password: string;
    comparePassword(inputedPassword: string): Promise<boolean>;
}


const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: false },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, },
        deleted_at: { type: Date, required: false, },
        updated_at: { type: Date, required: false, },
        created_at: { type: Date, required: false, },
    }
    , {
        timestamps: true
    }
)

// before savinng users data , we hash the password
UserSchema.pre("save", async function (next) {
    const user = this as UserDocument;
    if (!user.isModified("password")) return next();
    const hashSalt = await bcrypt.genSalt(config.get("saltFactory"));
    const hash = await bcrypt.hashSync(user.password, hashSalt);
    user.password = hash;

    return next();
})
//login functionality
UserSchema.methods.comparePassword = async function (inputedPassword: string) {
    const user = this as UserDocument;
    return bcrypt.compare(inputedPassword, user.password).catch(e => false);

}

export default mongoose.model<UserDocument>("User", UserSchema);