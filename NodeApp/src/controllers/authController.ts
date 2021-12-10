import { NextFunction, Request, Response } from "express";
import { omit } from "lodash";
import { createUser } from "../services/user.service";

const signUpController = async ( 
    req: Request,
    res: Response,
    next: NextFunction
    ) => {
    try {
        const user = await createUser(req.body);
        return res.send(omit(user.toJSON(), "password"))
     } catch (e) {
        //  let Error=e as mongoose.Error;
         res.send({message:e+""}).sendStatus(409);//confilct  on email
    }
}



export {
    signUpController
};
