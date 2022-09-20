const router = require("express").Router();
const User = require("../model/user");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

/* REGISTER A USER */
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* LOGIN */
router.post("/login", async (req, res) => {
  console.log("test", req);
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(401).json("User not found");
      return;
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );

    console.log("hashed password", hashedPassword);
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    console.log("orignal password", originalPassword);
    originalPassword !== req.body.password &&
      res.status(401).json("Wrong credentials");

    /** jsonwebtoken */
    const accessToken = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      process.env.JWT_SEC,
      {
        expiresIn: "1hr",
      }
    );

    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
