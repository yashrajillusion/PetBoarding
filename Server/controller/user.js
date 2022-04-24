const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../model/user");
require("dotenv").config();
const newToken = (user) => {
  const token = jwt.sign({ user }, process.env.JWT_SECRET_KEY);
  return token;
};

router.get("/", async (req, res) => {
  try {
    let user = await User.find().lean().exec();
    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

router.post("/", async (req, res) => {
  try {
    let user = await User.create(req.body);
    let token = newToken(user);
    return res.status(200).send({ user, token });
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    let user = await User.find(req.params.id).lean().exec();
    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});
router.delete("/", async (req, res) => {
  try {
    // let user = await User.findByIdAndDelete(req.params.id).lean().exec();
    let user = await User.deleteMany({}).lean().exec();
    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("emai not exist");
    let match = user.checkPassword(req.body.password);
    if (!match) return res.status(400).send("password is wrong");
    let token = newToken(user);
    return res.status(200).send({ user, token });
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

module.exports = router;
