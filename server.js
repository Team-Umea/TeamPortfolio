const express = require("express");
const Router = require("./routes/Router");
const ProxyRouter = require("./routes/ProxyRouter");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use("/api", Router);
app.use(ProxyRouter);

app.listen(PORT, () => {
  console.log(`\x1b[36mServer is running on http://localhost:${PORT}\x1b[0m`);
});
