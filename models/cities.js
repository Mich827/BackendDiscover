const mongoose = require("mongoose");

const citySchema = mongoose.Schema({
  cityName: String,
  main: String,
  description: String,
  temp: Number,
  tempMin: Number,
  tempMax: Number,
});

const City = mongoose.model("cities", citySchema);
module.exports = City;
