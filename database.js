const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/archimuse";

const connectDatabase = async () => {
  mongoose.set("strictQuery", true);
  await mongoose.connect(MONGO_URI, {
    serverSelectionTimeoutMS: 8000,
  });
  console.log("MongoDB connected successfully.");
};

module.exports = { connectDatabase, mongoose };
