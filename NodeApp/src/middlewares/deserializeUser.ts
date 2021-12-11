import { DeckRounded } from "@mui/icons-material";
import { Request, Response, NextFunction } from "express";
import { get } from "lodash"
import { nextTick } from "process";
import log from "../logger";
import { reIssueAccessToken } from "../services/session.service";
import { decode } from "../utils/JWT.util";

const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
    try{
    log.info("verifying token ")
    const accessToken = get(req, "headers.authorization", "").replace(/^Bearer\s/, "");

    const refreshToken = get(req, "headers.x-refresh");
    if (!accessToken) {
        log.info("done verifying token 1")
        return next();}

    const { decoded, expired, } = decode(accessToken);

    if (decoded) {
        //@ts-ignore
        req.user = decoded;
        log.info("done verifying token 2")
        return next();
    }

    if (expired && refreshToken) {
         const newAccessToken = await reIssueAccessToken({ refreshToken });

        if (newAccessToken) {
            // add the new accwss token to the refresf token
            res.setHeader("x-access-token", newAccessToken);
            const { decoded } = decode(newAccessToken)

            //@ts-ignore
            req.user = decoded;

        }
        log.info("done verifying token 3")
        return next();

    }
    log.info("done verifying token 4")
    return next();

}catch(e){
    res.send(e+"").sendStatus(401)
}

}
export default deserializeUser;