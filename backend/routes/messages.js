const express = require("express");
const { createMessage, getMessage } = require("../controllers/conversation");

const router = express.Router();

router.post("/message", createMessage);
router.get("/getMessage/:conversationId", getMessage);

module.exports = router;