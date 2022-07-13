const { Router } = require("express");
const router = Router();

const movieData = require('../dataInterface/movies');

router.get("/", async (req, res, next) => {

    let movieList = await movieData.getAll()
    res.status(200).send(movieList)
});

router.get("/:id", async (req, res, next) => {

    const theMovie = await movieData.getById(req.params.id)
    if (theMovie){
        res.json(theMovie)
    } else{
        // mongodb requires a string of 12 bytes
        // so if you enter 123 as id, the app will crash
        res.status(404).send({ error: 'not found' });
        //res.status(404);

    }
});

router.post("/", async (req, res, next) => {
    const result = await movieData.create(req.body);
    //TODO: if result.message == ERROR say something
    //res.sendStatus(200).send(result)
    res.sendStatus(200)
});

router.put("/:id", (req, res, next) => {

    const { id, field } = req.body
    const updatedMovie = {
        id: id,
        field: field
    }
    const theMovie = movieData.updateById(req.params.id, updatedMovie)
    if (!theMovie){
        res.status(200).send({ error: 'Movie not found but sending a 200 to indicate no action taken' });
    } else{

        res.status(200).json(theMovie)
    }

});

router.delete("/:id", async(req, res, next) => {

    const myData = await movieData.deleteById(req.params.id)

    if (myData){
        res.sendStatus(200)
    } else{
        res.status(404).send({ error: 'not found' });
    }

});

module.exports = router;
