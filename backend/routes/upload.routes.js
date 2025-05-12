import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

// Cloudinary storage config
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "rentsmart",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({ storage });

router.post("/", upload.single("image"), (req, res) => {
  res.status(200).send({
    message: "Image uploaded to Cloudinary successfully",
    image: req.file.path,
  });
});

export default router;
