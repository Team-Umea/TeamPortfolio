const router = require("express")();
const { createProxyMiddleware } = require("http-proxy-middleware");
const path = require("path");
const REACT_DEV_SERVER = "http://localhost:5173";

const isRunningInProd = process.env.NODE_ENV === "production";

if (!isRunningInProd) {
  router.use(
    "/",
    createProxyMiddleware({
      target: REACT_DEV_SERVER,
      changeOrigin: true,
      ws: true,
      logLevel: "debug",
    })
  );
}

if (isRunningInProd) {
  router.use(express.static(path.join(__dirname, "..", "public", "dist")));

  router.get("*", (req, res) => {
    if (req.accepts("html")) {
      res.sendFile(path.join(__dirname, "..", "public", "dist", "index.html"));
    }
  });
}

module.exports = router;
