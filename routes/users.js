var express = require("express");
var router = express.Router();
const User = require("../models/users");
const uid2 = require("uid2");
const bcrypt = require("bcrypt");
//root for register
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    return res.json({ result: false, error: "user already exist" });
  }
  const hash = bcrypt.hashSync(password, 10);
  const newUser = new User({
    username,
    email,
    password: hash,
    token: uid2(32),
  });
  await newUser.save().then((newUser) => {
    //const dataUser = await User.findOne({ token: newUser.token });
    res.json({ result: true, token: newUser });
  });
});
//root for connect
router.post("/connect", (req, res) => {
  User.findOne({
    username: { $regex: new RegExp(req.body.username, "i") },
  }).then((data) => {
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: true, token: data.token });
    } else {
      res.json({ result: false, error: "no found" });
    }
  });
});
//root for get user by token
router.get("/:token", (req, res) => {
  User.findOne(req.query.token).then((data) => {
    res.json({ data: data });
  });
});
//root for get allusers
router.get("/", (req, res) => {
  User.find().then((data) => {
    res.json({ alluser: data });
  });
});

module.exports = router;
