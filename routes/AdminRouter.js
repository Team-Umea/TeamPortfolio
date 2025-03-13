const router = require("express").Router();
const multer = require("multer");
const upload = multer();
const {
  createProfile,
  getProfile,
  editProfile,
  addEvent,
} = require("../controllers/AdminController");
const { ensureNewProfile, ensureUniqueProfile } = require("../middlewares/Profile");
const { validateImage } = require("../validators/imageValidator");
const { validateProfile } = require("../validators/profileValidator");
const { validateEvent } = require("../validators/eventValidator");

router.get("/profile", getProfile);

router.post(
  "/createprofile",
  upload.single("profileImage"),
  validateProfile,
  ensureNewProfile,
  validateImage,
  createProfile
);

router.put(
  "/editprofile",
  upload.single("profileImage"),
  validateProfile,
  ensureUniqueProfile,
  validateImage,
  editProfile
);

router.post("/addevent", upload.single("image"), validateEvent, validateImage, addEvent);

module.exports = router;
