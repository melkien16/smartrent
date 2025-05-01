import asyncHandler from "../middleware/asyncHandler.js";
import Booking from "../models/bookingModel.js";
import Item from "../models/itemModel.js";
import Wallet from "../models/walletModel.js";
import User from "../models/userModel.js";
import calculateTotalPrice from "../utils/calculateTotalPrice.js";
import { premiumServiceFee, serviceFee as ServiceFee } from "../utils/Constants.js";

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = asyncHandler(async (req, res) => {
  const { itemId, startDate, endDate } = req.body;
  const userId = req.user._id;

  const item = await Item.findById(itemId);
  if (!item) {
    res.status(404);
    throw new Error("Item not found");
  }

  const user = await User.findById(userId);
  const wallet = await Wallet.findOne({ user: userId });

  if (!wallet) {
    res.status(400);
    throw new Error("User wallet not found");
  }

  const price = calculateTotalPrice(item, startDate, endDate);
  const serviceFeeRate = user.isPremium ? premiumServiceFee : ServiceFee;
  const serviceFee = price * serviceFeeRate;
  const totalPrice = price + serviceFee;

  if (wallet.balance < totalPrice) {
    res.status(400);
    throw new Error("Insufficient wallet balance");
  }

  const booking = await Booking.create({
    user: userId,
    item: item._id,
    startDate,
    endDate,
    price,
    serviceFee,
    totalPrice,
    paymentStatus: "paid",
    status: "pending",
  });

  res.status(201).json(booking);
});

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Admin
const getBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({})
    .populate("user", "name email")
    .populate("item");
  res.json(bookings);
});

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
const getBookingById = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id)
    .populate("user", "name email")
    .populate("item");

  if (booking) {
    res.json(booking);
  } else {
    res.status(404);
    throw new Error("Booking not found");
  }
});

// @desc    Get bookings by user
// @route   GET /api/bookings/user/:userId
// @access  Private
const getBookingsByUser = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.params.userId }).populate(
    "item"
  );
  res.json(bookings);
});

// @desc    Cancel booking if still pending
// @route   PUT /api/bookings/:id/cancel
// @access  Private
const cancelBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    res.status(404);
    throw new Error("Booking not found");
  }

  if (booking.status !== "pending") {
    res.status(400);
    throw new Error("Only pending bookings can be canceled");
  }

  booking.paymentStatus = "refunded";
  await booking.save();

  res.json({ message: "Booking cancelled and refunded", booking });
});

// @desc    Update booking status (confirmed or completed)
// @route   PUT /api/bookings/:id/status
// @access  Admin or Owner
const updateBookingStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    res.status(404);
    throw new Error("Booking not found");
  }

  if (!["confirmed", "completed"].includes(status)) {
    res.status(400);
    throw new Error("Invalid status");
  }

  booking.status = status;
  await booking.save();  

  res.json({ message: `Booking ${status}`, booking });
});

export {
  createBooking,
  getBookings,
  getBookingById,
  getBookingsByUser,
  cancelBooking,
  updateBookingStatus,
};
