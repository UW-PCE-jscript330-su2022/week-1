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

// curl http://localhost:5000/movies/7
router.get("/:id", async (req, res, next) => {
  const gotMovie = movieData.getById(req.params.id);
  if (!gotMovie) {
    res.status(404).send(msg404(req.params.id));
  } else {
    res.status(200).send(gotMovie);
  }
});

// curl -X POST -H "Content-Type: application/json" -d '{"field": "new item value"}' http://localhost:5000/movies
router.post("/", async (req, res, next) => {
  let result = await movieData.create(req.body);
  // TODO if !result.newObject, do somethin' else.
  res.sendStatus(200).send(result);
});

// curl -X PUT -H "Content-Type: application/json" -d '{"field": "updated value"}' http://localhost:5000/movies
router.put("/:id", (req, res, next) => {
  movieData.updateById(req.params.id, req.body);
  res.status(200).send();
});

// curl -X DELETE http://localhost:5000/movies/7
router.delete("/:id", (req, res, next) => {
  movieData.deleteById(req.params.id);
  res.status(200).send();
});

module.exports = router;
