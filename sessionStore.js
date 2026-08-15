const fs = require("fs");
const path = require("path");
const session = require("express-session");

const IS_SERVERLESS = Boolean(process.env.NETLIFY || process.env.AWS_LAMBDA_FUNCTION_NAME);
const sessionsDir = IS_SERVERLESS ? path.join("/tmp", "archimuse-sessions") : path.join(__dirname, "data");
const sessionsFile = path.join(sessionsDir, "sessions.json");

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

const done = (callback, error, payload) => {
  if (typeof callback === "function") callback(error, payload);
};

class FileSessionStore extends session.Store {
  get(sid, callback) {
    try {
      const sessions = pruneExpired(readSessions());
      const entry = sessions[sid];
      if (!entry) return done(callback, null, null);
      return done(callback, null, entry.data);
    } catch (error) {
      return done(callback, error);
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
      return done(callback, null);
    } catch (error) {
      return done(callback, error);
    }
  }

  destroy(sid, callback) {
    try {
      const sessions = readSessions();
      delete sessions[sid];
      writeSessions(sessions);
      return done(callback, null);
    } catch (error) {
      return done(callback, error);
    }
  }
}

module.exports = FileSessionStore;
