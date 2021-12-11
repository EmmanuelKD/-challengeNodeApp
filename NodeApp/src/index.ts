import config from "config";
import express from "express";
import dbConnect from "./db/connect";
import log from "./logger";
import deserializeUser from "./middlewares/deserializeUser";
 import routes from "./routes"
import serverless from "serverless-http"

 const app = express();
 const router=express.Router();

const port = config.get("port") as number;
const host = config.get("host") as string;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// add the users instance from the token to the header
app.use(deserializeUser)

app.listen(port, host, () => {
    log.info(`server started at http://${host}:${port}`);
    try {
        dbConnect()
         routes(app);
     } catch (e) {
        process.exit(1);
    }
});   

module.exports.handler=serverless(app);
