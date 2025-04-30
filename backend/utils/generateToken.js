import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  // Generate JWT token
  const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  // Set jwt as HTTP-only cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "Strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

export default generateToken;
