const Pin = require("../models/Pin");

const daysOld = (value) => {
  const dateMs = Date.parse(value);
  if (Number.isNaN(dateMs)) return 30;
  return (Date.now() - dateMs) / (1000 * 60 * 60 * 24);
};

const trendingScore = (pin) => {
  const likes = Array.isArray(pin.likedBy) ? pin.likedBy.length : 0;
  const saves = Array.isArray(pin.savedBy) ? pin.savedBy.length : 0;
  const views = Number(pin.views) || 0;
  const recency = Math.max(0, 20 - daysOld(pin.createdAt));
  return views * 2 + likes * 3 + saves * 2 + recency;
};

const withComputed = (pin) => ({
  ...pin,
  likeCount: Array.isArray(pin.likedBy) ? pin.likedBy.length : 0,
  saveCount: Array.isArray(pin.savedBy) ? pin.savedBy.length : 0,
  views: Number(pin.views) || 0,
});

const queryPins = async ({ search, category, sort, skip, limit }) => {
  const searchTerm = String(search || "").trim().toLowerCase();
  const all = await Pin.find({}).populate("user", "name");
  let pins = all.map(withComputed);

  if (searchTerm) {
    pins = pins.filter((pin) => {
      const title = String(pin.title || "").toLowerCase();
      const bio = String(pin.bio || "").toLowerCase();
      return title.includes(searchTerm) || bio.includes(searchTerm);
    });
  }
  if (category && category !== "all") pins = pins.filter((pin) => pin.category === category);

  if (sort === "most-viewed") {
    pins.sort((a, b) => b.views - a.views || Date.parse(b.createdAt) - Date.parse(a.createdAt));
  } else if (sort === "most-liked") {
    pins.sort((a, b) => b.likeCount - a.likeCount || Date.parse(b.createdAt) - Date.parse(a.createdAt));
  } else if (sort === "most-saved") {
    pins.sort((a, b) => b.saveCount - a.saveCount || Date.parse(b.createdAt) - Date.parse(a.createdAt));
  } else if (sort === "trending") {
    pins.sort((a, b) => trendingScore(b) - trendingScore(a));
  } else {
    pins.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
  }

  const total = pins.length;
  pins = pins.slice(skip, skip + limit);
  return { pins, total };
};

const queryProjects = async ({ category, sort, skip, limit }) => {
  const all = await Pin.find({}).populate("user", "name");
  let pins = all
    .filter((pin) => pin.source === "pinterest" || pin.source === "curated")
    .map(withComputed);

  if (category && category !== "all") pins = pins.filter((pin) => pin.category === category);

  if (sort === "most-viewed") {
    pins.sort((a, b) => b.views - a.views || Date.parse(b.createdAt) - Date.parse(a.createdAt));
  } else if (sort === "most-liked") {
    pins.sort((a, b) => b.likeCount - a.likeCount || Date.parse(b.createdAt) - Date.parse(a.createdAt));
  } else if (sort === "latest") {
    pins.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
  } else {
    pins.sort((a, b) => trendingScore(b) - trendingScore(a));
  }

  const total = pins.length;
  pins = pins.slice(skip, skip + limit);
  return { pins, total };
};

module.exports = { queryPins, queryProjects };
