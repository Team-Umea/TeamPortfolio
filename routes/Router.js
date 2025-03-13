const router = require("express").Router();
const { getEvents, getEventById } = require("../controllers/EventController");
const { ensureAdmin, ensureAuthenticated } = require("../middlewares/Auth");
const AdminRouter = require("./AdminRouter");

router.use("/admin", ensureAuthenticated, ensureAdmin, AdminRouter);

router.get("/events", getEvents);

router.post("/event", getEventById);

router.use((_, res) => {
  res.status(404).json({ error: "API route not found" });
});

module.exports = router;
