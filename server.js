const express = require("express");
const path = require("path");
const fs = require("fs");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const { loadEnv } = require("./env");
const { connectDatabase } = require("./database");
const User = require("./models/User");
const Pin = require("./models/Pin");
const Comment = require("./models/Comment");
const Order = require("./models/Order");
const { queryPins, queryProjects } = require("./services/pinQueries");
const CURATED_PINS = require("./curated-pins");
const PINTEREST_PINS = require("./pinterest-pins");

loadEnv();

const app = express();
const PORT = process.env.PORT || 1212;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/archimuse";
const SESSION_SECRET = process.env.SESSION_SECRET || "archimuse-dev-secret-change-in-production";
const IS_PRODUCTION = process.env.NODE_ENV === "production";
const IS_NETLIFY = Boolean(process.env.NETLIFY || process.env.AWS_LAMBDA_FUNCTION_NAME);
const SELLER_ROLES = new Set(["seller", "admin", "curator"]);
const USE_SECURE_COOKIE = IS_PRODUCTION || IS_NETLIFY;

const uploadsDir = IS_NETLIFY
  ? path.join("/tmp", "archimuse-uploads")
  : path.join(__dirname, "public", "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = IS_NETLIFY
  ? multer.memoryStorage()
  : multer.diskStorage({
      destination: (_req, _file, cb) => cb(null, uploadsDir),
      filename: (_req, file, cb) => {
        const ext = path.extname(file.originalname || ".jpg");
        cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
      },
    });

const upload = multer({
  storage,
  limits: { fileSize: 6 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only image files are allowed."));
  },
});

const toImageUrl = (file) => {
  if (!file) return "";
  if (file.buffer) {
    return `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
  }
  return `/uploads/${file.filename}`;
};

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

if (IS_PRODUCTION || IS_NETLIFY) {
  app.set("trust proxy", 1);
}

app.use(
  session({
    name: "archimuse.sid",
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    proxy: true,
    store: MongoStore.create({
      mongoUrl: MONGO_URI,
      ttl: 60 * 60 * 24 * 7,
      touchAfter: 60 * 60,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      sameSite: "lax",
      secure: USE_SECURE_COOKIE,
      path: "/",
    },
  })
);

const requireAuth = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ ok: false, message: "Unauthorized. Please login first." });
  }
  return next();
};

const requireSeller = async (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ ok: false, message: "Unauthorized. Please login first." });
  }
  const user = await User.findById(req.session.userId).select("role");
  if (!user || !SELLER_ROLES.has(user.role)) {
    return res.status(403).json({
      ok: false,
      message: "Vetëm shitësi mund të ngarkojë ose menaxhojë dizajne.",
    });
  }
  req.userRole = user.role;
  return next();
};

const serializeUser = (user, extra = {}) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  bio: user.bio || "",
  role: user.role || "user",
  isSeller: SELLER_ROLES.has(user.role || "user"),
  isAdmin: user.role === "admin" || user.role === "seller" || user.role === "curator",
  initials: (user.name || "U")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase(),
  createdAt: user.createdAt || null,
  ...extra,
});

const getUserStats = async (userId) => {
  const uid = userId;
  const [pinCount, savedCount, likedCount, orderCount] = await Promise.all([
    Pin.countDocuments({ user: uid }),
    Pin.countDocuments({ savedBy: uid }),
    Pin.countDocuments({ likedBy: uid }),
    Order.countDocuments({ buyer: uid }),
  ]);
  return { pinCount, savedCount, likedCount, orderCount };
};

const formatPrice = (price, currency = "EUR") => {
  const amount = Number(price) || 0;
  try {
    return new Intl.NumberFormat("sq-AL", { style: "currency", currency }).format(amount);
  } catch (_error) {
    return `${amount.toFixed(2)} ${currency}`;
  }
};

const serializePin = (pin, currentUserId) => {
  const doc = pin.toObject ? pin.toObject() : pin;
  const userRef = doc.user;
  const userId = userRef?._id || userRef;
  const likedBy = doc.likedBy || [];
  const savedBy = doc.savedBy || [];
  const isOwner = currentUserId && String(userId) === String(currentUserId);
  const price = Number(doc.price) || 0;
  const currency = doc.currency || "EUR";

  return {
    _id: doc._id,
    title: doc.title,
    bio: doc.bio || "",
    category: doc.category || "general",
    imageUrl: doc.imageUrl,
    sourceUrl: doc.sourceUrl || "",
    source: doc.source || "upload",
    user:
      userRef && userRef.name
        ? { _id: userRef._id, name: userRef.name }
        : userRef,
    createdAt: doc.createdAt,
    isOwner: Boolean(isOwner),
    likeCount: likedBy.length,
    saveCount: savedBy.length,
    shareCount: doc.shareCount || 0,
    viewCount: doc.views || 0,
    price,
    currency,
    priceLabel: formatPrice(price, currency),
    forSale: doc.forSale !== false,
    isLiked: Boolean(currentUserId && likedBy.some((id) => String(id) === String(currentUserId))),
    isSaved: Boolean(currentUserId && savedBy.some((id) => String(id) === String(currentUserId))),
  };
};

const serializeComment = (comment) => {
  const doc = comment.toObject ? comment.toObject() : comment;
  const userRef = doc.user;
  return {
    _id: doc._id,
    text: doc.text,
    createdAt: doc.createdAt,
    user: userRef?.name
      ? { _id: userRef._id, name: userRef.name }
      : { _id: userRef, name: "User" },
  };
};

const serializeOrder = (order) => {
  const doc = order.toObject ? order.toObject() : order;
  const pinRef = doc.pin;
  const statusLabels = {
    pending: "Në pritje",
    confirmed: "E konfirmuar",
    completed: "E përfunduar",
    cancelled: "E anuluar",
  };
  return {
    _id: doc._id,
    fullName: doc.fullName,
    email: doc.email,
    phone: doc.phone,
    address: doc.address,
    city: doc.city || "",
    notes: doc.notes || "",
    paymentMethod: doc.paymentMethod,
    paymentLabel: doc.paymentMethod === "cash" ? "Cash" : "Online",
    status: doc.status,
    statusLabel: statusLabels[doc.status] || doc.status,
    price: doc.price,
    currency: doc.currency || "EUR",
    priceLabel: formatPrice(doc.price, doc.currency || "EUR"),
    designTitle: doc.designTitle || pinRef?.title || "Dizajn",
    pin: pinRef?._id
      ? {
          _id: pinRef._id,
          title: pinRef.title,
          imageUrl: pinRef.imageUrl,
        }
      : pinRef,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
};

const extractMetaContent = (html, property) => {
  const patterns = [
    new RegExp(`<meta[^>]+property=["']${property}["'][^>]+content=["']([^"']+)["']`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${property}["']`, "i"),
    new RegExp(`<meta[^>]+name=["']${property}["'][^>]+content=["']([^"']+)["']`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+name=["']${property}["']`, "i"),
  ];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return match[1].trim();
  }
  return "";
};

const fetchPinterestPreview = async (url) => {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; ArchiMuseBot/1.0)",
      Accept: "text/html,application/xhtml+xml",
    },
    redirect: "follow",
  });
  if (!response.ok) throw new Error("Could not reach Pinterest link.");
  const html = await response.text();
  return {
    imageUrl:
      extractMetaContent(html, "og:image") ||
      extractMetaContent(html, "twitter:image") ||
      extractMetaContent(html, "pin:media"),
    title:
      extractMetaContent(html, "og:title") ||
      extractMetaContent(html, "twitter:title") ||
      extractMetaContent(html, "title"),
    description:
      extractMetaContent(html, "og:description") ||
      extractMetaContent(html, "description"),
  };
};

