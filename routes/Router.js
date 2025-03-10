const router = require("express").Router();
const { getMembers } = require("../controllers/Controller");
const { ensureAuthenticatd, ensureAdmin } = require("../middlewares/Auth");
const AdminRouter = require("./AdminRouter");

router.use("/admin", ensureAuthenticatd, ensureAdmin, AdminRouter);

router.get("/members", getMembers);

router.use((_, res) => {
  res.status(404).json({ error: "API route not found" });
});

module.exports = router;
