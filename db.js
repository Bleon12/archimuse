const fs = require("fs");
const path = require("path");

const dataDir = path.join(__dirname, "data");
const dbFile = path.join(dataDir, "store.json");

const defaultStore = () => ({
  users: [],
  pins: [],
  meta: { nextUserId: 1, nextPinId: 1 },
});

const ensureStore = () => {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(dbFile)) {
    fs.writeFileSync(dbFile, JSON.stringify(defaultStore(), null, 2), "utf8");
  }
};

const readStore = () => {
  ensureStore();
  try {
    const raw = fs.readFileSync(dbFile, "utf8");
    const parsed = JSON.parse(raw);
    return {
      users: parsed.users || [],
      pins: parsed.pins || [],
      meta: parsed.meta || { nextUserId: 1, nextPinId: 1 },
    };
  } catch (_error) {
    return defaultStore();
  }
};

const writeStore = (store) => {
  ensureStore();
  fs.writeFileSync(dbFile, JSON.stringify(store, null, 2), "utf8");
};

const newId = (prefix, counter) => `${prefix}${counter}`;

const nowIso = () => new Date().toISOString();

const User = {
  findOne(query) {
    const store = readStore();
    if (query.email) {
      return store.users.find((user) => user.email === query.email.toLowerCase().trim()) || null;
    }
    return null;
  },

  findById(id) {
    const store = readStore();
    const user = store.users.find((item) => String(item._id) === String(id));
    if (!user) return null;
    return { ...user };
  },

  async create(data) {
    const store = readStore();
    const _id = newId("u", store.meta.nextUserId++);
    const user = {
      _id,
      name: data.name.trim(),
      email: data.email.toLowerCase().trim(),
      passwordHash: data.passwordHash,
      createdAt: nowIso(),
      updatedAt: nowIso(),
    };
    store.users.push(user);
    writeStore(store);
    return { ...user };
  },

  countDocuments() {
    return readStore().users.length;
  },
};

const populateUser = (pin, store) => {
  const user = store.users.find((item) => String(item._id) === String(pin.user));
  if (!user) return { ...pin, user: { _id: pin.user, name: "Unknown" } };
  return {
    ...pin,
    user: { _id: user._id, name: user.name },
  };
};

const matchesSearch = (pin, search) => {
  if (!search) return true;
  const term = search.toLowerCase();
  return pin.title.toLowerCase().includes(term) || (pin.bio || "").toLowerCase().includes(term);
};

