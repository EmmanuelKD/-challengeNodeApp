import { DocumentDefinition, FilterQuery, UpdateQuery } from "mongoose"
import User, { UserDocument } from "../schemas/user.schema"
import { omit } from "lodash"
import Session, { SessionDocument, } from "../schemas/session/session.schema";

export async function createUser(input: DocumentDefinition<UserDocument>) {

    try {
        return await User.create(input);
    } catch (e) {
        throw new Error(e + "");
    }
}

export async function validatePassword({ email, password }: {
    email: UserDocument["email"];
    password: string;
}) {
    try {
        const user = await User.findOne({ email });
        if (!user) throw new Error("invalid user")

        const isValid = await user.comparePassword(password);

        if (!isValid) throw new Error("invalid credentials")

        return omit(user.toJSON(), "password")

    } catch (e) {
        throw new Error(e + "");
    }
}


export async function findUser(input: FilterQuery<UserDocument>) {

    try {
        return User.findOne(input).lean();

    } catch (e) {
        throw new Error(e + "");
    }
}


export async function updateSecession(query: FilterQuery<SessionDocument>, update: UpdateQuery<SessionDocument>) {

    try {
        return Session.updateOne(query, update);

    } catch (e) {
        throw new Error(e + "");
    }
}