const seedCuratedPins = async () => {
  let curator = await User.findOne({ email: "curator@archimuse.app" });
  if (!curator) {
    const passwordHash = await bcrypt.hash("curator-seed-only", 12);
    curator = await User.create({
      name: "ArchiMuse Studio",
      email: "curator@archimuse.app",
      passwordHash,
      bio: "Studio dizajni — katalog zyrtar i projekteve për shitje.",
      role: "seller",
    });
  } else if (!SELLER_ROLES.has(curator.role)) {
    curator.role = "seller";
    await curator.save();
  }

  let seller = await User.findOne({ email: "seller@archimuse.app" });
  if (!seller) {
    const passwordHash = await bcrypt.hash("seller123", 12);
    seller = await User.create({
      name: "Design Seller",
      email: "seller@archimuse.app",
      passwordHash,
      bio: "Shitës zyrtar i dizajneve.",
      role: "seller",
    });
    console.log("Seller account ready: seller@archimuse.app / seller123");
  }

  let admin = await User.findOne({ email: "admin@archimuse.app" });
  if (!admin) {
    const passwordHash = await bcrypt.hash("admin123", 12);
    admin = await User.create({
      name: "ArchiMuse Admin",
      email: "admin@archimuse.app",
      passwordHash,
      bio: "Admin panel — menaxho dizajnet dhe kërkesat e blerjes.",
      role: "admin",
    });
    console.log("Admin account ready: admin@archimuse.app / admin123");
  } else if (admin.role !== "admin") {
    admin.role = "admin";
    await admin.save();
  }

  const catalog = [...CURATED_PINS, ...PINTEREST_PINS].map((pin) => ({
    ...pin,
    source: pin.source || "pinterest",
    sourceUrl: pin.sourceUrl || "https://www.pinterest.com/search/pins/?q=architecture",
    forSale: true,
    price: pin.price != null ? pin.price : Math.floor(Math.random() * 400) + 80,
    currency: pin.currency || "EUR",
  }));

  const existing = await Pin.find({}, "title").lean();
  const existingTitles = new Set(existing.map((p) => String(p.title).trim().toLowerCase()));
  const toAdd = catalog.filter((pin) => !existingTitles.has(pin.title.trim().toLowerCase()));

  if (!toAdd.length) {
    const unpaid = await Pin.find({ $or: [{ price: { $exists: false } }, { price: null }, { price: 0 }] }).select("_id");
    for (const item of unpaid) {
      await Pin.updateOne(
        { _id: item._id },
        { $set: { price: Math.floor(Math.random() * 400) + 80, currency: "EUR", forSale: true } }
      );
    }
    if (unpaid.length) console.log(`Backfilled prices for ${unpaid.length} designs.`);
    return;
  }

  await Pin.insertMany(
    toAdd.map((pin) => ({
      ...pin,
      user: curator._id,
      views: Math.floor(Math.random() * 800) + 120,
    }))
  );
  console.log(`Seeded ${toAdd.length} designs into MongoDB.`);
};

