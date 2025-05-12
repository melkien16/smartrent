import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";

import UserRouter from "./routes/user.routes.js";
import ItemRouter from "./routes/item.routes.js";
import WalletRouter from "./routes/wallet.routes.js";
import BookingRouter from "./routes/booking.routes.js"; // Fixed typo: BookindRouter -> BookingRouter
import SubscriptionRouter from "./routes/subscription.routes.js";
import CollateralRouter from "./routes/collaterall.routes.js";
import ReportRouter from "./routes/report.routes.js";
import UploadRouter from "./routes/upload.routes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import connectDb from "./config/db.js";

// Load environment variables and connect to database
dotenv.config();
connectDb();

const app = express();

// Middleware for parsing JSON, URL-encoded data, and cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// default route for testing
app.get("/", (req, res) => {
  res.send("API is running...");
}
);

// API Routes
app.use("/api/users", UserRouter);
app.use("/api/items", ItemRouter);
app.use("/api/wallets", WalletRouter);
app.use("/api/bookings", BookingRouter); // Fixed typo in route
app.use("/api/subscriptions", SubscriptionRouter);
app.use("/api/collaterals", CollateralRouter);
app.use("/api/reports", ReportRouter);
app.use("/api/upload", UploadRouter);

// // Production-specific configuration
// if (process.env.NODE_ENV === "production") {
//   const __dirname = path.resolve();

//   // Serve static frontend files from frontend/dist
//   app.use(express.static(path.resolve(__dirname, "frontend", "dist")));

//   // Serve uploads folder for static assets
//   app.use("/uploads", express.static(path.resolve(__dirname, "Uploads")));

//   // Wildcard route for SPA routing using regex to avoid path-to-regexp issues
//   app.get(/^(?!\/api|\/uploads).*/, (req, res, next) => {
//     res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"), (err) => {
//       if (err) {
//         console.error(`Error serving index.html: ${err.message}`);
//         next(err);
//       }
//     });
//   });
// }

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
