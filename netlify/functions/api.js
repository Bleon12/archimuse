const serverless = require("serverless-http");
const { app, ensureReady } = require("../../server");

const handler = serverless(app, {
  binary: ["image/*", "application/octet-stream"],
});

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  await ensureReady();

  // Keep /api/... paths for Express routes when redirected from Netlify
  const rawPath = event.path || event.rawPath || "";
  if (rawPath.startsWith("/.netlify/functions/api")) {
    const rest = rawPath.replace("/.netlify/functions/api", "") || "/";
    event.path = rest.startsWith("/api") ? rest : `/api${rest.startsWith("/") ? rest : `/${rest}`}`;
  } else if (!rawPath.startsWith("/api") && event.rawPath) {
    const rest = String(event.rawPath).replace("/.netlify/functions/api", "") || "/";
    event.path = rest.startsWith("/api") ? rest : `/api${rest.startsWith("/") ? rest : `/${rest}`}`;
  }

  return handler(event, context);
};