const migrateJsonIfEmpty = async () => {
  const count = await Pin.countDocuments();
  if (count > 0) return;

  const jsonPath = path.join(__dirname, "data", "store.json");
  if (!fs.existsSync(jsonPath)) return;

  try {
    const store = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
    if (!store.users?.length && !store.pins?.length) return;

    const userMap = new Map();
    for (const u of store.users || []) {
      const exists = await User.findOne({ email: u.email });
      if (exists) {
        userMap.set(u._id, exists._id);
        continue;
      }
      const created = await User.create({
        name: u.name,
        email: u.email,
        passwordHash: u.passwordHash,
        bio: u.bio || "",
      });
      userMap.set(u._id, created._id);
    }

    for (const p of store.pins || []) {
      const userId = userMap.get(p.user);
      if (!userId) continue;
      await Pin.create({
        title: p.title,
        bio: p.bio || "",
        category: p.category || "general",
        imageUrl: p.imageUrl,
        sourceUrl: p.sourceUrl || "",
        source: p.source || "upload",
        user: userId,
        likedBy: (p.likedBy || []).map((id) => userMap.get(id)).filter(Boolean),
        savedBy: (p.savedBy || []).map((id) => userMap.get(id)).filter(Boolean),
        views: p.views || 0,
      });
    }
    console.log("Migrated existing JSON data into MongoDB.");
  } catch (_error) {
    console.warn("JSON migration skipped.");
  }
};

