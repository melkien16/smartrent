import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import UserRouter from "./routes/user.routes.js";
import ItemRouter from "./routes/item.routes.js";
import WalletRouter from "./routes/wallet.routes.js";
import BookindRouter from "./routes/booking.routes.js";
import SubscriptionRouter from "./routes/subscription.routes.js";
import CollateralRouter from "./routes/collaterall.routes.js";
import ReportRouter from "./routes/report.routes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import connectDb from "./config/db.js";

dotenv.config();
connectDb();

const app = express();

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  express.static(path.join(__dirname, "dist"), {
    maxAge: "30d",
    etag: true,
  })
);

app.get("*", (req, res, next) => {
  const indexPath = path.resolve(__dirname, "dist", "index.html");
  res.sendFile(indexPath, (err) => {
    if (err) next(err);
  });
});

app.use((err, req, res, next) => {
  console.error(`Error serving file: ${err.message}`);
  res.status(500).json({ error: "Failed to serve application" });
});

app.use(
  cors({
    origin: "https://smartrent-1.onrender.com",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/api", (_, res) => {
  res.send("API is running...");
});

// API Routes
app.use("/api/users", UserRouter);
app.use("/api/items", ItemRouter);
app.use("/api/wallets", WalletRouter);
app.use("/api/bookings", BookindRouter);
app.use("/api/subscriptions", SubscriptionRouter);
app.use("/api/collaterals", CollateralRouter);
app.use("/api/reports", ReportRouter);

// Error Handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
