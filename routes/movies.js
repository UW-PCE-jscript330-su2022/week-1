const { Router } = require("express");
const router = Router();

const movieData = require('../dataInterface/movies');
//curl http://localhost:3000/movies/titles/titanic
// HOMEWORK TODO: add a get by title route handler
router.get("/titles/:title", async (req, res, next)=> {
  let theMovie = await movieData.getByTitle(req.params.title)
  if(theMovie){
    res.status(200).send(theMovie)
  } else {
    res.status(404).send({ error: `no item found with title ${req.params.title}` });
  }
});

// curl http://localhost:5000/movies
router.get("/", async (req, res, next) => {
  let movieList = await movieData.getAll()
  res.status(200).send(movieList)
});

// curl http://localhost:5000/movies/573a1390f29313caabcd5c0f
router.get("/:id", async (req, res, next) => {
  const theMovie = await movieData.getById(req.params.id)

  if(theMovie){
    res.status(200).send(theMovie)
  } else {
    res.status(404).send({ error: `no item found with id ${req.params.id}` });
  }
});

// curl -X POST -H "Content-Type: application/json" -d '{"id":1,"title":"Llamas From Space", "plot":"Aliens..."}' http://localhost:5000/movies
// curl -X POST -H "Content-Type: application/json" -d '' http://localhost:5000/movies
router.post("/", async (req, res, next) => {
 
  let result = await movieData.create(req.body);
  
  // TODO: if !result.newObjId send something different
  if (result) {
    res.status(200).send(result);
  } else {
  res.status(404).send({ error: `item not created` });
  }
}
);

// curl -X PUT -H "Content-Type: application/json" -d '{"plot":"Sharks..."}' http://localhost:5000/movies/573a1390f29313caabcd42e8
router.put("/:id", async (req, res, next) => {
  let updatedList = await movieData.updateById(req.params.id, req.body)
  if (!updatedList){
    res.status(404).send({ error: `no item found with id ${req.params.id}` })
  } else {
  res.status(200).send(updatedList)
  }
});

// curl -X DELETE http://localhost:5000/movies/573a1390f29313caabcd4135
router.delete("/:id", async (req, res, next) => {
  const result = await movieData.deleteById(req.params.id)
  if (!result){
    res.status(404).send({ error: `no item found with id ${req.params.id}` })
  } else {
  res.status(200).send(result)
  }
});

module.exports = router;