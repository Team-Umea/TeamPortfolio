const router = require("express").Router();
const multer = require("multer");
const upload = multer();
const { ensureNewProfile, ensureUniqueProfile } = require("../middlewares/Profile");
const { validateImage } = require("../validators/ImageValidator");
const { validateProfile } = require("../validators/profileValidator");
const { validateEvent } = require("../validators/eventValidator");
const { createProfile, editProfile, getProfile } = require("../controllers/ProfileController");
const {
  editEvent,
  addEvent,
  deleteEvent,
  getEventQuestions,
  getEventEnrollments,
} = require("../controllers/EventController");
const { validateProject } = require("../validators/projectValidator");
const { editProject, addProject, deleteProject } = require("../controllers/ProjectContoller");

router.get("/profile", getProfile);
router.get("/eventquestions", getEventQuestions);
router.get("/eventenrollments", getEventEnrollments);

router.post(
  "/createprofile",
  upload.single("profileImage"),
  validateProfile,
  ensureNewProfile,
  validateImage,
  createProfile
);
router.post("/addevent", upload.single("image"), validateEvent, validateImage, addEvent);
router.post("/addproject", validateProject, addProject);

router.put(
  "/editprofile",
  upload.single("profileImage"),
  validateProfile,
  ensureUniqueProfile,
  validateImage,
  editProfile
);
router.put("/editevent", upload.single("image"), validateEvent, validateImage, editEvent);
router.put("/editproject", validateProject, editProject);

router.delete("/deleteevent", deleteEvent);
router.delete("/deleteproject", deleteProject);

module.exports = router;
