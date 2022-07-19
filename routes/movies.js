////////////////////////////////////////////////////////////////////////////////
// routes/movies.js ////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

const { Router } = require("express");
const router = Router();

const movieData = require('../dataInterface/movies');

// Error Messages //////////////////////////////////////////////////////////////
// 400 //
const msg400InvalidId = () => {
  return `🛆 400: Invalid _id. _id must be a string of 12 bytes, a string of 24 hex characters, or an integer.`;
}
const msg400MissingTitle = () => {
  return `🛆 400: Movie must have a title.`;
}
// 404 //
const msg404TitleNotFound = (titleOfMissingMovie) => {
  return `🛆 404: Movie with title ${titleOfMissingMovie} not found.`;
}
const msg404IdNotFound = (idOfMissingMovie) => {
  return `🛆 404: Movie with _id ${idOfMissingMovie} not found.`;
}

// `curl http://localhost:5000/movies`
router.get("/", async (req, res, next) => {
  const response = await movieData.getAll();
  res.status(200).send(response);
});

// `curl http://localhost:5000/movies/573a13e6f29313caabdc56c7`
router.get("/:id", async (req, res, next) => {
  const response = await movieData.getById(req.params.id);
  if (!response) {
    res.status(404).send(msg404(req.params.id));
  } else if (response.status === 400) {
    res.status(400).send(msg400InvalidId());
  } else {
    res.status(200).send(response);
  }
});

// `curl http://localhost:5000/movies/title/Titanic`
router.get("/title/:title", async (req, res, next) => {
  const response = await movieData.getByTitle(req.params.title);
  if (response.length === 0) {
    res.status(404).send(msg404TitleNotFound(req.params.title));
  } else {
    res.status(200).send(response);
  }
})

// `curl -X POST -H "Content-Type: application/json" -d '{"title": "My New Movie"}' http://localhost:5000/movies`
router.post("/", async (req, res, next) => {
  if (!req.body.title) {
    res.status(400).send(msg400MissingTitle());
  } else {
    const result = await movieData.create(req.body);
    if (!result.newObjectId) {
      res.status(500).send(result);
    } else {
      res.status(201).send(result);
    }
  }
});

// `curl -X PUT -H "Content-Type: application/json" -d '{"field": "updated value"}' http://localhost:5000/movies/62d3359d0599ca59d923940e`
router.put("/:id", async (req, res, next) => {
  const result = await movieData.updateById(req.params.id, req.body);
  if (result.status === 400) {
    res.status(400).send(msg400InvalidId());
  } else if (result.modifiedCount === 0) {
    res.status(404).send(result);
  } else if (!result.acknowledged) {
    res.status(500).send(result);
  }else {
    res.status(200).send(result);
  }
});

// `curl -X DELETE http://localhost:5000/movies/573a1390f29313caabcd4135`
router.delete("/:id", async (req, res, next) => {
  const result = await movieData.deleteById(req.params.id);
  if (result.status === 400) {
    res.status(400).send(msg400InvalidId());
  } else if (result.deletedCount === 0) {
    res.status(404).send(msg404IdNotFound(req.params.id));
  } else if (!result.acknowledged) {
    res.status(500).send(result);
  } else {
    res.status(200).send(result);
  }
});

module.exports = router;
