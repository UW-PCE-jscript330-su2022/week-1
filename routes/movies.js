const { Router } = require("express");
const router = Router();

const movieData = require('../dataInterface/movies');

// curl http://localhost:5000/movies/title/<title url encoded>
router.get("/title/:title", async (req, res, next) =>
{
  try {
    let movieList = await movieData.getByTitle(req.params.title)
    if (movieList.length > 0) {
      res.status(200).send(movieList);
    } else {
      res.status(404).send({error: `No movies with title of ${req.params.title} found`})
    }
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
});

// curl http://localhost:5000/movies/ptitle/<partial title url encoded>
router.get("/ptitle/:title", async (req, res, next) =>
{
  try {
    let movieList = await movieData.getByPartialTitle(req.params.title)
    if (movieList.length > 0) {
      res.status(200).send(movieList);
    } else {
      res.status(404).send({error: `No movies with partial title of ${req.params.title} found`});
    }
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
});

// curl http://localhost:5000/movies
router.get("/", async (req, res, next) => {
  try {
    let movieList = await movieData.getAll()
    if (movieList.length > 0) {
      res.status(200).send(movieList);
    } else {
      res.status(404).send(`No movies were found`)
    }
  } catch (e) {
    console.error(e)
    res.status(500).send(e);
  }
});

// curl http://localhost:5000/movies/573a1390f29313caabcd4135
router.get("/:id", async (req, res, next) => {
  try {
    const theMovie = await movieData.getById(req.params.id)
    if (theMovie) {
      res.status(200).send(theMovie)
    } else {
      res.status(404).send({error: `no item found with id ${req.params.id}`});
    }
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
});

// curl -X POST -H "Content-Type: application/json" -d '{"title":"Llamas From Space", "plot":"Aliens..."}' http://localhost:5000/movies
router.post("/", async (req, res, next) => {
  try {

    let result = await movieData.create(req.body);
    if (!result.newObjectId) {
      res.status(400).send({error: `There was a problem with the insert Message: ${result.message}`})
    } else {
      res.status(200).send(result);
    }
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
});

// curl -X PUT -H "Content-Type: application/json" -d '{"plot":"Sharks..."}' http://localhost:5000/movies/573a1390f29313caabcd42e8
router.put("/:id", async (req, res, next) => {
  try {
    let updatedList = await movieData.updateById(req.params.id, req.body)
    res.status(200).send(updatedList)
  } catch (e) {
    console.error(e)
    res.status(500).send(e);
  }
});

// curl -X DELETE http://localhost:5000/movies/573a1390f29313caabcd4135
router.delete("/:id", async (req, res, next) => {
  try {
    const result = await movieData.deleteById(req.params.id)
    res.status(200).send(result)
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
});

module.exports = router;
