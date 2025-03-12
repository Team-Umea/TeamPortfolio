const router = require("express").Router();
const multer = require("multer");
const upload = multer();
const { createProfile, getProfile, editProfile } = require("../controllers/AdminController");
const { ensureNewProfile, ensureUniqueProfile } = require("../middlewares/Profile");
const { validateImage } = require("../validators/ImageValidator");
const { validateProfile } = require("../validators/profileValidator");

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

module.exports = router;
