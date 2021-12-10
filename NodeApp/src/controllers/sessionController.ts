import config from "config";
import { Request, Response } from "express";
import { get } from "lodash";
import { createAccessToken, createSession } from "../services/session.service";
import { updateSecession, validatePassword } from "../services/user.service";
import { signin } from "../utils/JWT.util";

const signInController = async (req: Request, res: Response) => {
   try {
      // validate users password
      var user = await validatePassword(req.body);

      //create users session
      var session = await createSession(user._id, req.get("user-agent") || "");


      // var trUsr = user as (Omit<UserDocument, "password"> | LeanDocument<Omit<UserDocument, "password">>);

      // var trSess = session as (Omit<SessionDocument, "password"> | LeanDocument<Omit<SessionDocument, "password">>);

      const accessToken = await createAccessToken({
         user,
         sessionId: session._id
      })

      const refreshToken = signin(session, {
         expiresIn: config.get("refreshTokenTtl"),
      })

      res.send({ accessToken, refreshToken });

   } catch (e) {
      res.sendStatus(401).send({ message: e })
   }

}

const invalidateUsersSession = async (req: Request, res: Response) => {
   try {
      // the reason why we  are getting the users session is because the user was attached to the request object
       const sessionId = get(req, "user.session");
       var reval=await updateSecession({ _id: sessionId }, { valid: false });
       res.send(reval)
   } catch (e) {
      res.statusCode=401;
      res.send({ message: e })
   }

}


export {
   signInController,
   invalidateUsersSession// logout
};
