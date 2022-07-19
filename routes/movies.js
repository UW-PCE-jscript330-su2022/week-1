const { Router } = require("express");
const router = Router();

const movieData = require('../dataInterface/movies');

// curl http://localhost:5001/movies/titles/Titanic
router.get("/titles/:title", async (req, res, next) => {
  const theTitle = await movieData.getByTitle(req.params.title)
  if(theTitle){
    res.status(200).send(theTitle)
  } else {
    res.status(404).send({ error: `no item found with title ${req.params.title}` });
  }
});

// curl http://localhost:5001/movies
router.get("/", async (req, res, next) => {
  let movieList = await movieData.getAll()
  res.status(200).send(movieList)
});

// curl http://localhost:5001/movies/573a1390f29313caabcd4135
router.get("/:id", async (req, res, next) => {
  const theMovie = await movieData.getById(req.params.id)
  if(theMovie){
    res.status(200).send(theMovie)
  } else {
    res.status(404).send({ error: `no item found with id ${req.params.id}` });
  }
});

// curl -X POST -H "Content-Type: application/json" -d '{"title":"Llamas From Space", "plot":"Aliens..."}' http://localhost:5001/movies
router.post("/", async (req, res, next) => {
  let result = await movieData.create(req.body);
  // TODO: if !result.newObjId send something different
  res.status(200).send(result);
});

// curl -X PUT -H "Content-Type: application/json" -d '{"plot":"Sharks..."}' http://localhost:5001/movies/62d71b1785eb5024757655f4
router.put("/:id", async (req, res, next) => {
  let updatedList = await movieData.updateById(req.params.id, req.body)
  res.status(200).send(updatedList)
});

// curl -X DELETE http://localhost:5001/movies/62d71b1785eb5024757655f4
router.delete("/:id", async (req, res, next) => {
  const result = await movieData.deleteById(req.params.id)
  res.status(200).send(result)
});

module.exports = router;