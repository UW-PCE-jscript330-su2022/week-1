const { Router } = require("express");
const router = Router();

const itemData = require('../dataInterface/items');

router.get("/", (req, res, next) => {
  res.status(200).send(itemData.getAll())
});

router.get("/:id", (req, res, next) => {
  // NOTE: Completed.
  const result = itemData.getById(req.params.id);

  if (result) { res.json(result); }
  else { res.status(404).json({error: `value ${req.params.id} not found.`}); }
});

router.post("/", (req, res, next) => {
  itemData.create(req.body);
  res.sendStatus(200);
});

router.put("/:id", (req, res, next) => {
  // NOTE: Completed.
  const result = itemData.updateById(req.params.id, req.body);
  if(result){ res.json(result) }
  else{ res.status(404).json({ error: `Update not made. Id ${req.params.id} not found.` })}
});


router.delete("/:id", (req, res, next) => {
  // TODO: complete writing this route handler
  const result = itemData.deleteById(req.params.id);
  if(result) {res.json(result); }
  else { res.status(404).json({error: `${req.params.id} not found.`})}
});

module.exports = router;