app.get("/api/health", async (_req, res) => {
  const dbState = require("mongoose").connection.readyState;
  const mongoHost = (() => {
    try {
      return new URL(MONGO_URI.replace("mongodb+srv://", "https://").replace("mongodb://", "http://")).host;
    } catch (_error) {
      return "unknown";
    }
  })();
  res.json({
    ok: true,
    status: "online",
    database: dbState === 1 ? "connected" : "disconnected",
    mongoHost,
    netlify: IS_NETLIFY,
    environment: IS_PRODUCTION ? "production" : "development",
    hint:
      dbState === 1
        ? null
        : "Set MONGO_URI to your Atlas connection string in Netlify Environment variables, then redeploy.",
  });
});

app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password, bio } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ ok: false, message: "Name, email and password are required." });
    }
    if (password.length < 6) {
      return res.status(400).json({ ok: false, message: "Password must be at least 6 characters." });
    }

    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(409).json({ ok: false, message: "Email is already registered." });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      passwordHash,
      bio: (bio || "").trim(),
    });

    req.session.userId = String(user._id);
    req.session.userName = user.name;

    return res.json({
      ok: true,
      message: "Account created successfully.",
      user: serializeUser(user, { pinCount: 0, savedCount: 0, likedCount: 0 }),
    });
  } catch (_error) {
    return res.status(500).json({ ok: false, message: "Failed to register user." });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ ok: false, message: "Please enter both email and password." });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) return res.status(401).json({ ok: false, message: "Invalid credentials." });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(401).json({ ok: false, message: "Invalid credentials." });

    req.session.userId = String(user._id);
    req.session.userName = user.name;

    const stats = await getUserStats(user._id);
    return res.json({
      ok: true,
      message: "Login successful. Welcome back!",
      user: serializeUser(user, stats),
    });
  } catch (_error) {
    return res.status(500).json({ ok: false, message: "Failed to login." });
  }
});

app.post("/api/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ ok: true, message: "Logged out successfully." });
  });
});

app.get("/api/me", async (req, res) => {
  if (!req.session.userId) return res.json({ ok: true, user: null });
  const user = await User.findById(req.session.userId).select("name email bio role createdAt");
  if (!user) return res.json({ ok: true, user: null });
  const stats = await getUserStats(user._id);
  return res.json({ ok: true, user: serializeUser(user, stats) });
});

app.put("/api/profile", requireAuth, async (req, res) => {
  try {
    const name = (req.body.name || "").trim();
    const bio = (req.body.bio || "").trim();
    const user = await User.findById(req.session.userId);
    if (!user) return res.status(404).json({ ok: false, message: "User not found." });

    if (name) user.name = name;
    user.bio = bio.slice(0, 280);
    await user.save();

    const stats = await getUserStats(user._id);
    return res.json({ ok: true, message: "Profile updated.", user: serializeUser(user, stats) });
  } catch (_error) {
    return res.status(500).json({ ok: false, message: "Failed to update profile." });
  }
});

app.get("/api/projects", async (req, res) => {
  const category = String(req.query.category || "all").trim();
  const sort = String(req.query.sort || "trending").trim();
  const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 20, 1), 60);
  const skip = (page - 1) * limit;

  const { pins, total } = await queryProjects({ category, sort, skip, limit });
  const serialized = pins.map((pin) => serializePin(pin, req.session.userId));
  return res.json({ ok: true, pins: serialized, page, limit, hasMore: skip + pins.length < total, total });
});

app.get("/api/pins", async (req, res) => {
  const search = String(req.query.search || "").trim();
  const category = String(req.query.category || "").trim();
  const sort = String(req.query.sort || "latest").trim();
  const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 24, 1), 60);
  const skip = (page - 1) * limit;

  const { pins, total } = await queryPins({ search, category, sort, skip, limit });
  const serialized = pins.map((pin) => serializePin(pin, req.session.userId));
  return res.json({ ok: true, pins: serialized, page, limit, hasMore: skip + pins.length < total, total });
});

app.get("/api/pins/:id", async (req, res) => {
  try {
    const pin = await Pin.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    ).populate("user", "name");
    if (!pin) return res.status(404).json({ ok: false, message: "Pin not found." });
    return res.json({ ok: true, pin: serializePin(pin, req.session.userId) });
  } catch (_error) {
    return res.status(500).json({ ok: false, message: "Failed to load pin." });
  }
});

