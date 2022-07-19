const { Router } = require("express");
const router = Router();

const movieData = require('../dataInterface/movies');

// curl: http://localhost:5000/movies
router.get("/", async (req, res, next) => {
    let movieList = await movieData.getAll();
    res.status(200).send(movieList);
});

// curl: http://localhost:5000/movies/title/Avatar
router.get("/title/:title", async (req, res, next) => {
    const result = await movieData.getByTitle(req.params.title);
    
    // Lifted this off the internets...
    // Normally Object.keys(result).length would give an integer
    // ... as a result. But if we negate it with !, it will give
    // ... us false, because if there is an integer, then there
    // ... is a result. So in a convoluted way, if there is 
    // ... content, then it will proved us false. If there isn't
    // ... content, then it will give us true.
    const resultIsEmptyObj = await !Object.keys(result).length;

    if (resultIsEmptyObj) { // If there is nothing, this will be true.
        res.status(404).json({error: `Title ${req.params.title} not found.`});
    }
    else { res.status(200).json(result); }
    
  });

// curl: http://localhost:5000/movies/573a13b7f29313caabd49ace
router.get("/:id", async (req, res) => {
    const result = await movieData.getById(req.params.id);

    if (result) { res.status.json(result); }
    else { res.status(404).json({error: `Term ${req.params.id} not found.`}); }
});

// curl -X POST -H "Content-Type: application/json" -d
//                  '{"field":"new item value"}' http://localhost:5000/movies
router.post("/", (req, res, next) => {
    const result = movieData.create(req.body);
    
    if (result) {
        res.status(200).json({message: 'Successful post made.'});
    }
    else {
        res.status(404).json({message: 'You have brought shame upon your house.'})
    }
});

// curl -X PUT -H "Content-Type: application/json" -d
//                  '{"field":"updated value"}' http://localhost:5000/movies/7
router.put("/:id", async (req, res, next) => {
  const result = await movieData.updateById(req.params.id, req.body);

  if(result){ res.status(200).json(result) }
  else{ res.status(404).json({ error: `Update not made. Id ${req.params.id} not found.` })}
});

// curl -X DELETE http://localhost:5000/movies/7
router.delete("/:id", (req, res, next) => {
  const result = movieData.deleteById(req.params.id);
  if(result.acknowledged) { res.status(200).json({message: `ID ${id} has been deleted.`}); }
  else { res.status(404).json({error: `ID ${req.params.id} not found.`})}
});

module.exports = router;
