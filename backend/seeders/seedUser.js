import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";

import users from "../data/users.js";
import items from "../data/items.js";
import wallets from "../data/walets.js";
import categories from "../data/category.js";
import Item from "../models/itemModel.js";
import User from "../models/userModel.js";
import Wallet from "../models/walletModel.js";
import Category from "../models/categoryModel.js";
import connectDb from "../config/db.js";

dotenv.config();
connectDb();

const importData = async () => {
  try {
    await User.deleteMany();
    await Item.deleteMany();
    await Wallet.deleteMany();
    await Category.deleteMany();

    const createdUser = await User.insertMany(users);
    const currentUser = createdUser[0]._id;
    const sampleItems = items.map((item) => {
      return { ...item, owner: currentUser };
    });

    await Item.insertMany(sampleItems);
    await Wallet.insertMany(wallets);

    await Category.insertMany(categories);

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Item.deleteMany();
    await Wallet.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