app.post("/api/pins/:id/view", async (req, res) => {
  try {
    const pin = await Pin.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } }, { new: true });
    if (!pin) return res.status(404).json({ ok: false, message: "Pin not found." });
    return res.json({ ok: true, viewCount: pin.views });
  } catch (_error) {
    return res.status(500).json({ ok: false, message: "Failed to track view." });
  }
});

app.get("/api/my-pins", requireAuth, async (req, res) => {
  const pins = await Pin.find({ user: req.session.userId }).populate("user", "name").sort({ createdAt: -1 });
  return res.json({ ok: true, pins: pins.map((p) => serializePin(p, req.session.userId)) });
});

app.get("/api/saved-pins", requireAuth, async (req, res) => {
  const pins = await Pin.find({ savedBy: req.session.userId }).populate("user", "name").sort({ createdAt: -1 });
  return res.json({ ok: true, pins: pins.map((p) => serializePin(p, req.session.userId)) });
});

app.get("/api/liked-pins", requireAuth, async (req, res) => {
  const pins = await Pin.find({ likedBy: req.session.userId }).populate("user", "name").sort({ createdAt: -1 });
  return res.json({ ok: true, pins: pins.map((p) => serializePin(p, req.session.userId)) });
});

app.post("/api/pins", requireSeller, upload.single("image"), async (req, res) => {
  try {
    const title = (req.body.title || "").trim();
    const bio = (req.body.bio || "").trim();
    const category = (req.body.category || "general").trim().toLowerCase();
    const sourceUrl = (req.body.sourceUrl || "").trim();
    const price = Math.max(0, Number(req.body.price) || 0);
    const currency = (req.body.currency || "EUR").trim().toUpperCase() || "EUR";
    const forSale = String(req.body.forSale || "true") !== "false";
    if (!title || !req.file) {
      return res.status(400).json({ ok: false, message: "Title and image are required." });
    }

    const pin = await Pin.create({
      title,
      bio,
      category,
      imageUrl: toImageUrl(req.file),
      sourceUrl,
      source: sourceUrl.includes("pinterest") ? "pinterest" : "upload",
      user: req.session.userId,
      price,
      currency,
      forSale,
    });

    const populated = await Pin.findById(pin._id).populate("user", "name");
    return res.json({
      ok: true,
      message: "Dizajni u ngarkua me sukses.",
      pin: serializePin(populated, req.session.userId),
    });
  } catch (_error) {
    return res.status(500).json({ ok: false, message: "Failed to upload pin." });
  }
});

app.post("/api/pins/from-pinterest", requireSeller, async (req, res) => {
  try {
    const pinterestUrl = (req.body.pinterestUrl || "").trim();
    const title = (req.body.title || "").trim();
    const bio = (req.body.bio || "").trim();
    const category = (req.body.category || "modern").trim().toLowerCase();

    if (!pinterestUrl || !pinterestUrl.includes("pinterest")) {
      return res.status(400).json({ ok: false, message: "Please provide a valid Pinterest link." });
    }

    let preview;
    try {
      preview = await fetchPinterestPreview(pinterestUrl);
    } catch (_error) {
      return res.status(400).json({
        ok: false,
        message: "Could not fetch from Pinterest. Upload the image manually instead.",
      });
    }

    if (!preview.imageUrl) {
      return res.status(400).json({ ok: false, message: "No image found on this Pinterest link." });
    }

    const pin = await Pin.create({
      title: title || preview.title || "Pinterest Inspiration",
      bio: bio || preview.description || "",
      category,
      imageUrl: preview.imageUrl,
      sourceUrl: pinterestUrl,
      source: "pinterest",
      user: req.session.userId,
      price: Math.max(0, Number(req.body.price) || 0),
      currency: (req.body.currency || "EUR").trim().toUpperCase() || "EUR",
      forSale: String(req.body.forSale || "true") !== "false",
    });

    const populated = await Pin.findById(pin._id).populate("user", "name");
    return res.json({
      ok: true,
      message: "Dizajni u importua me sukses.",
      pin: serializePin(populated, req.session.userId),
    });
  } catch (_error) {
    return res.status(500).json({ ok: false, message: "Failed to import from Pinterest." });
  }
});

