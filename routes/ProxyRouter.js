const express = require("express");
const router = express.Router();
const { createProxyMiddleware } = require("http-proxy-middleware");
const path = require("path");

require("dotenv").config();

const APPNAME = process.env.APP_NAME;
const AUTHECHO_API_KEY = process.env.AUTHECHO_API_KEY;
const AUTHECHO_SERVER = process.env.AUTHECHO_SERVER;

const REACT_DEV_SERVER = "http://localhost:5173";
const isRunningInProd = process.env.NODE_ENV === "production";

router.use("/authecho", (req, _, next) => {
  req.headers["authecho-app-name"] = APPNAME;
  req.headers["authecho-app-key"] = AUTHECHO_API_KEY;

  next();
});

router.use(
  "/authecho",
  createProxyMiddleware({
    target: AUTHECHO_SERVER,
    changeOrigin: true,
    pathRewrite: (_, req) => {
      return req.originalUrl.replace(/^\/authecho/, "");
    },
    onProxyReq: (proxyReq, req) => {
      const cookieHeader = req.headers.cookie;
      if (cookieHeader) {
        proxyReq.setHeader("Cookie", cookieHeader);
      }
    },
    onProxyRes: (proxyRes, req, res) => {
      console.log(`Received response from: ${AUTHECHO_SERVER}${req.url}`);
      const setCookieHeaders = proxyRes.headers["set-cookie"];
      if (setCookieHeaders) {
        if (Array.isArray(setCookieHeaders)) {
          setCookieHeaders.forEach((cookie) => {
            res.setHeader("Set-Cookie", cookie);
          });
        } else {
          res.setHeader("Set-Cookie", setCookieHeaders);
        }
      }
    },
  })
);

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
  router.use(express.static(path.join(__dirname, "..", "client", "dist")));

  router.get("*", (req, res) => {
    if (req.accepts("html")) {
      res.sendFile(path.join(__dirname, "..", "client", "dist", "index.html"));
    }
  });
}

module.exports = router;
