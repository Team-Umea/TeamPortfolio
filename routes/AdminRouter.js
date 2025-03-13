const router = require("express").Router();
const multer = require("multer");
const upload = multer();
const { ensureNewProfile, ensureUniqueProfile } = require("../middlewares/Profile");
const { validateImage } = require("../validators/imageValidator");
const { validateProfile } = require("../validators/profileValidator");
const { validateEvent } = require("../validators/eventValidator");
const { createProfile, editProfile, getProfile } = require("../controllers/ProfileController");
const { editEvent, addEvent, deleteEvent } = require("../controllers/EventController");

router.get("/profile", getProfile);

router.post(
  "/createprofile",
  upload.single("profileImage"),
  validateProfile,
  ensureNewProfile,
  validateImage,
  createProfile
);
router.post("/addevent", upload.single("image"), validateEvent, validateImage, addEvent);

router.put(
  "/editprofile",
  upload.single("profileImage"),
  validateProfile,
  ensureUniqueProfile,
  validateImage,
  editProfile
);
router.put("/editevent", upload.single("image"), validateEvent, validateImage, editEvent);

router.delete("/deleteevent", deleteEvent);

module.exports = router;
