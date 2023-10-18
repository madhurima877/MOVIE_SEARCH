const express = require('express')
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const colors = require("colors");
const Movie = require("./models/Movie");
const axios = require("axios");
require('dotenv').config();
const port= process.env.PORT
const dbURL=process.env.DBURL
mongoose.connect(dbURL,{useNewUrlParser:true})
  .then(() => console.log("connection open!"))
  .catch((err) => console.log(err));

 
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}))

app.get("/",async (req, res) => {
  const movies = await Movie.find({});
  res.render("index", { movies });
});

app.post("/",async (req, res) => {
  const {searchText} = req.body;
  await Movie.deleteMany({});
  axios
    .get(`https://api.tvmaze.com/search/shows?q=${searchText}`)
    .then((result) => {
      let movies = result.data;
      movies.forEach((movie) => {
        if (movie.show.image !== null && movie.show.runtime) {
          Movie.create({
            name: movie.show.name,
            year: movie.show.premiered,
            image: movie.show.image.medium,
          });
        }
      });

      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
} );


app.listen(port, () => console.log(`Server listening at http://localhost:8080`.red))