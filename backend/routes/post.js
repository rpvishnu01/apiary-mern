const express = require("express");
const { createPost } = require("../controllers/post");
const router = express.Router();
router.post("/createPost",createPost);

module.exports = router;