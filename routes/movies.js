const { Router } = require("express");
const router = Router();

const movieData = require('../dataInterface/movies');

// curl http://localhost:5001/movies/titles/Titanic
router.get("/titles/:title", async (req, res, next) => {
  const theTitle = await movieData.getByTitle(req.params.title)
  if (theTitle) {
    res.status(200).send(theTitle)
  } else {
    res.status(404).send({ error: `no item found with title ${req.params.title}` });
  }
});

// curl http://localhost:5001/movies
router.get("/", async (req, res, next) => {
  let movieList = await movieData.getAll()
  if (movieList != []) {
    res.status(200).send(movieList)
  } else {
    res.status(404).send({ error: 'no movies found' });
  }
});

// curl http://localhost:5001/movies/573a1390f29313caabcd4135
router.get("/:id", async (req, res, next) => {
  const theMovie = await movieData.getById(req.params.id)
  if (theMovie) {
    res.status(200).send(theMovie)
  } else {
    res.status(404).send({ error: `no item found with id ${req.params.id}` });
  }
});

// curl -X POST -H "Content-Type: application/json" -d '{"title":"Llamas From Space", "plot":"Aliens..."}' http://localhost:5001/movies
router.post("/", async (req, res, next) => {
  let result = await movieData.create(req.body);
  if (result.newObjectId) {
    res.status(200).send(result.message);
  } else {
    res.status(404).send(result.message);
  }
});


// curl -X PUT -H "Content-Type: application/json" -d '{"plot":"Sharks..."}' http://localhost:5001/movies/62d732c16a75185f01032f9b
router.put("/:id", async (req, res, next) => {
  let updatedList = await movieData.updateById(req.params.id, req.body)
  if (updatedList) {
    res.status(200).send(updatedList.message);
  } else {
    res.status(404).send(result.message);
  }
});

// curl -X DELETE http://localhost:5001/movies/62d732c16a75185f01032f9b
router.delete("/:id", async (req, res, next) => {
  const result = await movieData.deleteById(req.params.id)
  if (result) {
    res.status(200).send(result.message);
  } else {
    res.status(404).send(result.message);
  }
});

module.exports = router;