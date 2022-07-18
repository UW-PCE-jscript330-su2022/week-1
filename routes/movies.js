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
    const resultIsEmptyObj = await !Object.keys(result).length;

    if (resultIsEmptyObj) { 
        res.status(404).json({error: `Title ${req.params.title} not found.`});
    }
    else { res.status(200).json(result); }
    
  });

// curl: http://localhost:5000/movies/573a13b7f29313caabd49ace
router.get("/:id", async (req, res) => {
    const result = await movieData.getById(req.params.id);

    if (result) { res.json(result); }
    else { res.status(404).json({error: `Term ${req.params.id} not found.`}); }
});

// curl -X POST -H "Content-Type: application/json" -d
//                  '{"field":"new item value"}' http://localhost:5000/movies
router.post("/", (req, res, next) => {
  itemData.create(req.body);
  res.sendStatus(200);
});

// curl -X PUT -H "Content-Type: application/json" -d
//                  '{"field":"updated value"}' http://localhost:5000/movies/7
router.put("/:id", (req, res, next) => {
  const result = itemData.updateById(req.params.id, req.body);
  if(result){ res.json(result) }
  else{ res.status(404).json({ error: `Update not made. Id ${req.params.id} not found.` })}
});

// curl -X DELETE http://localhost:5000/movies/7
router.delete("/:id", (req, res, next) => {
  const result = itemData.deleteById(req.params.id);
  if(result) {res.json(result); }
  else { res.status(404).json({error: `${req.params.id} not found.`})}
});

module.exports = router;
