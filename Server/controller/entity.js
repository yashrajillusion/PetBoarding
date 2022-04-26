const express = require("express");
const router = express.Router();
const Entity = require("../model/entity");
const authenticate = require("../middleware/authenticate");
const authorization = require("../middleware/authorization");
router.post("/", authenticate, authorization, async (req, res) => {
  try {
    let entity = await Entity.create(req.body);
    return res.status(200).send(entity);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

router.get("/", async (req, res) => {
  try {
    let obj = {};
    let sort = {};
    let { page, size, cost, rating, city, verified } = req.query;
    page = page || 1;
    size = size || 5;
    if (city) {
      obj["city"] = city;
    }
    if (verified) {
      obj["verified"] = verified;
    }
    if (cost) {
      sort["cost"] = cost;
    }
    if (rating) {
      sort["rating"] = rating;
    }
    let entity = await Entity.find(obj)
      .skip((page - 1) * size)
      .limit(size)
      .sort(sort)
      .lean()
      .exec();

    let total = Math.ceil((await Entity.find(obj).lean().exec()).length / size);
    return res.status(200).send({ entity, total });
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    let entity = await Entity.findById(req.params.id).lean().exec();
    return res.status(200).send(entity);
  } catch (err) {
    return res.status(400).send(err.message);
  }
});
router.patch("/:id", authenticate, authorization, async (req, res) => {
  try {
    let entity = await Entity.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).send(entity);
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

router.delete("/:id", authenticate, authorization, async (req, res) => {
  try {
    let entity = await Entity.findByIdAndDelete(req.params.id).lean().exec();
    return res.status(200).send(entity);
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

module.exports = router;
