const Post = require("../models/Post");

exports.getOne = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).send(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    let posts;
    if (req.query && req.query.search)
      posts = await Post.find({ title: new RegExp(req.query.search, "i") });
    else posts = await Post.find();
    res.status(200).send(posts);
  } catch (error) {
    res.status(500).json(error);
  }
};


exports.createPost = async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    try {
      if (post.username === req.body.username) {
        try {
          const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json(updatedPost);
        } catch (error) {
          res.status(500).json(error);
        }
      } else res.status(401).json("You can update only your post");
    } catch (error) {
      res.status(500).json(error);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    try {
      if (post.username === req.body.username) {
        try {
          await post.delete();
          res.status(200).json("Post has been deleted successfully");
        } catch (error) {
          res.status(500).json(error);
        }
      } else res.status(401).json("You can delete only your post");
    } catch (error) {
      res.status(500).json(error);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
