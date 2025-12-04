import express from "express"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import cors from "cors"


dotenv.config()




const app = express()



app.use(express.json())

app.use("/uploads", express.static("public/temp"));




app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    
    

}));



app.use(cookieParser())







import userRouter from "./Routes/user.route.js"
import productRouter  from "./Routes/product.route.js"
import categoryRouter from "./Routes/category.route.js"
import cartRouter from "./Routes/cart.route.js"
import adminRouter from "./Routes/admin.route.js"
import couponRouter from "./Routes/coupon.route.js"
import contactRouter from "./Routes/contact.route.js"



app.get("/",()=>{
    res.send("HomePage")
})


app.use("/api/v1/users",userRouter)
app.use("/api/v1/product",productRouter)
app.use("/api/v1/category",categoryRouter)
app.use("/api/v1/cart",cartRouter)
app.use("/api/v1/admin",adminRouter)
app.use("/api/v1/coupon",couponRouter)
app.use("/api/v1/contact",contactRouter)


















export {app}