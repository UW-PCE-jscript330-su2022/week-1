const { Router } = require("express");
const router = Router();

const itemData = require('../dataInterface/items');

router.get("/", (req, res, next) => {
  res.status(200).send(itemData.getAll())
});

router.get("/:id", (req, res, next) => {
  // TODO: complete writing this route handler
  // res.status(501).send({ error: 'route not yet implemented' });
  res.status(200).send(itemData.getById(req.params.id));
});

router.post("/", (req, res, next) => {
  itemData.create(req.body);
  res.sendStatus(200);
});

router.put("/:id", (req, res, next) => {
  // TODO: complete writing this route handler
  // res.status(501).send({ error: 'route not yet implemented' });
  res.status(200).send(itemData.updateById(req.params.id))
});


router.delete("/:id", (req, res, next) => {
  // TODO: complete writing this route handler
  // res.status(501).send({ error: 'route not yet implemented' });
  res.status(200).send(itemData.deleteById(req.params.id));
});

module.exports = router;
