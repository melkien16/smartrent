import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import UserRouter from "./routes/user.routes.js";
import ItemRouter from "./routes/item.routes.js";
import WalletRouter from "./routes/wallet.routes.js";
import BookindRouter from "./routes/booking.routes.js";
import SubscriptionRouter from "./routes/subscription.routes.js";
import CollateralRouter from "./routes/collaterall.routes.js";
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
app.use("/api/wallets", WalletRouter);
app.use("/api/bookings", BookindRouter);
app.use("/api/subscriptions", SubscriptionRouter);
app.use("/api/collaterals", CollateralRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
