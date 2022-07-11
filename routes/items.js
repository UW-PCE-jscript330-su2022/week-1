const { Router } = require("express");
const router = Router();

const itemData = require('../dataInterface/items');

router.get("/", (req, res, next) => {
  res.status(200).send(itemData.getAll())
});

router.get("/:id", (req, res, next) => {
  // TODO: complete writing this route handler
  // res.status(501).send({ error: 'route not yet implemented' });
  const found = itemData.getById(req.params.id);
  if (found) {
    res.status(200).send(found);
  } else {
    res.sendStatus(404);
  }
});

router.post("/", (req, res, next) => {
  itemData.create(req.body);
  res.sendStatus(200);
});

router.put("/:id", (req, res, next) => {
  // TODO: complete writing this route handler
  // res.status(501).send({ error: 'route not yet implemented' });
  const found = itemData.getById(req.params.id);
  if (found) {
    itemData.updateById(req.params.id, req.body);
  };
  res.sendStatus(200);
});


router.delete("/:id", (req, res, next) => {
  // TODO: complete writing this route handler
  // res.status(501).send({ error: 'route not yet implemented' });
  const found = itemData.getById(req.params.id);
  if (found) {
    itemData.deleteById(req.params.id);
    res.sendStatus(200);
  } else {
    res.status(200).send({error: 'id is not a valid id'});
  }
});

module.exports = router;
