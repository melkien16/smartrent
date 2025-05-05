import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";

import UserRouter from "./routes/user.routes.js";
import ItemRouter from "./routes/item.routes.js";
import WalletRouter from "./routes/wallet.routes.js";
import BookindRouter from "./routes/booking.routes.js";
import SubscriptionRouter from "./routes/subscription.routes.js";
import CollateralRouter from "./routes/collaterall.routes.js";
import ReportRouter from "./routes/report.routes.js";
import UploadRouter from "./routes/upload.routes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import connectDb from "./config/db.js";

dotenv.config();
connectDb();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API Routes
app.use("/api/users", UserRouter);
app.use("/api/items", ItemRouter);
app.use("/api/wallets", WalletRouter);
app.use("/api/bookings", BookindRouter);
app.use("/api/subscriptions", SubscriptionRouter);
app.use("/api/collaterals", CollateralRouter);
app.use("/api/reports", ReportRouter);
app.use("/api/upload", UploadRouter);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use("/uploads", express.static("/var/data/uploads"));
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  const __dirname = path.resolve();
  app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

// Error Handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
