import yup, { AnySchema } from "yup"
import { Request, Response, NextFunction } from "express"
import log from "../logger";
import { ConstructionOutlined } from "@mui/icons-material";

// check if the user is passing the right data formatt
const ValidateRequest = (schema: AnySchema) => async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        await schema.validate({
            body: req.body,
            query: req.query,
            params: req.params
        });

        return next();
    } catch (e) {
         log.error(e)
        //bad req
        res.sendStatus(400).send(e+"")
    }
}

export default ValidateRequest;