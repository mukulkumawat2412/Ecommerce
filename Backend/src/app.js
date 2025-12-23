import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

/* =========================
   MIDDLEWARES
========================= */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("public/temp"));

/* =========================
   CORS (FINAL FIX)
========================= */
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow server-to-server / Postman requests
      if (!origin) return callback(null, true);

      // Allow ALL Vercel deployments (preview + production)
      if (origin.endsWith(".vercel.app")) {
        return callback(null, true);
      }

      // Allow localhost for development
      if (
        origin === "http://localhost:3000" ||
        origin === "http://localhost:5173"
      ) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(cookieParser());

/* =========================
   ROUTES
========================= */

import userRouter from "./Routes/user.route.js";
import productRouter from "./Routes/product.route.js";
import categoryRouter from "./Routes/category.route.js";
import cartRouter from "./Routes/cart.route.js";
import adminRouter from "./Routes/admin.route.js";
import couponRouter from "./Routes/coupon.route.js";
import contactRouter from "./Routes/contact.route.js";

/* =========================
   ROOT
========================= */
app.get("/", (req, res) => {
  res.status(200).send("Backend is running ✅");
});

/* =========================
   API ROUTES
========================= */
app.use("/api/v1/users", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/coupon", couponRouter);
app.use("/api/v1/contact", contactRouter);

/* =========================
   EXPORT (REQUIRED FOR VERCEL)
========================= */
export default app;
