const { loadEnv } = require("./env");
loadEnv();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/archimuse";

const run = async () => {
  console.log("Connecting to:", MONGO_URI.replace(/\/\/([^:]+):([^@]+)@/, "//***:***@"));
  await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 8000 });
  console.log("MongoDB OK");

  const db = mongoose.connection.db;
  const cols = await db.listCollections().toArray();
  console.log("Collections:", cols.map((c) => c.name).join(", ") || "(none)");

  for (const name of ["users", "pins", "orders", "comments", "sessions"]) {
    try {
      const count = await db.collection(name).countDocuments();
      console.log(`  ${name}: ${count}`);
    } catch (_error) {
      console.log(`  ${name}: missing`);
    }
  }

  const users = db.collection("users");
  let admin = await users.findOne({ email: "admin@archimuse.app" });
  if (!admin) {
    const passwordHash = await bcrypt.hash("admin123", 12);
    await users.insertOne({
      name: "ArchiMuse Admin",
      email: "admin@archimuse.app",
      passwordHash,
      bio: "Admin panel",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log("Created admin: admin@archimuse.app / admin123");
  } else {
    if (admin.role !== "admin") {
      await users.updateOne({ _id: admin._id }, { $set: { role: "admin" } });
      console.log("Updated existing user to admin role");
    } else {
      console.log("Admin already exists: admin@archimuse.app");
    }
  }

  await mongoose.disconnect();
  console.log("Done.");
};

run().catch((error) => {
  console.error("MongoDB FAILED:", error.message);
  console.error("1) Start Windows service: MongoDB");
  console.error("2) Check .env MONGO_URI=mongodb://127.0.0.1:27017/archimuse");
  process.exit(1);
});
