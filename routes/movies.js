const { Router } = require("express");
const router = Router();

const movieData = require('../dataInterface/movies');

// curl -sS http://localhost:5000/movies
router.get("/", async (req, res, next) => {
    let movieList = await movieData.getAll()
    res.status(200).send(movieList)
});

// curl -sS http://localhost:5000/movies/titles/Titanic
router.get("/titles/:title", async (req, res, next) => {
    let movieTitle = await movieData.getByTitle(req.params.title) 
    res.status(200).send(movieTitle)
});

// curl -sS http://localhost:5000/movies/573a13bcf29313caabd57d52
router.get("/:id", async (req, res, next) => {
    const theMovie = await movieData.getById(req.params.id)
    if(theMovie) {
        res.status(200).send(theMovie)
    } else {
        res.status(404).send({error: `no movie found with id ${req.params.id}`});
    }

});

// curl -sS -X POST -H "Content-Type: application/json" -d '{"title":"NEW TITLE"}' http://localhost:5000/movies
router.post("/", async (req, res, next) => {
    let result = await movieData.create(req.body);
    res.sendStatus(200);
});

// curl -sS -X PUT -H "Content-Type: application/json" -d '{"field":"updated value"}' http://localhost:5000/movies/7
router.put("/:id", async (req, res, next) => {
    let updatedList = await movieData.updateById(req.params.id, req.body)
    res.status(200).send(updatedList)
});

// curl -sS -X DELETE http://localhost:5000/movies/7
router.delete("/:id", (req, res, next) => {
    const updatedList = movieData.deleteById(req.params.id)
    res.status(200).send({ updatedList: updatedList })
});

module.exports = router;