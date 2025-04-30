import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";

import users from "../data/users.js";
import items from "../data/items.js";
import Item from "../models/itemModel.js";
import User from "../models/userModel.js";
import connectDb from "../config/db.js";

dotenv.config();
connectDb();

const importData = async () => {
  try {
    await User.deleteMany();
    await Item.deleteMany();

    const createdUser = await User.insertMany(users);
    const currentUser = createdUser[0]._id;
    const sampleItems = items.map((item) => {
      return { ...item, owner: currentUser };
    });

    await Item.insertMany(sampleItems);

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

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

console.log(process.argv[0]);
console.log(process.argv[2]);
console.log(process.argv[1]);

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
