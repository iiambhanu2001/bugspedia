import {  mongoose } from "mongoose";
import dotenv from "dotenv"
dotenv.config();


async function connecttoDB() {
  try {
    await mongoose.connect(process.env.uri);

    console.log("connected");
  } catch {
    console.log("Not Connected");
  }
}
export default connecttoDB;
