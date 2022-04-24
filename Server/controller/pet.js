const express = require("express");
const router = express.Router();
const Pet = require("../model/pets");

router.get("/", async (req, res) => {
  try {
    let pet = await Pet.find({ userId: req.query.user }).lean().exec();
    return res.status(200).send(pet);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

router.post("/", async (req, res) => {
  try {
    let pet = await Pet.create(req.body);
    return res.status(200).send(pet);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    let pet = await Pet.findById(req.params.id).lean().exec();
    return res.status(200).send(pet);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});
router.delete("/:id", async (req, res) => {
  try {
    let pet = await Pet.findByIdAndDelete(req.params.id).lean().exec();
    return res.status(200).send(pet);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

module.exports = router;
