const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  console.log(req.body);
  try {
    const post = await new Post(req.body).save();

    res.json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
