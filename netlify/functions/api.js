const path = require("path");

// Load root deps from project root (not function folder)
const root = path.join(__dirname, "../..");
module.paths.unshift(path.join(root, "node_modules"));

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const serverless = require("serverless-http");
    const { app, ensureReady } = require("../../server");

    try {
      await ensureReady();
    } catch (error) {
      return {
        statusCode: 500,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({
          ok: false,
          message:
            "Database not connected. In Netlify set MONGO_URI to your MongoDB Atlas string (not localhost), then redeploy.",
          error: String(error.message || error),
        }),
      };
    }

    const handler = serverless(app, {
      binary: ["image/*", "application/octet-stream"],
    });

    let reqPath =
      event.path ||
      event.rawPath ||
      event.requestContext?.http?.path ||
      "/";

    reqPath = String(reqPath).replace(/^\/\.netlify\/functions\/api/, "") || "/";
    if (!reqPath.startsWith("/api")) {
      reqPath = `/api${reqPath.startsWith("/") ? reqPath : `/${reqPath}`}`;
    }

    event.path = reqPath;
    if (event.rawPath) event.rawPath = reqPath;

    return await handler(event, context);
  } catch (error) {
    console.error("Function crash:", error);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ok: false,
        message: "API function failed to start.",
        error: String(error.message || error),
      }),
    };
  }
};
