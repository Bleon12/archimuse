const connectDatabase = async () => {
  // JSON file database initializes lazily in db.js. Keep async signature for compatibility.
  return Promise.resolve();
};

module.exports = { connectDatabase };
