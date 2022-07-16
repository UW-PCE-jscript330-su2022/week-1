////////////////////////////////////////////////////////////////////////////////
// routes/movies.js ////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

const { Router } = require("express");
const router = Router();

const movieData = require('../dataInterface/movies');

const msg404 = (missingMovie) => {
  return `🛆 404: Movie ${missingMovie} not found.`
}

// curl http://localhost:5000/movies
router.get("/", async (req, res, next) => {
  let movieList = await movieData.getAll();
  res.status(200).send(movieList);
});

// curl http://localhost:5000/movies/573a1390f29313caabcd4135
router.get("/:id", async (req, res, next) => {
  const gotMovie = await movieData.getById(req.params.id);
  if (!gotMovie) {
    res.status(404).send(msg404(req.params.id));
  } else {
    res.status(200).send(gotMovie);
  }
});

// curl http://localhost:5000/movies/Titanic
router.get("/title/:title", async (req, res, next) => {
  const gotByTitle = await movieData.getByTitle(req.params.title);
  if (!gotByTitle) {
    res.status(404).send(msg404(req.params.title));
  } else {
    res.status(200).send(gotByTitle);
  }
})

// curl -X POST -H "Content-Type: application/json" -d '{"title": "yolo"}' http://localhost:5000/movies
router.post("/", async (req, res, next) => {
  let result = await movieData.create(req.body);
  console.log(result);
  if (!result.newObjectId) {
    res.status(404).send(result);
  } else {
    res.status(200).send(result);
  }
});

// curl -X PUT -H "Content-Type: application/json" -d '{"field": "updated value"}' http://localhost:5000/movies
router.put("/:id", (req, res, next) => {
  movieData.updateById(req.params.id, req.body);
  res.status(200).send();
});

// curl -X DELETE http://localhost:5000/movies/573a1390f29313caabcd4135
router.delete("/:id", (req, res, next) => {
  movieData.deleteById(req.params.id);
  res.status(200).send();
});

module.exports = router;
