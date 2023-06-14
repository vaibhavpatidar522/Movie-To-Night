const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {

   const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password , salt) 


  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashPassword
  });
  try {
    const user = await newUser.save();
    const { password, ...info } = user._doc;
    res.status(201).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(401).json("Wrong password or username!");
    }

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: "5d" }
    );

    const { password, ...info } = user._doc;

    res.status(200).json({ ...info, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router; 