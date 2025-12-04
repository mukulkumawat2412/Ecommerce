import { app } from "./app.js";
import connectToDb from "../DB/index.js";
import dotenv from "dotenv";

dotenv.config(); // pehle load kar lo (local ke liye)

// DB connect
await connectToDb().catch((err) => {
  console.error("DB connection failed:", err);
});

// Vercel serverless export
export default app;
