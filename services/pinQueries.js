const Pin = require("../models/Pin");

const trendingScoreExpr = () => ({
  $add: [
    { $multiply: ["$views", 2] },
    { $multiply: [{ $size: { $ifNull: ["$likedBy", []] } }, 3] },
    { $multiply: [{ $size: { $ifNull: ["$savedBy", []] } }, 2] },
  ],
});

const baseProjectMatch = (category) => {
  const match = { source: { $in: ["pinterest", "curated"] } };
  if (category && category !== "all") match.category = category;
  return match;
};

const queryPins = async ({ search, category, sort, skip, limit }) => {
  const match = {};
  if (search) {
    match.$or = [
      { title: { $regex: search, $options: "i" } },
      { bio: { $regex: search, $options: "i" } },
    ];
  }
  if (category && category !== "all") match.category = category;

  let sortStage = { createdAt: -1 };
  if (sort === "most-viewed") sortStage = { views: -1, createdAt: -1 };
  else if (sort === "most-liked") sortStage = { likeCount: -1, createdAt: -1 };
  else if (sort === "most-saved") sortStage = { saveCount: -1, createdAt: -1 };
  else if (sort === "trending") sortStage = { trendingScore: -1, createdAt: -1 };

  const pipeline = [
    { $match: match },
    {
      $addFields: {
        likeCount: { $size: { $ifNull: ["$likedBy", []] } },
        saveCount: { $size: { $ifNull: ["$savedBy", []] } },
        trendingScore: trendingScoreExpr(),
      },
    },
    { $sort: sortStage },
    { $skip: skip },
    { $limit: limit },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "userDoc",
      },
    },
    { $unwind: { path: "$userDoc", preserveNullAndEmptyArrays: true } },
    {
      $project: {
        title: 1,
        bio: 1,
        category: 1,
        imageUrl: 1,
        sourceUrl: 1,
        source: 1,
        views: 1,
        shareCount: 1,
        price: 1,
        currency: 1,
        forSale: 1,
        likedBy: 1,
        savedBy: 1,
        createdAt: 1,
        user: { _id: "$userDoc._id", name: "$userDoc.name" },
      },
    },
  ];

  const [pins, total] = await Promise.all([
    Pin.aggregate(pipeline),
    Pin.countDocuments(match),
  ]);

  return { pins, total };
};

const queryProjects = async ({ category, sort, skip, limit }) => {
  const match = baseProjectMatch(category);

  let sortStage = { trendingScore: -1, createdAt: -1 };
  if (sort === "most-viewed") sortStage = { views: -1, createdAt: -1 };
  else if (sort === "most-liked") sortStage = { likeCount: -1, createdAt: -1 };
  else if (sort === "latest") sortStage = { createdAt: -1 };

  const pipeline = [
    { $match: match },
    {
      $addFields: {
        likeCount: { $size: { $ifNull: ["$likedBy", []] } },
        saveCount: { $size: { $ifNull: ["$savedBy", []] } },
        trendingScore: trendingScoreExpr(),
      },
    },
    { $sort: sortStage },
    { $skip: skip },
    { $limit: limit },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "userDoc",
      },
    },
    { $unwind: { path: "$userDoc", preserveNullAndEmptyArrays: true } },
    {
      $project: {
        title: 1,
        bio: 1,
        category: 1,
        imageUrl: 1,
        sourceUrl: 1,
        source: 1,
        views: 1,
        shareCount: 1,
        price: 1,
        currency: 1,
        forSale: 1,
        likedBy: 1,
        savedBy: 1,
        createdAt: 1,
        user: { _id: "$userDoc._id", name: "$userDoc.name" },
      },
    },
  ];

  const [pins, total] = await Promise.all([
    Pin.aggregate(pipeline),
    Pin.countDocuments(match),
  ]);

  return { pins, total };
};

module.exports = { queryPins, queryProjects };
