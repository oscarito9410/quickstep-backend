import mongoose from "mongoose";
import Agenda, { Job, JobAttributesData } from "agenda";
import * as dotenv from "dotenv";

dotenv.config();

const DB_URL = process.env.MONGO_DB_URL!;

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
const hardcodeUri = "mongodb+srv://oscar:66c51SF60spi9gf6@cluster0.wbsmp4b.mongodb.net/?retryWrites=true&w=majority";
export async function connectDB() {
  try {
    await mongoose.connect(hardcodeUri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log(`MongoDB connected ⭐️`);
  } catch (error) {
    console.log("Connecting DB failed: ", error);
  }
}

export const agenda = new Agenda({
  db: { address: DB_URL, collection: "databaseJobs" },
});
