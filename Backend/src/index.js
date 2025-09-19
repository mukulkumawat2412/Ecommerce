import { app } from "./app.js";
import connectToDb from "../DB/index.js";
import dotenv from "dotenv"



connectToDb().then(()=>{
    app.listen(process.env.PORT,()=>{
    console.log(`server is running on port:- ${process.env.PORT}`)

})


}).catch((err)=>{
    console.log(err)
})


dotenv.config({
    path:"./.env"
})

