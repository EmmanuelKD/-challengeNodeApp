
import { Express } from "express";
import { signUpController } from "./controllers/authController";
import { invalidateUsersSession, signInController } from "./controllers/sessionController";
import { deleteAllTransactions, deleteTransactionById, getAllTransactions ,makeTransaction,updateTransaction} from "./controllers/transactionController";
import deserializeUser from "./middlewares/deserializeUser";
import requiresUser from "./middlewares/requiresUser";
import ValidateRequest from "./middlewares/validateRequest";
import { loginUserValidator, userCreationValidator } from "./schemas/validation/user.validation";
 
export default function (app: Express) {
    //auth endpoints
    // no token/cookie validation needed for these endpoint

    // 
    app.post("/auth/signup", ValidateRequest(userCreationValidator), signUpController);
    app.post("/auth/signin", ValidateRequest(loginUserValidator), signInController);
    //append user object to the req header
    
    app.delete("/auth/logout", invalidateUsersSession);
    
    //users Endpoints 
    // app.post("/sendVerifyEmail", sendVerifyEmail);
    // app.post("/verifyEmail", verifyEmail);
    // app.post("/updateUsersAccount", updateUsersAccount);
    // app.post("/deleteUsersAccount", deleteUsersAccount);
    
    // app.use(Authorization)
    //Transaction Endpoints 
    // app.post("/transaction/makeTransaction",requiresUser, updateTransaction);
    app.post("/transaction/makeTransaction",requiresUser, makeTransaction);  
    app.get("/transaction/getAll", requiresUser,getAllTransactions);
    // app.post("/transaction/get:id", requiresUser,getAllTransactions);
    app.delete("/transaction/deleteAll",requiresUser, deleteAllTransactions);
    app.delete("/transaction/delete/",requiresUser, deleteTransactionById);

}