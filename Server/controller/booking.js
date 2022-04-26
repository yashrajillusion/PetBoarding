const express = require("express");
const authenticate = require("../middleware/authenticate");
const authorization = require("../middleware/authorization");
const router = express.Router();
const Booking = require("../model/booking");
router.get("/", async (req, res) => {
  try {
    if (req.query.admin === "admin") {
      let allbooking = await Booking.find()
        .populate({ path: "petId", select: ["name"] })
        .lean()
        .exec();
      return res.status(200).send(allbooking);
    }
    let booking = await Booking.find({ userId: req.query.user })
      .populate({ path: "petId", select: ["name"] })
      .lean()
      .exec();
    return res.status(200).send(booking);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

router.post("/", async (req, res) => {
  try {
    let booking = await Booking.create(req.body);
    return res.status(200).send(booking);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    let booking = await Booking.findById(req.params.id).lean().exec();
    return res.status(200).send(booking);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});
router.delete("/:id", async (req, res) => {
  try {
    let booking = await Booking.findByIdAndDelete(req.params.id).lean().exec();
    return res.status(200).send(booking);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});
router.patch("/:id", authenticate, authorization, async (req, res) => {
  try {
    let booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).send(booking);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

module.exports = router;
