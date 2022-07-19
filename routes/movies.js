const { Router } = require("express");
const router = Router();

const movieData = require('../dataInterface/movies');

// curl http://localhost:5000/movies
router.get("/", async (req, res, next) => {
  let movieList = await movieData.getAll();

  res.status(200).send(movieList)
});

// curl http://localhost:5000/movies/573a1394f29313caabcdf639
router.get("/:id", async (req, res, next) => {
  const theMovie = await movieData.getById(req.params.id)
  if(theMovie){
    res.status(200).send(theMovie)
  } else {
    res.status(404).send({ error: `no item found with id ${req.params.id}` });
  }
});
// curl http://localhost:5000/movies/title/Titanic
// curl http://localhost:5000/movies/title/Back%20to%20the%20Future
router.get("/title/:title", async (req, res, next) => {
  const theMovie = await movieData.getByTitle(req.params.title)
  console.log(req.params.title);
  console.log(theMovie);
  if(theMovie){
    res.status(200).send(theMovie)
  } else {
    res.status(404).send({ error: `no item found with title ${req.params.title}` });
  }
});

// curl -X POST -H "Content-Type: application/json" -d "{ \"title\": \"new title\" }" "http://localhost:5000/movies"
router.post("/", async (req, res, next) => {
  let result = await movieData.create(req.body);
  res.status(200).send(result);
});

// curl -X PUT -H "Content-Type: application/json" -d "{ \"title\": \"new title\" }" "http://localhost:5000/movies/62ce40898d272992fae9bbb2"
router.put("/:id", async (req, res, next) => {
  let updatedList = await movieData.updateById(req.params.id, req.body)
  res.status(200).send(updatedList)
});

// curl -X DELETE http://localhost:5000/movies/7
router.delete("/:id", (req, res, next) => {
  const updatedList = movieData.deleteById(req.params.id)
  res.status(200).send({updatedList: updatedList})
});

module.exports = router;