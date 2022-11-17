const express = require("express");
const {
  createConversation,
  getConversation,
} = require("../controllers/conversation");

const router = express.Router();

router.post("/conversation", createConversation);
router.get("/getConversation/:userId", getConversation);

module.exports = router;
