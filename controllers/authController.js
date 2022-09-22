const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return next(new Error("Username or Email or Password is Missing"));

    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPass,
    });
    console.log(newUser);
    res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return next(new Error("Username or Password is missing"));

    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(req.body.password, user.password)))
      return next(new Error("Incorrect username or password"));

    user.password = undefined;
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};