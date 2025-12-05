import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/uploads", express.static("public/temp"));

const allowedOrigins = [
  "https://ecommerce-rosy-three.vercel.app",
  "https://ecommerce-i7jwu5tzn-mukul-kumawats-projects.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));





// ✅ ROUTES
import userRouter from "./Routes/user.route.js";
import productRouter from "./Routes/product.route.js";
import categoryRouter from "./Routes/category.route.js";
import cartRouter from "./Routes/cart.route.js";
import adminRouter from "./Routes/admin.route.js";
import couponRouter from "./Routes/coupon.route.js";
import contactRouter from "./Routes/contact.route.js";

// ✅ FIXED ROOT ROUTE
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/coupon", couponRouter);
app.use("/api/v1/contact", contactRouter);

// ✅ ONLY DEFAULT EXPORT FOR VERCEL
export default app;
