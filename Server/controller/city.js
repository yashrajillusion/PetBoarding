const express = require("express");
const router = express.Router();
const City = require("../model/cities");

router.post("/", async (req, res) => {
  try {
    let city = await City.create(req.body);
    return res.status(200).send(city);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

router.get("/", async (req, res) => {
  try {
    let city = await City.find().lean().exec();
    return res.status(200).send(city);
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    let city = await City.findByIdAndUpdate(req.params.id, { new: true });
    return res.status(200).send(city);
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let city = await City.findByIdAndDelete(req.params.id).lean().exec();
    return res.status(200).send(city);
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

module.exports = router;
