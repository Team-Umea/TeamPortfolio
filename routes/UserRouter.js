const { subscribe } = require("../controllers/SubscribeController");

const router = require("express").Router();

router.post("/subscribe", subscribe);

module.exports = router;
