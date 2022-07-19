const { Router } = require("express");
const router = Router();
const movieData = require('../dataInterface/movies');

// This NPM Package aid in parsing the request body
const bodyParser = require('body-parser');
// router?app.use(something()) tells the server to use this function throug it
router.use(bodyParser())

router.get("/", async  (req, res, next) => {
  const movies = await movieData.getAll()
  res.status(200).send(movies)
});
router.get("/title/:title(.{0,})", async(req, res, next) =>{
  console.log(req.params.title)
  if(req.params.title){
    let decodedTitle = decodeURIComponent(req.params.title)
    const query = await movieData.getByTitle(decodedTitle)
    if(query && query.length > 0){
      res.status(200).json(query)
    }else{
      res.status(404).send({error: "not found"})
    }
  }else{
    res.status(502).send({error: "Missing Title"})
  }
})

router.get("/title=:title(.{0,})/year=:year(.{0,})", (req, res, next)=>{
  console.log(req.params.title, req.params.year)
})
// "The Great Train Robbery" 1903

router.get("/:id", async (req, res, next) => {
  if(req.params.id.length===24){
    const query = await movieData.getById(req.params.id)
    if(query){
      res.status(200).json(query)
    }else{
      res.status(404).send({error: "not found"})
    }
  }else{
    res.status(502).send({error: "invalid ID"})
  }
});
router.post("/", async (req, res, next) => {
  let result = await movieData.create(req.body);
  if (!result.newObjectId){
    res.status(502).send({error: 'Movie was not created'})
  }else{
    res.status(200).send(result);
  }
});

router.put("/:id(.{0,})",  async (req, res, next) => {
  if(req.params.id){
    let updatedList = await movieData.updateById(req.params.id, req.body)
    res.status(200).send(updatedList)
  }else{
    res.status(502).send({error: 'ID missing in query'})
  }
});


router.delete("/delete/:id(.{0,})", async (req, res, next) => {
  if(req.params.id){
    const result = await movieData.deleteById(req.params.id)
    res.status(200).send(result)
  }else{
    res.status(502).send({error: 'ID missing in query'})
  }
});

module.exports = router;
