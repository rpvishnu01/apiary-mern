const express = require("express");
const { authUser } = require("../middlwares/auth");
const {
  createPost,
  getAllPosts,
  comment,
  deletePost,
} = require("../controllers/post");

const router = express.Router();
router.post("/createPost",authUser, createPost);
router.get("/getAllPosts", authUser, getAllPosts);
router.put("/comment", authUser, comment);
router.delete("/deletePost/:id", authUser, deletePost);
module.exports = router;
