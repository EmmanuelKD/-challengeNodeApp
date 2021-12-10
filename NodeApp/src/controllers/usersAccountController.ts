import { Request, Response, NextFunction } from "express";

const sendVerifyEmail= async (req: Request, res: Response) => {

    res.send("cool")
}
const verifyEmail = (req: Request, res: Response) => {

    res.send("cool")
}
const updateUsersAccount = (req: Request, res: Response) => {
    res.send("cool")
}

const deleteUsersAccount = (req: Request, res: Response) => {
    res.send("cool")
}

 



export {
    verifyEmail,
    updateUsersAccount,
    deleteUsersAccount,
    sendVerifyEmail
}