const fs = require("fs");
const path = require("path");

const dataDir = path.join(__dirname, "data");
const dbFile = path.join(dataDir, "store.json");

const defaultStore = () => ({
  users: [],
  pins: [],
  comments: [],
  orders: [],
  meta: {
    nextUserId: 1,
    nextPinId: 1,
    nextCommentId: 1,
    nextOrderId: 1,
  },
});

const clone = (value) => JSON.parse(JSON.stringify(value));
const nowIso = () => new Date().toISOString();

const numericIdPart = (value) => {
  const match = String(value || "").match(/(\d+)$/);
  return match ? Number(match[1]) : 0;
};

const normalizeStore = (parsed) => {
  const safe = parsed && typeof parsed === "object" ? parsed : {};
  const users = Array.isArray(safe.users) ? safe.users : [];
  const pins = Array.isArray(safe.pins) ? safe.pins : [];
  const comments = Array.isArray(safe.comments) ? safe.comments : [];
  const orders = Array.isArray(safe.orders) ? safe.orders : [];

  const nextUserId = Math.max(
    Number(safe.meta?.nextUserId) || 1,
    users.reduce((max, item) => Math.max(max, numericIdPart(item?._id) + 1), 1)
  );
  const nextPinId = Math.max(
    Number(safe.meta?.nextPinId) || 1,
    pins.reduce((max, item) => Math.max(max, numericIdPart(item?._id) + 1), 1)
  );
  const nextCommentId = Math.max(
    Number(safe.meta?.nextCommentId) || 1,
    comments.reduce((max, item) => Math.max(max, numericIdPart(item?._id) + 1), 1)
  );
  const nextOrderId = Math.max(
    Number(safe.meta?.nextOrderId) || 1,
    orders.reduce((max, item) => Math.max(max, numericIdPart(item?._id) + 1), 1)
  );

  return {
    users,
    pins,
    comments,
    orders,
    meta: { nextUserId, nextPinId, nextCommentId, nextOrderId },
  };
};

const ensureStore = () => {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(dbFile)) {
    fs.writeFileSync(dbFile, JSON.stringify(defaultStore(), null, 2), "utf8");
    return;
  }
  const store = readStore();
  writeStore(store);
};

const readStore = () => {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(dbFile)) return defaultStore();
  try {
    const parsed = JSON.parse(fs.readFileSync(dbFile, "utf8"));
    return normalizeStore(parsed);
  } catch (_error) {
    return defaultStore();
  }
};

const writeStore = (store) => {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(dbFile, JSON.stringify(normalizeStore(store), null, 2), "utf8");
};

const newId = (store, key, prefix) => {
  const value = store.meta[key] || 1;
  store.meta[key] = value + 1;
  return `${prefix}${value}`;
};

const refId = (value) => {
  if (value && typeof value === "object") return value._id || null;
  return value == null ? null : String(value);
};

const parseSelect = (select) => {
  if (!select || typeof select !== "string") return null;
  return select
    .split(/\s+/)
    .map((field) => field.trim())
    .filter(Boolean)
    .filter((field) => !field.startsWith("-"));
};

const applySelect = (doc, select) => {
  if (!doc) return null;
  const fields = parseSelect(select);
  if (!fields?.length) return clone(doc);
  const selected = { _id: doc._id };
  fields.forEach((field) => {
    if (field in doc) selected[field] = doc[field];
  });
  return selected;
};

const compareValues = (a, b, direction) => {
  if (a == null && b == null) return 0;
  if (a == null) return 1;
  if (b == null) return -1;
  if (a instanceof Date && b instanceof Date) return direction * (a - b);
  const aDate = Date.parse(a);
  const bDate = Date.parse(b);
  if (!Number.isNaN(aDate) && !Number.isNaN(bDate)) return direction * (aDate - bDate);
  if (typeof a === "number" && typeof b === "number") return direction * (a - b);
  return direction * String(a).localeCompare(String(b));
};

const sortDocs = (docs, sortSpec = {}) => {
  const entries = Object.entries(sortSpec);
  if (!entries.length) return docs;
  return [...docs].sort((left, right) => {
    for (const [field, dirRaw] of entries) {
      const direction = Number(dirRaw) === -1 ? -1 : 1;
      const result = compareValues(left[field], right[field], direction);
      if (result !== 0) return result;
    }
    return 0;
  });
};

