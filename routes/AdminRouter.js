const { createProfile } = require("../controllers/AdminController");
const { ensureNewProfile } = require("../middlewares/Profile");
const { validateProfile } = require("../validators/profileValidator");

const router = require("express").Router();

router.post("/createprofile", validateProfile, ensureNewProfile, createProfile);

module.exports = router;
