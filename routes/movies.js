const { Router } = require("express");
const { status } = require("express/lib/response");
const router = Router();

const movieData = require('../dataInterface/movies');

// curl http://localhost:5000/movies
router.get("/", async (req, res, next) => {
  let movieList = await movieData.getAll();
  if(movieList){
     res.status(200).send(movieList)
  } else {
    res.status(404).send({ error: `Movies not found` });
  }
});

// // curl http://localhost:5000/movies/573a1394f29313caabcdf639
router.get("/:id", async (req, res, next) => {
  const theMovie = await movieData.getById(req.params.id)
  if(theMovie){
    res.status(200).send(theMovie)
  } else {
    res.status(404).send({ error: `no item found with id ${req.params.id}` });
  }
});

// curl http://localhost:5000/movies/titles/zoot%20suit
router.get("/titles/:title", async (req, res, next) => {
  const theMovie = await movieData.getByTitle(req.params.title);
  if(theMovie.length <= 0){
    res.status(404).send({ error: `no movie found with the title: ${req.params.title}` });
  } else{
    res.status(200).send(theMovie)
  } 
});


// curl http://localhost:5000/movies/titlebyyear/Titanic/1997 //Attempted find by title and year but couldn't get it to work
router.get("/titlebyyear/:title/:year", async (req, res, next) => {
  const theMovie = await movieData.getByTitleAndYear(req.params.title, parseInt(req.params.year));
  console.log(req.params.title, parseInt(req.params.year))
  if(theMovie.length <= 0){
    res.status(404).send({ error: `no movie found with the title: ${req.params.title} in the year: ${req.params.year}` });
  } else{
    res.status(200).send(theMovie)
  } 
});


// curl -X POST -H "Content-Type: application/json" -d '{"title":"NEW TITLE"}' http://localhost:5000/movies
router.post("/", async (req, res, next) => {
 let result = await movieData.create(req.body);

 if(!result){
  res.status(400).send({ error: 'Error! Cannot create at this time' });
} else{
  res.status(201).send(result)
} 
});

// curl -X PUT -H "Content-Type: application/json" -d '{"field":"updated value"}' http://localhost:5000/movies/573a139af29313caabcf0d74
router.put("/:id", async (req, res, next) => {
  let result = await movieData.updateById(req.params.id, req.body)
 
  if (result.acknowledged === true){
    res.status(200).send(`Success! Movie with the ID# of ${req.params.id} now has an Updated TomatometerScore`);
   } else{
     res.status(400).send({ error: 'Not Able to update at this time' });
   }
});

// curl -X DELETE http://localhost:5000/movies/573a139af29313caabcf0d74
router.delete("/:id", async (req, res, next) => {
  const result = await movieData.deleteById(req.params.id)

  if (result.acknowledged === true){
   res.status(200).send(`Success! Movie with the ID# of ${req.params.id} has been deleted`);
  } else{
    res.status(400).send({ error: 'Not able to delete at This time' });
  }
});

module.exports = router;