const hasValue = (fieldValue, target) => {
  if (Array.isArray(fieldValue)) {
    return fieldValue.some((item) => String(refId(item)) === String(refId(target)));
  }
  return String(refId(fieldValue)) === String(refId(target));
};

const matchesField = (fieldValue, condition) => {
  if (condition && typeof condition === "object" && !Array.isArray(condition)) {
    if ("$exists" in condition) {
      const exists = fieldValue !== undefined;
      return Boolean(condition.$exists) ? exists : !exists;
    }
    if ("$in" in condition && Array.isArray(condition.$in)) {
      return condition.$in.some((item) => hasValue(fieldValue, item));
    }
    if ("$regex" in condition) {
      const flags = condition.$options || "";
      const regex = new RegExp(condition.$regex, flags);
      return regex.test(String(fieldValue || ""));
    }
    return Object.entries(condition).every(([key, value]) => {
      if (key === "$options") return true;
      return matchesField(fieldValue?.[key], value);
    });
  }
  return hasValue(fieldValue, condition);
};

const matchesFilter = (doc, filter = {}) => {
  if (!filter || !Object.keys(filter).length) return true;
  if (Array.isArray(filter.$or)) {
    return filter.$or.some((entry) => matchesFilter(doc, entry));
  }
  return Object.entries(filter).every(([field, condition]) => {
    if (field === "$or") return true;
    return matchesField(doc[field], condition);
  });
};

const toDoc = (collectionName, rawDoc, afterSave) => {
  if (!rawDoc) return null;
  const doc = clone(rawDoc);
  const applyPopulate = (pathName, select) => {
    if (collectionName === "pins") return populatePinField(doc, pathName, select);
    if (collectionName === "comments") return populateCommentField(doc, pathName, select);
    if (collectionName === "orders") return populateOrderField(doc, pathName, select);
    return clone(doc);
  };
  Object.defineProperty(doc, "toObject", {
    enumerable: false,
    value() {
      return clone(doc);
    },
  });
  Object.defineProperty(doc, "save", {
    enumerable: false,
    async value() {
      const store = readStore();
      const collection = store[collectionName];
      const index = collection.findIndex((item) => String(item._id) === String(doc._id));
      if (index === -1) return null;
      const normalized = afterSave ? afterSave(doc) : clone(doc);
      normalized.updatedAt = nowIso();
      collection[index] = normalized;
      writeStore(store);
      return toDoc(collectionName, normalized, afterSave);
    },
  });
  Object.defineProperty(doc, "deleteOne", {
    enumerable: false,
    async value() {
      const store = readStore();
      const collection = store[collectionName];
      const before = collection.length;
      store[collectionName] = collection.filter((item) => String(item._id) !== String(doc._id));
      if (collectionName === "pins") {
        store.comments = store.comments.filter((item) => String(item.pin) !== String(doc._id));
        store.orders = store.orders.filter((item) => String(item.pin) !== String(doc._id));
      }
      writeStore(store);
      return { deletedCount: before - store[collectionName].length };
    },
  });
  Object.defineProperty(doc, "populate", {
    enumerable: false,
    value(pathName, select) {
      return Promise.resolve(toDoc(collectionName, applyPopulate(pathName, select), afterSave));
    },
  });
  Object.defineProperty(doc, "select", {
    enumerable: false,
    value(select) {
      return Promise.resolve(applySelect(doc, select));
    },
  });
  return doc;
};

const populateUser = (userId, select) => {
  const store = readStore();
  const user = store.users.find((item) => String(item._id) === String(refId(userId)));
  if (!user) return { _id: refId(userId), name: "User" };
  return applySelect(user, select || "name");
};

const populatePin = (pinId, select) => {
  const store = readStore();
  const pin = store.pins.find((item) => String(item._id) === String(refId(pinId)));
  if (!pin) return null;
  return applySelect(pin, select || "title imageUrl");
};

const populateOrderField = (order, pathName, select) => {
  const next = clone(order);
  if (!next) return null;
  if (pathName === "pin") next.pin = populatePin(next.pin, select);
  if (pathName === "buyer") next.buyer = populateUser(next.buyer, select || "name email");
  return next;
};

