const router = require("express").Router();
const {
  getEvents,
  getEventById,
  enrollUser,
  addEventQuestion,
} = require("../controllers/EventController");
const { getProfileAlias } = require("../controllers/ProfileController");
const { getProjectById, getProjects } = require("../controllers/ProjectContoller");
const { getContent } = require("../controllers/ContentController");
const { ensureAdmin, ensureAuthenticated } = require("../middlewares/Auth");
const AdminRouter = require("./AdminRouter");
const { validateEnrollment } = require("../validators/enrollmentValidator");
const { validateEventQuestion } = require("../validators/eventQuestionValidator");

router.use("/admin", ensureAuthenticated, ensureAdmin, AdminRouter);

router.get("/profiles", getProfileAlias);
router.get("/events", getEvents);
router.get("/projects", getProjects);
router.get("/content", getContent);

router.post("/event", getEventById);
router.post("/project", getProjectById);
router.post("/enroll", validateEnrollment, enrollUser);
router.post("/addeventquestion", validateEventQuestion, addEventQuestion);

router.use((_, res) => {
  res.status(404).json({ error: "API route not found" });
});

module.exports = router;