app.put("/api/pins/:id", requireSeller, async (req, res) => {
  try {
    const pin = await Pin.findById(req.params.id);
    if (!pin) return res.status(404).json({ ok: false, message: "Pin not found." });
    if (String(pin.user) !== String(req.session.userId)) {
      return res.status(403).json({ ok: false, message: "Only the author can edit this pin." });
    }

    const title = (req.body.title || "").trim();
    const bio = (req.body.bio || "").trim();
    const category = (req.body.category || "general").trim().toLowerCase();
    if (!title) return res.status(400).json({ ok: false, message: "Title is required." });

    pin.title = title;
    pin.bio = bio;
    pin.category = category;
    if (req.body.price != null) pin.price = Math.max(0, Number(req.body.price) || 0);
    if (req.body.currency) pin.currency = String(req.body.currency).trim().toUpperCase();
    if (req.body.forSale != null) pin.forSale = String(req.body.forSale) !== "false";
    await pin.save();
    return res.json({ ok: true, message: "Dizajni u përditësua." });
  } catch (_error) {
    return res.status(500).json({ ok: false, message: "Failed to update pin." });
  }
});

app.delete("/api/pins/:id", requireSeller, async (req, res) => {
  try {
    const pin = await Pin.findById(req.params.id);
    if (!pin) return res.status(404).json({ ok: false, message: "Pin not found." });
    if (String(pin.user) !== String(req.session.userId)) {
      return res.status(403).json({ ok: false, message: "Only the author can delete this pin." });
    }

    if (pin.imageUrl.startsWith("/uploads/")) {
      const filePath = path.join(__dirname, "public", pin.imageUrl.replace(/^\//, ""));
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
    await pin.deleteOne();
    return res.json({ ok: true, message: "Pin deleted." });
  } catch (_error) {
    return res.status(500).json({ ok: false, message: "Failed to delete pin." });
  }
});

app.post("/api/pins/:id/like", requireAuth, async (req, res) => {
  try {
    const pin = await Pin.findById(req.params.id);
    if (!pin) return res.status(404).json({ ok: false, message: "Pin not found." });

    const userId = req.session.userId;
    const alreadyLiked = pin.likedBy.some((id) => String(id) === String(userId));
    if (alreadyLiked) pin.likedBy = pin.likedBy.filter((id) => String(id) !== String(userId));
    else pin.likedBy.push(userId);
    await pin.save();

    return res.json({
      ok: true,
      liked: !alreadyLiked,
      likeCount: pin.likedBy.length,
      message: alreadyLiked ? "Like removed." : "Pin liked.",
    });
  } catch (_error) {
    return res.status(500).json({ ok: false, message: "Failed to update like." });
  }
});

app.post("/api/pins/:id/save", requireAuth, async (req, res) => {
  try {
    const pin = await Pin.findById(req.params.id);
    if (!pin) return res.status(404).json({ ok: false, message: "Pin not found." });

    const userId = req.session.userId;
    const alreadySaved = pin.savedBy.some((id) => String(id) === String(userId));
    if (alreadySaved) pin.savedBy = pin.savedBy.filter((id) => String(id) !== String(userId));
    else pin.savedBy.push(userId);
    await pin.save();

    return res.json({
      ok: true,
      saved: !alreadySaved,
      saveCount: pin.savedBy.length,
      message: alreadySaved ? "U hoq nga të ruajturat." : "Dizajni u ruajt.",
    });
  } catch (_error) {
    return res.status(500).json({ ok: false, message: "Failed to update save state." });
  }
});

app.post("/api/pins/:id/share", async (req, res) => {
  try {
    const pin = await Pin.findByIdAndUpdate(req.params.id, { $inc: { shareCount: 1 } }, { new: true });
    if (!pin) return res.status(404).json({ ok: false, message: "Pin not found." });
    return res.json({
      ok: true,
      shareCount: pin.shareCount || 0,
      shareUrl: `${req.protocol}://${req.get("host")}/explore.html?pin=${pin._id}`,
      message: "Linku u përgatit për ndarje.",
    });
  } catch (_error) {
    return res.status(500).json({ ok: false, message: "Failed to share design." });
  }
});

app.get("/api/pins/:id/comments", async (req, res) => {
  try {
    const comments = await Comment.find({ pin: req.params.id })
      .populate("user", "name")
      .sort({ createdAt: -1 })
      .limit(100);
    return res.json({ ok: true, comments: comments.map(serializeComment) });
  } catch (_error) {
    return res.status(500).json({ ok: false, message: "Failed to load comments." });
  }
});

app.post("/api/pins/:id/comments", requireAuth, async (req, res) => {
  try {
    const text = String(req.body.text || "").trim();
    if (!text) return res.status(400).json({ ok: false, message: "Komenti nuk mund të jetë bosh." });
    if (text.length > 800) {
      return res.status(400).json({ ok: false, message: "Komenti është shumë i gjatë." });
    }

    const pin = await Pin.findById(req.params.id);
    if (!pin) return res.status(404).json({ ok: false, message: "Dizajni nuk u gjet." });

    const comment = await Comment.create({
      pin: pin._id,
      user: req.session.userId,
      text,
    });
    const populated = await Comment.findById(comment._id).populate("user", "name");
    return res.json({
      ok: true,
      message: "Komenti u shtua.",
      comment: serializeComment(populated),
    });
  } catch (_error) {
    return res.status(500).json({ ok: false, message: "Failed to add comment." });
  }
});

app.delete("/api/comments/:id", requireAuth, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ ok: false, message: "Komenti nuk u gjet." });
    if (String(comment.user) !== String(req.session.userId)) {
      return res.status(403).json({ ok: false, message: "Mund të fshish vetëm komentin tënd." });
    }
    await comment.deleteOne();
    return res.json({ ok: true, message: "Komenti u fshi." });
  } catch (_error) {
    return res.status(500).json({ ok: false, message: "Failed to delete comment." });
  }
});