const populateCommentField = (comment, pathName, select) => {
  const next = clone(comment);
  if (!next) return null;
  if (pathName === "user") next.user = populateUser(next.user, select || "name");
  if (pathName === "pin") next.pin = populatePin(next.pin, select || "title imageUrl");
  return next;
};

const populatePinField = (pin, pathName, select) => {
  const next = clone(pin);
  if (!next) return null;
  if (pathName === "user") next.user = populateUser(next.user, select || "name");
  return next;
};

const createManyQuery = (loader, options) => {
  const state = { populates: [], sort: null, limit: null, select: null, lean: false };
  const api = {
    populate(pathName, select) {
      state.populates.push({ pathName, select });
      return api;
    },
    sort(spec) {
      state.sort = spec;
      return api;
    },
    limit(value) {
      state.limit = Number(value);
      return api;
    },
    select(select) {
      state.select = select;
      return api;
    },
    lean() {
      state.lean = true;
      return api;
    },
    exec() {
      let docs = loader();
      if (state.sort) docs = sortDocs(docs, state.sort);
      if (Number.isFinite(state.limit) && state.limit >= 0) docs = docs.slice(0, state.limit);
      state.populates.forEach(({ pathName, select }) => {
        docs = docs.map((doc) => options.populate(doc, pathName, select));
      });
      if (state.select) docs = docs.map((doc) => applySelect(doc, state.select));
      if (state.lean || state.select) return clone(docs);
      return docs.map((doc) => options.wrap(doc));
    },
    then(resolve, reject) {
      return Promise.resolve(api.exec()).then(resolve, reject);
    },
    catch(reject) {
      return Promise.resolve(api.exec()).catch(reject);
    },
  };
  return api;
};

const createOneQuery = (loader, options) => {
  const state = { populates: [], select: null, lean: false };
  const api = {
    populate(pathName, select) {
      state.populates.push({ pathName, select });
      return api;
    },
    select(select) {
      state.select = select;
      return api;
    },
    lean() {
      state.lean = true;
      return api;
    },
    exec() {
      let doc = loader();
      if (!doc) return null;
      state.populates.forEach(({ pathName, select }) => {
        doc = options.populate(doc, pathName, select);
      });
      if (state.select) doc = applySelect(doc, state.select);
      if (state.lean || state.select) return clone(doc);
      return options.wrap(doc);
    },
    then(resolve, reject) {
      return Promise.resolve(api.exec()).then(resolve, reject);
    },
    catch(reject) {
      return Promise.resolve(api.exec()).catch(reject);
    },
  };
  return api;
};

const normalizePinRefs = (pinDoc) => ({
  ...clone(pinDoc),
  user: refId(pinDoc.user),
  likedBy: Array.isArray(pinDoc.likedBy) ? pinDoc.likedBy.map(refId).filter(Boolean) : [],
  savedBy: Array.isArray(pinDoc.savedBy) ? pinDoc.savedBy.map(refId).filter(Boolean) : [],
});

const normalizeCommentRefs = (commentDoc) => ({
  ...clone(commentDoc),
  pin: refId(commentDoc.pin),
  user: refId(commentDoc.user),
});

const normalizeOrderRefs = (orderDoc) => ({
  ...clone(orderDoc),
  pin: refId(orderDoc.pin),
  buyer: refId(orderDoc.buyer),
});

const User = {
  findOne(filter = {}) {
    const store = readStore();
    const user = store.users.find((item) => matchesFilter(item, filter));
    return user ? toDoc("users", user) : null;
  },
  findById(id) {
    return createOneQuery(
      () => {
        const store = readStore();
        return store.users.find((item) => String(item._id) === String(id)) || null;
      },
      {
        wrap: (doc) => toDoc("users", doc),
        populate: (doc) => clone(doc),
      }
    );
  },
  async create(data) {
    const store = readStore();
    const _id = newId(store, "nextUserId", "u");
    const doc = {
      _id,
      name: String(data.name || "").trim(),
      email: String(data.email || "").toLowerCase().trim(),
      passwordHash: data.passwordHash,
      bio: String(data.bio || "").trim().slice(0, 280),
      role: data.role || "user",
      createdAt: nowIso(),
      updatedAt: nowIso(),
    };
    store.users.push(doc);
    writeStore(store);
    return toDoc("users", doc);
  },
  countDocuments(filter = {}) {
    const store = readStore();
    return store.users.filter((item) => matchesFilter(item, filter)).length;
  },
};