const Pin = {
  countDocuments(filter = {}) {
    return Pin.find(filter).length;
  },

  find(filter = {}) {
    const store = readStore();
    let pins = [...store.pins];

    if (filter.user) {
      pins = pins.filter((pin) => String(pin.user) === String(filter.user));
    }
    if (filter.savedBy) {
      pins = pins.filter((pin) => (pin.savedBy || []).some((id) => String(id) === String(filter.savedBy)));
    }
    if (filter.likedBy) {
      pins = pins.filter((pin) => (pin.likedBy || []).some((id) => String(id) === String(filter.likedBy)));
    }
    if (filter.category) {
      pins = pins.filter((pin) => pin.category === filter.category);
    }

    return pins.map((pin) => populateUser(pin, store));
  },

  findById(id) {
    const store = readStore();
    const pin = store.pins.find((item) => String(item._id) === String(id));
    if (!pin) return null;
    return populateUser(pin, store);
  },

  async create(data) {
    const store = readStore();
    const _id = newId("p", store.meta.nextPinId++);
    const pin = {
      _id,
      title: data.title,
      bio: data.bio || "",
      category: data.category || "general",
      imageUrl: data.imageUrl,
      sourceUrl: data.sourceUrl || "",
      source: data.source || "upload",
      user: data.user,
      likedBy: [],
      savedBy: [],
      views: data.views || 0,
      createdAt: nowIso(),
      updatedAt: nowIso(),
    };
    store.pins.push(pin);
    writeStore(store);
    return populateUser(pin, readStore());
  },

  insertMany(items) {
    const store = readStore();
    const created = items.map((data) => {
      const _id = newId("p", store.meta.nextPinId++);
      const pin = {
        _id,
        title: data.title,
        bio: data.bio || "",
        category: data.category || "general",
        imageUrl: data.imageUrl,
        sourceUrl: data.sourceUrl || "",
        source: data.source || "upload",
        user: data.user,
        likedBy: [],
        savedBy: [],
        views: data.views || Math.floor(Math.random() * 800) + 120,
        createdAt: nowIso(),
        updatedAt: nowIso(),
      };
      store.pins.push(pin);
      return pin;
    });
    writeStore(store);
    return created;
  },

  async save(pin) {
    const store = readStore();
    const index = store.pins.findIndex((item) => String(item._id) === String(pin._id));
    if (index === -1) return null;
    store.pins[index] = {
      ...store.pins[index],
      ...pin,
      updatedAt: nowIso(),
    };
    writeStore(store);
    return populateUser(store.pins[index], store);
  },

  async deleteOne(id) {
    const store = readStore();
    const before = store.pins.length;
    store.pins = store.pins.filter((item) => String(item._id) !== String(id));
    writeStore(store);
    return { deletedCount: before - store.pins.length };
  },

  query({ search, category, sort, skip, limit }) {
    const store = readStore();
    let pins = store.pins.filter((pin) => matchesSearch(pin, search));

    if (category && category !== "all") {
      pins = pins.filter((pin) => pin.category === category);
    }

    pins = pins.map((pin) => ({
      ...pin,
      views: pin.views || 0,
      likeCount: (pin.likedBy || []).length,
      saveCount: (pin.savedBy || []).length,
    }));

    const trendingScore = (pin, jitter = 0) => {
      const daysOld = (Date.now() - new Date(pin.createdAt).getTime()) / (1000 * 60 * 60 * 24);
      const recency = Math.max(0, 20 - daysOld);
      return (pin.views || 0) * 2 + pin.likeCount * 3 + pin.saveCount * 2 + recency + jitter;
    };

    if (sort === "most-viewed") {
      pins.sort((a, b) => (b.views || 0) - (a.views || 0) || new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sort === "most-liked") {
      pins.sort((a, b) => b.likeCount - a.likeCount || new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sort === "most-saved") {
      pins.sort((a, b) => b.saveCount - a.saveCount || new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sort === "trending") {
      pins.sort((a, b) => trendingScore(b, Math.random() * 4) - trendingScore(a, Math.random() * 4));
    } else {
      pins.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    const total = pins.length;
    const slice = pins.slice(skip, skip + limit).map((pin) => populateUser(pin, store));
    return { pins: slice, total };
  },

  incrementView(id) {
    const store = readStore();
    const index = store.pins.findIndex((item) => String(item._id) === String(id));
    if (index === -1) return null;
    store.pins[index].views = (store.pins[index].views || 0) + 1;
    store.pins[index].updatedAt = nowIso();
    writeStore(store);
    return populateUser(store.pins[index], store);
  },

  queryProjects({ category, sort, skip, limit }) {
    const store = readStore();
    let pins = store.pins.filter((pin) => pin.source === "pinterest" || pin.source === "curated");

    if (category && category !== "all") {
      pins = pins.filter((pin) => pin.category === category);
    }

    pins = pins.map((pin) => ({
      ...pin,
      views: pin.views || 0,
      likeCount: (pin.likedBy || []).length,
      saveCount: (pin.savedBy || []).length,
    }));

    const trendingScore = (pin) => {
      const daysOld = (Date.now() - new Date(pin.createdAt).getTime()) / (1000 * 60 * 60 * 24);
      const recency = Math.max(0, 20 - daysOld);
      const jitter = Math.random() * 6;
      return (pin.views || 0) * 2 + pin.likeCount * 3 + pin.saveCount * 2 + recency + jitter;
    };

    if (sort === "most-viewed") {
      pins.sort((a, b) => (b.views || 0) - (a.views || 0));
    } else if (sort === "most-liked") {
      pins.sort((a, b) => b.likeCount - a.likeCount);
    } else if (sort === "latest") {
      pins.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else {
      pins.sort((a, b) => trendingScore(b) - trendingScore(a));
    }

    const total = pins.length;
    const slice = pins.slice(skip, skip + limit).map((pin) => populateUser(pin, store));
    return { pins: slice, total };
  },
};

const migratePinViews = () => {
  const store = readStore();
  let changed = false;
  store.pins.forEach((pin) => {
    if (pin.views == null) {
      pin.views = Math.floor(Math.random() * 1200) + 80;
      changed = true;
    }
  });
  if (changed) writeStore(store);
};

module.exports = { User, Pin, readStore, writeStore, migratePinViews };
