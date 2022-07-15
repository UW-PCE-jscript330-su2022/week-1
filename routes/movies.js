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
        res.status(404).send({ error: res.json(theMovie.message) });

    }
});

router.get("/titles/:title", async (req, res, next) => {

    const theMovie = await movieData.getByTitle(req.params.title)
    if (theMovie){
        res.json(theMovie)
    } else{
        res.status(404).send({ error: res.json(theMovie.message) });
    }
});

router.post("/", async (req, res, next) => {
    const result = await movieData.create(req.body);

    if(result.newObjectId){
        res.status(200).send(result.message)
    } else{
        res.status(404).send(result.message)
    }

});

router.put("/:id", async (req, res, next) => {

    const theMovie = await movieData.updateById(req.params.id, req.body)

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


    // if(myData.acknowledged===true){
    //     console.log('acknowledged is true')
    // }
    // if(myData){
    //     //console.log('acknowledged equals true')
    //     res.status(200)
    // }
    //res.status(200)


    if (myData.acknowledged===true){
        res.status(200).send({message: `Document with ID ${req.params.id} successfully deleted`})
    } else{
        res.status(404).send({ error: myData.message });
    }



});

module.exports = router;
