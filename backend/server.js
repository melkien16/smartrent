import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import UserRouter from "./routes/user.routes.js";
import ItemRouter from "./routes/item.routes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

import connectDb from "./config/db.js";

const PORT = process.env.PORT || 5000;

connectDb();

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

app.get("/api", (_, res) => {
  res.send("API is running...");
});

app.use("/api/users", UserRouter);
app.use("/api/items", ItemRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
