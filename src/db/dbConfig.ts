import { DB_NAME } from "@/constants/db.constants";
import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(`${process.env.MONGO_URI!}/${DB_NAME}`);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected Successfully.");
    });

    connection.on("error", (err) => {
      console.log("MongoDB connection error. " + err);
      process.exit();
    });
  } catch (error) {
    console.log("Something goes wrong!");
    console.log(error);
  }
}
