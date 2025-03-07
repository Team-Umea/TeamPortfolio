const { getMembers } = require("../controllers/Controller");

const router = require("express").Router();

router.get("/members", getMembers);

router.use((_, res) => {
  res.status(404).json({ error: "API route not found" });
});

module.exports = router;
