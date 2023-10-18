const mongoose = require("mongoose");
const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  runtime: {
    type: Number,
    min:1,
  },
  year: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;