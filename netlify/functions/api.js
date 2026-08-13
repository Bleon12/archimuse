const serverless = require("serverless-http");
const { app, ensureReady } = require("../../server");

const handler = serverless(app, {
  binary: ["image/*", "application/octet-stream"],
});

const toApiPath = (event) => {
  const candidates = [
    event.path,
    event.rawPath,
    event.requestContext?.http?.path,
    event.headers?.["x-forwarded-uri"],
    event.headers?.["X-Forwarded-Uri"],
  ]
    .filter(Boolean)
    .map(String);

  let path = candidates[0] || "/";

  // Strip function prefix if present
  path = path.replace(/^\/\.netlify\/functions\/api/, "") || "/";

  // Ensure Express sees /api/...
  if (!path.startsWith("/api")) {
    path = `/api${path.startsWith("/") ? path : `/${path}`}`;
  }

  // Avoid trailing function-only path
  if (path === "/api/" || path === "/api") {
    path = "/api/health";
  }

  return path;
};

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await ensureReady();
  } catch (error) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ok: false,
        message: "Database not connected. Set MONGO_URI (Atlas) in Netlify env vars.",
        error: error.message,
      }),
    };
  }

  event.path = toApiPath(event);
  if (event.rawPath) event.rawPath = event.path;

  return handler(event, context);
};
