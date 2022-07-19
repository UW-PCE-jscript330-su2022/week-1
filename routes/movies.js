const { Router } = require("express");
const router = Router();

const movieData = require('../dataInterface/movies');

// curl http://localhost:5000/movies
router.get("/", async (req, res, next) => {
  let movieList = await movieData.getAll();

  if (movieList) {
    res.status(200).send(movieList)
  } else {
    res.status(404).send({ error: `no movies were found.` });
  }
});

// curl http://localhost:5000/movies/573a1394f29313caabcdf639
router.get("/:id", async (req, res, next) => {
  const theMovie = await movieData.getById(req.params.id)
  if(theMovie){
    res.status(200).send(theMovie)
  } else {
    res.status(404).send({ error: `no item found with this id ${req.params.id}` });
  }
});
// curl http://localhost:5000/movies/title/Titanic
// curl http://localhost:5000/movies/title/Back%20to%20the%20Future
router.get("/title/:title", async (req, res, next) => {
  const theMovie = await movieData.getByTitle(req.params.title)
  if(theMovie){
    res.status(200).send(theMovie)
  } else {
    res.status(404).send({ error: `no item found with this title ${req.params.title}` });
  }
});

// curl -X POST -H "Content-Type: application/json" -d "{ \"title\": \"new title\" }" "http://localhost:5000/movies"
router.post("/", async (req, res, next) => {
  let result = await movieData.create(req.body);
  if (result) {
    res.status(200).send(result);
  } else {
    res.status(404).send({ error: `the resource failed to be created` });
  }
});

// curl -X PUT -H "Content-Type: application/json" -d "{ \"title\": \"new title\" }" "http://localhost:5000/movies/62ce40898d272992fae9bbb2"
// curl -X PUT -H "Content-Type: application/json" -d "{ \"title\": \"new title again\" }" "http://localhost:5000/movies/62ce40898d272992fae9bbb2"
router.put("/:id", async (req, res, next) => {
  let updatedList = await movieData.updateById(req.params.id, req.body)
  if (updatedList) {
    res.status(200).send(updatedList)
  } else {
    res.status(404).send({ error: `the resource failed to be udpated` });
  }
});

// curl -X DELETE http://localhost:5000/movies/62ce40898d272992fae9bbb2
router.delete("/:id", (req, res, next) => {
  const deletedList = movieData.deleteById(req.params.id)
  if (deletedList) {
    res.status(200).send({deletedList: deletedList})
  } else {
    res.status(404).send({ error: `the resource failed to be udpated` });
  }
});

module.exports = router;