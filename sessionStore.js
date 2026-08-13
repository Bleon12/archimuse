const fs = require("fs");
const path = require("path");
const session = require("express-session");

const sessionsFile = path.join(__dirname, "data", "sessions.json");

const ensureSessionsFile = () => {
  const dir = path.dirname(sessionsFile);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(sessionsFile)) {
    fs.writeFileSync(sessionsFile, "{}", "utf8");
  }
};

const readSessions = () => {
  ensureSessionsFile();
  try {
    return JSON.parse(fs.readFileSync(sessionsFile, "utf8"));
  } catch (_error) {
    return {};
  }
};

const writeSessions = (sessions) => {
  ensureSessionsFile();
  fs.writeFileSync(sessionsFile, JSON.stringify(sessions, null, 2), "utf8");
};

const pruneExpired = (sessions) => {
  const now = Date.now();
  let changed = false;
  Object.keys(sessions).forEach((sid) => {
    if (sessions[sid]?.expires && sessions[sid].expires <= now) {
      delete sessions[sid];
      changed = true;
    }
  });
  if (changed) writeSessions(sessions);
  return sessions;
};

class FileSessionStore extends session.Store {
  get(sid, callback) {
    try {
      const sessions = pruneExpired(readSessions());
      const entry = sessions[sid];
      if (!entry) return callback(null, null);
      return callback(null, entry.data);
    } catch (error) {
      return callback(error);
    }
  }

  set(sid, sessionData, callback) {
    try {
      const sessions = readSessions();
      const maxAge = sessionData?.cookie?.maxAge || 1000 * 60 * 60 * 24 * 7;
      sessions[sid] = {
        data: sessionData,
        expires: Date.now() + maxAge,
      };
      writeSessions(sessions);
      return callback(null);
    } catch (error) {
      return callback(error);
    }
  }

  destroy(sid, callback) {
    try {
      const sessions = readSessions();
      delete sessions[sid];
      writeSessions(sessions);
      return callback(null);
    } catch (error) {
      return callback(error);
    }
  }
}

module.exports = FileSessionStore;
