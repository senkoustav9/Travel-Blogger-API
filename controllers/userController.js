const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

exports.getOne = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(new Error("No User found with this id"));
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updateUser = async (req, res) => {
  if (req.body.userId && req.body.userId === req.params.id)
   {
    if (req.body.password)
      req.body.password = await bcrypt.hash(req.body.password, 10);
    
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          username: req.body.username,
          email: req.body.email,
          profilePic : req.body.profilePic,
          password : req.body.password
        },
        { new: true }
      );
      updatedUser.password = undefined;
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).send(error);
    }
  } else res.status(401).json("Unauthorised user");
};

exports.deleteUser = async (req, res) => {
  if (req.body.userId && req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).send("User is deleted");
      } catch (error) {
        res.status(500).send(error);
      }
    } catch (error) {
      res.status(404).send("User not found");
    }
  } else res.status(401).send("Unauthorised user");
};