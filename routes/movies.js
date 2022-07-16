// In-class exercise building off homework.

const { Router } = require("express");
const router = Router();

const movieData = require('../dataInterface/movies');

router.get("/", (req, res, next) => {
  res.status(200).send(movieData.getAll())
});

// curl http://localhost:5000/movies/id#
router.get("/:id", (req, res, next) => {
  let answer = movieData.getById(req.params.id);
  if (answer) {
    res.send(answer);
  } else {
    res.status(404).send({ error: `That id doesn't exist.` });
  }
});

router.post("/", (req, res, next) => {
  movieData.create(req.body);
  res.sendStatus(200);
});

// curl -X PUT -H "Content-Type: application/json" -d '{"field":"example 4"}' http://localhost:5000/movies/7
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
    res.status(200).send({ msg: 'great success' });
  }
});

module.exports = router;
