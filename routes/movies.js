// In-class & homework exercises.

const { Router } = require("express");
const router = Router();

const movieData = require('../dataInterface/movies');

router.get("/", async (req, res, next) => {
  let movieList = await movieData.getAll();
  res.status(200).send(movieList);
});

// curl http://localhost:5000/movies/id#
router.get("/:id", async (req, res, next) => {
  let answer = await movieData.getById(req.params.id);
  if (answer) {
    res.send(answer);
  } else {
    res.status(404).send({ error: `That id doesn't exist.` });
  }
});

// curl http://localhost:5000/movies/search/
router.get("/search/:title", async (req, res, next) => {
// To Do
  const movieByTitle = await movieData.getByTitle(req.params.title); //path param (/path/path)
  //req.query.title to access query parameters (?title=)
  if (movieByTitle) {
    res.send(movieByTitle);
  } else {
    res.status(404).send({ error: "That title wasn't found." })
  }
});

// curl -X POST -H "Content-Type: application/json" -d '{"title":"NEW TITLE"}' http://localhost:5000/movies
router.post("/", async (req, res, next) => {
  let result = await movieData.create(req.body);
  // TODO: if !result.
  res.sendStatus(200).send(result);
});

// curl -X PUT -H "Content-Type: application/json" -d '{"field":"updated value"}' http://localhost:5000/movies/7
router.put("/:id", (req, res, next) => {
  let bodyOfReq = req.body;
  let answerTwo = movieData.updateById(req.params.id, bodyOfReq);
  if (answerTwo) {
    res.status(200).send(answerTwo);
  } else {
    res.status(200).send({ error: `That id doesn't exist.` })
  }
});

// curl -X DELETE http://localhost:5000/movies/7
router.delete("/:id", (req, res, next) => {
  let answerThree = movieData.deleteById(req.params.id);
  if (answerThree) {
    res.status(200).send(answerThree);
  }
});

module.exports = router;