app.post("/api/orders", requireAuth, async (req, res) => {
  try {
    const pinId = (req.body.pinId || "").trim();
    const user = await User.findById(req.session.userId).select("name email");
    const fullName = (req.body.fullName || user?.name || "").trim();
    const email = (req.body.email || user?.email || "").trim().toLowerCase();
    const phone = (req.body.phone || "").trim();
    const address = (req.body.address || "").trim();
    const city = (req.body.city || "").trim();
    const notes = (req.body.notes || "").trim();
    const paymentMethod = String(req.body.paymentMethod || "").trim().toLowerCase();

    if (!pinId || !fullName || !email || !phone || !address) {
      return res.status(400).json({
        ok: false,
        message: "Emri, email, telefoni, adresa dhe dizajni janë të detyrueshme.",
      });
    }
    if (!["online", "cash"].includes(paymentMethod)) {
      return res.status(400).json({ ok: false, message: "Zgjidh pagesën: online ose cash." });
    }

    const pin = await Pin.findById(pinId);
    if (!pin) return res.status(404).json({ ok: false, message: "Dizajni nuk u gjet." });
    if (pin.forSale === false) {
      return res.status(400).json({ ok: false, message: "Ky dizajn nuk është në shitje." });
    }

    const order = await Order.create({
      pin: pin._id,
      buyer: req.session.userId,
      fullName,
      email,
      phone,
      address,
      city,
      notes,
      paymentMethod,
      status: "pending",
      price: pin.price || 0,
      currency: pin.currency || "EUR",
      designTitle: pin.title,
    });

    const populated = await Order.findById(order._id).populate("pin", "title imageUrl");
    return res.status(201).json({
      ok: true,
      message:
        "Kërkesa u dërgua te admini. Statusi: Në pritje. Do të kontaktoheni për konfirmim.",
      order: serializeOrder(populated),
    });
  } catch (_error) {
    return res.status(500).json({ ok: false, message: "Dështoi dërgimi i kërkesës së blerjes." });
  }
});

