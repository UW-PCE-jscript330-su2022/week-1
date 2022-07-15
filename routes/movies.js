const { Router } = require("express");
const router = Router();

const itemData = require('../dataInterface/movies');

// curl: http://localhost:5000/movies
router.get("/", (req, res, next) => {
  res.status(200).send(itemData.getAll())
});

// curl: http://localhost:5000/movies/7
router.get("/:id", (req, res, next) => {
  const result = itemData.getById(req.params.id);

  if (result) { res.json(result); }
  else { res.status(404).json({error: `value ${req.params.id} not found.`}); }
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
