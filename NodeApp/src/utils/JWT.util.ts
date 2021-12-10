import JWT from "jsonwebtoken"
import config from "config"
import log from "../logger";


const privateKey = config.get("privateKey") as string;

export function signin(object: Object, options?: JWT.SignOptions | undefined) {
    return JWT.sign(object, privateKey, options);
}

export function decode(token: string) {
    try {
        const decoded = JWT.verify(token, privateKey);
        return { valid: true, expired: false, decoded }
    } catch (e) {
        log.error({ e });
        let newError = e as Error
        return { valid: false, expired: newError.message === "jwt expired", decoded: null }

    }
}