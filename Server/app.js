require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
app.use(cors());
app.use(express.json());
const connect = require("./config/db");

const userController = require("./controller/user");
const entityController = require("./controller/entity");
const cityController = require("./controller/city");
const petController = require("./controller/pet");
const bookingController = require("./controller/booking");

app.use("/auth", userController);
app.use("/entity", entityController);
app.use("/cities", cityController);
app.use("/pet", petController);
app.use("/booking", bookingController);

const PORT = process.env.PORT || 5001;
app.listen(PORT, async (req, res) => {
  try {
    await connect();
  } catch (err) {
    console.log(err.message);
  }
  console.log(`Listening on ${PORT}`);
});
