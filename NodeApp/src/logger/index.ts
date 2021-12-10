import logger from "pino"// alt winston
import dayjs from "dayjs";

const log= logger({
    prettyPrint:true,
    base:{
        pid:false
    }
    ,
    timestamp:()=>`"time":"${dayjs().format()}"`
})

export default log;