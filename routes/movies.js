const { Router } = require("express");
const router = Router();

const moviesData = require('../dataInterface/movies');

router.get("/", async(req, res, next) => {
  let result = await moviesData.getAll()
  if(result){
    return res.status(200).send(result)
  }
  else {
    return res.status(404).send({error: "No data found"})
  }
});


router.get("/:id", async(req, res, next) => {
  const result = await moviesData.getById(req.params.id);
    if(result) {
      return res.status(200).send(result);
      }
      else {
        return res.status(404).json({error: "Movie does not exist"});
      } 
});

router.post("/", async(req, res, next) => {
  let result = await movieData.create(req.body);
  if(result){  
    return res.status(200).send(result);
  }
  else{
    return res.status(404).json({error: "Something went wrong in creating new movie"});
  }
});

router.put("/:id", async(req, res, next) => {
  if(!req.params.id){
    return res.status(400).send({error: "No id found"});
  }
  let result = await moviesData.updateById(req.params.id, req.body);
  if(result){
    return res.status(200).send(result);
  }
  else {
    return res.status(500).send({error: "something went wrong in updating the movie obj"})
  }
});

router.delete("/:id", async(req, res, next) => {
  let result = await moviesData.getById(req.params.id); 
    if(result){
        return res.status(200).send(result);
       }
        else {
          return res.status(404).json({error: "item does not exist"})
        }
});

router.get("/:title", async(req, res, next) => {
  const result = await moviesData.getByTittle(req.params.title);
    if(result) {
      return res.status(200).send(result);
      }
      else {
        return res.status(404).json({error: "Movie title does not exist"});
      } 
});

module.exports = router;
