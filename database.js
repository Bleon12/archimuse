const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/archimuse";

const connectDatabase = async () => {
  const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/archimuse";
  const onNetlify = Boolean(process.env.NETLIFY || process.env.AWS_LAMBDA_FUNCTION_NAME);
  if (onNetlify && /127\.0\.0\.1|localhost/i.test(uri)) {
    throw new Error(
      "MONGO_URI is localhost. Set an Atlas mongodb+srv://... URI in Netlify Environment variables."
    );
  }

  mongoose.set("strictQuery", true);
  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 8000,
  });
  console.log("MongoDB connected successfully.");
};

module.exports = { connectDatabase, mongoose };
