import mongoose, { ConnectOptions } from 'mongoose';
import config from "config";
import log from '../logger';


const dbConfig: ConnectOptions = {
    bufferCommands: false,
    dbName: "emmanuel",
    user: "emmanuel",
    pass: "king123",
    autoIndex: true,
    autoCreate: true,

}

const dbConnect = () => {
    const uri = config.get("dbUri") as string;
    return mongoose.connect(uri, dbConfig).then(() => {
        log.info("database connected")
    }).catch(() => {
        log.error("database connection fail")
    });
}

export default dbConnect;