const Pin = {
  countDocuments(filter = {}) {
    const store = readStore();
    return store.pins.filter((item) => matchesFilter(item, filter)).length;
  },
  find(filter = {}, projection = null) {
    const query = createManyQuery(
      () => {
        const store = readStore();
        return store.pins.filter((item) => matchesFilter(item, filter)).map(clone);
      },
      {
        wrap: (doc) => toDoc("pins", doc, normalizePinRefs),
        populate: populatePinField,
      }
    );
    if (projection) query.select(projection);
    return query;
  },
  findById(id) {
    return createOneQuery(
      () => {
        const store = readStore();
        const doc = store.pins.find((item) => String(item._id) === String(id));
        return doc ? clone(doc) : null;
      },
      {
        wrap: (doc) => toDoc("pins", doc, normalizePinRefs),
        populate: populatePinField,
      }
    );
  },
  async create(data) {
    const store = readStore();
    const _id = newId(store, "nextPinId", "p");
    const doc = {
      _id,
      title: String(data.title || "").trim(),
      bio: String(data.bio || "").trim(),
      category: String(data.category || "general").trim().toLowerCase(),
      imageUrl: String(data.imageUrl || ""),
      sourceUrl: String(data.sourceUrl || ""),
      source: data.source || "upload",
      user: refId(data.user),
      likedBy: Array.isArray(data.likedBy) ? data.likedBy.map(refId).filter(Boolean) : [],
      savedBy: Array.isArray(data.savedBy) ? data.savedBy.map(refId).filter(Boolean) : [],
      views: Number(data.views) || 0,
      shareCount: Number(data.shareCount) || 0,
      price: Math.max(0, Number(data.price) || 0),
      currency: String(data.currency || "EUR").toUpperCase(),
      forSale: data.forSale !== false,
      createdAt: nowIso(),
      updatedAt: nowIso(),
    };
    store.pins.push(doc);
    writeStore(store);
    return toDoc("pins", doc, normalizePinRefs);
  },
  async insertMany(items = []) {
    const store = readStore();
    const created = items.map((data) => {
      const _id = newId(store, "nextPinId", "p");
      const doc = {
        _id,
        title: String(data.title || "").trim(),
        bio: String(data.bio || "").trim(),
        category: String(data.category || "general").trim().toLowerCase(),
        imageUrl: String(data.imageUrl || ""),
        sourceUrl: String(data.sourceUrl || ""),
        source: data.source || "upload",
        user: refId(data.user),
        likedBy: Array.isArray(data.likedBy) ? data.likedBy.map(refId).filter(Boolean) : [],
        savedBy: Array.isArray(data.savedBy) ? data.savedBy.map(refId).filter(Boolean) : [],
        views: Number(data.views) || 0,
        shareCount: Number(data.shareCount) || 0,
        price: Math.max(0, Number(data.price) || 0),
        currency: String(data.currency || "EUR").toUpperCase(),
        forSale: data.forSale !== false,
        createdAt: nowIso(),
        updatedAt: nowIso(),
      };
      store.pins.push(doc);
      return doc;
    });
    writeStore(store);
    return created.map((doc) => toDoc("pins", doc, normalizePinRefs));
  },
  findByIdAndUpdate(id, update = {}, options = {}) {
    const store = readStore();
    const index = store.pins.findIndex((item) => String(item._id) === String(id));
    if (index === -1) return null;
    const existing = store.pins[index];
    const next = clone(existing);
    if (update && typeof update === "object") {
      Object.entries(update).forEach(([field, value]) => {
        if (field === "$inc" && value && typeof value === "object") {
          Object.entries(value).forEach(([incField, incValue]) => {
            next[incField] = (Number(next[incField]) || 0) + (Number(incValue) || 0);
          });
          return;
        }
        next[field] = value;
      });
    }
    next.updatedAt = nowIso();
    store.pins[index] = normalizePinRefs(next);
    writeStore(store);
    const selected = options.new ? store.pins[index] : existing;
    return toDoc("pins", selected, normalizePinRefs);
  },
  async updateOne(filter = {}, update = {}) {
    const store = readStore();
    const index = store.pins.findIndex((item) => matchesFilter(item, filter));
    if (index === -1) return { matchedCount: 0, modifiedCount: 0 };
    const next = clone(store.pins[index]);
    if (update.$set && typeof update.$set === "object") {
      Object.assign(next, update.$set);
    } else {
      Object.assign(next, update);
    }
    next.updatedAt = nowIso();
    store.pins[index] = normalizePinRefs(next);
    writeStore(store);
    return { matchedCount: 1, modifiedCount: 1 };
  },
};

