var express = require("express");
var router = express.Router();
const fetch = require("node-fetch");

const NEWS_API_KEY = process.env.NEWS_API_KEY;
const MOVIES_API_KEY = process.env.MOVIES_API_KEY;
//root for get media
router.get("/articles", (req, res) => {
  fetch(
    `https://newsapi.org/v2/everything?sources=the-verge&apiKey=${NEWS_API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "ok") {
        res.json({ articles: data.articles });
      } else {
        res.json({ articles: [] });
      }
    });
});

//root for get movies
router.get("/movies", (req, res) => {
  fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${MOVIES_API_KEY}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.results) {
        res.json({ movies: data.results });
      } else {
        res.json({ movies: [] });
      }
    });
});

module.exports = router;
