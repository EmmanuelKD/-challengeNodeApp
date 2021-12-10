import yup, { AnySchema } from "yup"
import { Request, Response, NextFunction } from "express"
import log from "../logger";
import { ConstructionOutlined } from "@mui/icons-material";
import { get } from "lodash"
// check if the user is passing the right data formatt
const requiresUser = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = get(req, "user");
        if (!user) {
            return res.sendStatus(403)
        }
        return next();
    } catch (e) {
        log.error(e)
        //bad req
        res.sendStatus(400).send(e + "")
    }
}

export default requiresUser;