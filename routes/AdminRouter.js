const { createProfile } = require("../controllers/AdminController");
const { validateProfile } = require("../validators/profileValidator");

const router = require("express").Router();

router.post("/createprofile", validateProfile, createProfile);

module.exports = router;
