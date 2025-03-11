const router = require("express").Router();
const { createProfile, getProfile, editProfile } = require("../controllers/AdminController");
const { ensureNewProfile, ensureUniqueProfile } = require("../middlewares/Profile");
const { validateProfile } = require("../validators/profileValidator");

router.get("/profile", getProfile);

router.post("/createprofile", validateProfile, ensureNewProfile, createProfile);
router.put("/editprofile", validateProfile, ensureUniqueProfile, editProfile);

module.exports = router;