app.get("/api/admin/designs", requireSeller, async (req, res) => {
  try {
    const pins = await Pin.find({})
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .limit(300);
    return res.json({
      ok: true,
      pins: pins.map((pin) => serializePin(pin, req.session.userId)),
    });
  } catch (_error) {
    return res.status(500).json({ ok: false, message: "Failed to load designs." });
  }
});

app.get("/api/admin/orders", requireSeller, async (req, res) => {
  try {
    const status = String(req.query.status || "").trim();
    const match = status && status !== "all" ? { status } : {};
    const orders = await Order.find(match)
      .populate("pin", "title imageUrl")
      .populate("buyer", "name email")
      .sort({ createdAt: -1 })
      .limit(300);
    return res.json({ ok: true, orders: orders.map(serializeOrder) });
  } catch (_error) {
    return res.status(500).json({ ok: false, message: "Failed to load admin orders." });
  }
});

app.get("/api/orders/mine", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId).select("email");
    const orders = await Order.find({
      $or: [{ buyer: req.session.userId }, ...(user?.email ? [{ email: user.email }] : [])],
    })
      .populate("pin", "title imageUrl")
      .sort({ createdAt: -1 });
    return res.json({ ok: true, orders: orders.map(serializeOrder) });
  } catch (_error) {
    return res.status(500).json({ ok: false, message: "Failed to load orders." });
  }
});

app.get("/api/orders/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("pin", "title imageUrl");
    if (!order) return res.status(404).json({ ok: false, message: "Porosia nuk u gjet." });

    const isOwner =
      req.session.userId &&
      (String(order.buyer || "") === String(req.session.userId) ||
        (await User.findById(req.session.userId).then(
          (u) => u && SELLER_ROLES.has(u.role)
        )));

    if (!isOwner && order.email !== String(req.query.email || "").toLowerCase()) {
      return res.status(403).json({ ok: false, message: "Nuk ke akses në këtë porosi." });
    }

    return res.json({ ok: true, order: serializeOrder(order) });
  } catch (_error) {
    return res.status(500).json({ ok: false, message: "Failed to load order." });
  }
});

app.get("/api/seller/orders", requireSeller, async (req, res) => {
  try {
    const status = String(req.query.status || "").trim();
    const match = status && status !== "all" ? { status } : {};
    const orders = await Order.find(match)
      .populate("pin", "title imageUrl")
      .sort({ createdAt: -1 })
      .limit(200);
    return res.json({ ok: true, orders: orders.map(serializeOrder) });
  } catch (_error) {
    return res.status(500).json({ ok: false, message: "Failed to load seller orders." });
  }
});

app.patch("/api/orders/:id/status", requireSeller, async (req, res) => {
  try {
    const status = String(req.body.status || "").trim().toLowerCase();
    if (!["pending", "confirmed", "completed", "cancelled"].includes(status)) {
      return res.status(400).json({ ok: false, message: "Status i pavlefshëm." });
    }
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("pin", "title imageUrl");
    if (!order) return res.status(404).json({ ok: false, message: "Porosia nuk u gjet." });
    return res.json({
      ok: true,
      message: `Statusi u ndryshua në: ${serializeOrder(order).statusLabel}`,
      order: serializeOrder(order),
    });
  } catch (_error) {
    return res.status(500).json({ ok: false, message: "Failed to update order status." });
  }
});

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

let readyPromise = null;

const ensureReady = () => {
  if (!readyPromise) {
    readyPromise = (async () => {
      await connectDatabase();
      await migrateJsonIfEmpty();
      await seedCuratedPins();
    })();
  }
  return readyPromise;
};

const startServer = async () => {
  try {
    await ensureReady();
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`ArchiMuse is running on http://localhost:${PORT}`);
      console.log(`Environment: ${IS_PRODUCTION ? "production" : "development"}`);
      console.log("Database: MongoDB");
    });
  } catch (error) {
    console.error("Failed to start server. Is MongoDB running?");
    console.error("Set MONGO_URI in .env (default: mongodb://127.0.0.1:27017/archimuse)");
    console.error(error.message);
    process.exit(1);
  }
};

if (require.main === module) {
  startServer();
}

module.exports = { app, ensureReady };