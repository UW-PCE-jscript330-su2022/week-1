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
        res.status(404).send({ error: res.json(theMovie.message) });
        //res.status(404);

    }
});

// route title works, but then route id stops working
// route id expects a string of 12 characters as the id

router.get("/titles/:title", async (req, res, next) => {

    const theMovie = await movieData.getByTitle(req.params.title)
    if (theMovie){
        res.json(theMovie)
    } else{
        // mongodb requires a string of 12 bytes
        // so if you enter 123 as id, the app will crash
        //res.status(404).send({ error: 'not found' });
        //res.status(404);
        res.status(404).send({ error: res.json(theMovie.message) });


    }
});

router.post("/", async (req, res, next) => {
    const result = await movieData.create(req.body);
    //TODO: if result.message == ERROR say something
    //res.sendStatus(200).send(result)
    res.sendStatus(200)
});

router.put("/:id", async (req, res, next) => {

    // const { title } = req.body
    // const updatedMovie = {
    //     id: req.params.id,
    //     title: title
    // }

    const theMovie = await movieData.updateById(req.params.id, req.body)

    console.log(theMovie.modifiedCount)

    if (theMovie.modifiedCount===0){
        res.status(200).send({ message: "nothing modified" });
    } else if (theMovie.modifiedCount===1){
        res.status(200).json(req.body)
    } else{
        res.status(404).send({ error: theMovie.message });
    }

});

router.delete("/:id", async(req, res, next) => {

    const myData = await movieData.deleteById(req.params.id)

    if (myData.acknowledged===true){
        res.sendStatus(200)
    } else{
        res.status(404).send({ error: myData.message });
    }

});

module.exports = router;
