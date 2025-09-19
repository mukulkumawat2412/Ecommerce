import mongoose from "mongoose"
import { DATABASE_NAME } from "../src/constant.js"


const connectToDb = async()=>{
    try {

   const Database =   await   mongoose.connect(`${process.env.MONGODB_URI}/${DATABASE_NAME}`)
  
        console.log(`\n Database connected successfully ${Database.connection.host}`)
        
    } catch (error) {
        console.log("database error",error)
        process.exit(1)
        
    }

}


export default connectToDb