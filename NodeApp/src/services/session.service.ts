import { DocumentDefinition } from "mongoose"
import User, { UserDocument } from "../schemas/user.schema"
import Session, { SessionDocument } from "../schemas/session/session.schema"
import { omit } from "lodash";
import { LeanDocument } from "mongoose"
import { decode, signin } from "../utils/JWT.util";
import config from "config"
import { get } from "lodash"
import { findUser } from "./user.service";
export async function createSession(userId: UserDocument["_id"], userAgent: string) {

    try {
        const session = await Session.create({ User: userId, userAgent });
        return omit(session.toJSON());
    } catch (e) {
        throw new Error(e + "");
    }
}

export async function createAccessToken({ user, sessionId }: {
    user: Object
    // | Omit<UserDocument, "password">
    // | LeanDocument<Omit<UserDocument, "password">>
    ,
    sessionId: SessionDocument["_id"]
    // | Omit<SessionDocument, "password">
    // | LeanDocument<Omit<SessionDocument, "password">>,
}) {

    try {
        //sign the access token
        const token = signin(
            { ...user, session: sessionId },
            {
                expiresIn: config.get("accessTokenTtl") as string
            }
        );
        return token;
    } catch (e) {
        throw new Error(e + "");
    }
}



export async function reIssueAccessToken({ refreshToken }: {
    refreshToken: string

}) {
    try {
        // decode the tokenn
        const { decoded } = decode(refreshToken);
        if (!decoded || !get(decoded, "_id")) throw new Error("invalid token");

        //get the session
        const session = await Session.findById(get(decode, "_id"));

        // validate the session
        if (!session || !session?.valid) throw new Error("invalid session");

        const user = await findUser({ _id: session.user });

        if (!user) return false;
        const accessToken = createAccessToken({ user, sessionId: session._id });

        return accessToken;
    } catch (e) {
        throw new Error(e + "");
    }
}