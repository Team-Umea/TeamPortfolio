const router = require("express").Router();
const { getEvents, getEventById } = require("../controllers/EventController");
const { getProfileAlias } = require("../controllers/ProfileController");
const { getProjectById, getProjects } = require("../controllers/ProjectContoller");
const { ensureAdmin, ensureAuthenticated } = require("../middlewares/Auth");
const AdminRouter = require("./AdminRouter");

router.use("/admin", ensureAuthenticated, ensureAdmin, AdminRouter);

router.get("/profiles", getProfileAlias);
router.get("/events", getEvents);
router.get("/projects", getProjects);

router.post("/event", getEventById);
router.post("/project", getProjectById);

router.use((_, res) => {
  res.status(404).json({ error: "API route not found" });
});

module.exports = router;