const Comment = {
  find(filter = {}) {
    return createManyQuery(
      () => {
        const store = readStore();
        return store.comments.filter((item) => matchesFilter(item, filter)).map(clone);
      },
      {
        wrap: (doc) => toDoc("comments", doc, normalizeCommentRefs),
        populate: populateCommentField,
      }
    );
  },
  findById(id) {
    return createOneQuery(
      () => {
        const store = readStore();
        const doc = store.comments.find((item) => String(item._id) === String(id));
        return doc ? clone(doc) : null;
      },
      {
        wrap: (doc) => toDoc("comments", doc, normalizeCommentRefs),
        populate: populateCommentField,
      }
    );
  },
  async create(data) {
    const store = readStore();
    const _id = newId(store, "nextCommentId", "c");
    const doc = {
      _id,
      pin: refId(data.pin),
      user: refId(data.user),
      text: String(data.text || "").trim().slice(0, 800),
      createdAt: nowIso(),
      updatedAt: nowIso(),
    };
    store.comments.push(doc);
    writeStore(store);
    return toDoc("comments", doc, normalizeCommentRefs);
  },
};

const Order = {
  countDocuments(filter = {}) {
    const store = readStore();
    return store.orders.filter((item) => matchesFilter(item, filter)).length;
  },
  find(filter = {}) {
    return createManyQuery(
      () => {
        const store = readStore();
        return store.orders.filter((item) => matchesFilter(item, filter)).map(clone);
      },
      {
        wrap: (doc) => toDoc("orders", doc, normalizeOrderRefs),
        populate: populateOrderField,
      }
    );
  },
  findById(id) {
    return createOneQuery(
      () => {
        const store = readStore();
        const doc = store.orders.find((item) => String(item._id) === String(id));
        return doc ? clone(doc) : null;
      },
      {
        wrap: (doc) => toDoc("orders", doc, normalizeOrderRefs),
        populate: populateOrderField,
      }
    );
  },
  async create(data) {
    const store = readStore();
    const _id = newId(store, "nextOrderId", "o");
    const doc = {
      _id,
      pin: refId(data.pin),
      buyer: refId(data.buyer),
      fullName: String(data.fullName || "").trim(),
      email: String(data.email || "").trim().toLowerCase(),
      phone: String(data.phone || "").trim(),
      address: String(data.address || "").trim(),
      city: String(data.city || "").trim(),
      notes: String(data.notes || "").trim().slice(0, 500),
      paymentMethod: data.paymentMethod || "cash",
      status: data.status || "pending",
      price: Math.max(0, Number(data.price) || 0),
      currency: String(data.currency || "EUR").toUpperCase(),
      designTitle: String(data.designTitle || "").trim(),
      createdAt: nowIso(),
      updatedAt: nowIso(),
    };
    store.orders.push(doc);
    writeStore(store);
    return toDoc("orders", doc, normalizeOrderRefs);
  },
  findByIdAndUpdate(id, update = {}, options = {}) {
    const store = readStore();
    const index = store.orders.findIndex((item) => String(item._id) === String(id));
    if (index === -1) return null;
    const before = clone(store.orders[index]);
    const next = { ...before, ...clone(update), updatedAt: nowIso() };
    store.orders[index] = normalizeOrderRefs(next);
    writeStore(store);
    const selected = options.new ? store.orders[index] : before;
    return toDoc("orders", selected, normalizeOrderRefs);
  },
};

ensureStore();

module.exports = { User, Pin, Comment, Order, readStore, writeStore };
