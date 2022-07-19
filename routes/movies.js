const { Router } = require("express");
const router = Router();

const movieData = require('../dataInterface/movies');

// curl -sS http://localhost:5001/movies
router.get("/", async (req, res, next) => {
    let movieList = await movieData.getAll()
    if (movieList!=[]) {
        res.status(200).send(movieList)
    } else {
        res.status(404).send(movieList.message);
    }
    next()
});

// curl -sS http://localhost:5001/movies/titles/Titanic
router.get("/titles/:title", async (req, res, next) => {
    let movieTitle = await movieData.getByTitle(req.params.title)
    if (movieTitle) {
        res.status(200).send(movieTitle)
    } else {
        res.status(404).send({ error: `no item found with title ${req.params.title}` });
    }
    next()
});

// curl -sS http://localhost:5001/movies/573a13bcf29313caabd57d52
router.get("/:id", async (req, res, next) => {
    const theMovie = await movieData.getById(req.params.id)
    if (theMovie) {
        res.status(200).send(theMovie)
    } else {
        res.status(404).send({ error: `no item found with id ${req.params.id}` });
    }
    next()
});

// curl -sS -X POST -H "Content-Type: application/json" -d '{"title":"NEW TITLE"}' http://localhost:5001/movies
router.post("/", async (req, res, next) => {
    let result = await movieData.create(req.body);
    if (result.newObjectId) {
        res.status(200).send(result.message)
    } else {
        res.status(404).send(result.message)
    }
    next()
});

// curl -sS -X PUT -H "Content-Type: application/json" -d '{"plot":"Sharks..."}' http://localhost:5001/movies/62d72a3f65117358ad62d268

router.put("/:id", async (req, res, next) => {
    let updatedList = await movieData.updateById(req.params.id, req.body)
    if (updatedList) {
        res.status(200).send(updatedList.message)
    } else {
        res.status(404).send(updatedList.message)
    }
    next()
  });
  
  // curl -sS -X DELETE http://localhost:5001/movies/62d72a3f65117358ad62d268
  router.delete("/:id", async (req, res, next) => {
    const result = await movieData.deleteById(req.params.id)

    if (result) {
        res.status(200).send(result.message)
    } else {
        res.status(404).send(result.message)
    }
    next()
  });

module.exports = router;