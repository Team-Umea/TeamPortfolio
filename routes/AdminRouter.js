const router = require("express").Router();
const { createProfile, getProfile } = require("../controllers/AdminController");
const { ensureNewProfile } = require("../middlewares/Profile");
const { validateProfile } = require("../validators/profileValidator");

router.get("/profile", getProfile);

router.post("/createprofile", validateProfile, ensureNewProfile, createProfile);

module.exports = router;
