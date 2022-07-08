// routes/items.js ////////////////////////////////////////////////////////////

const { Router } = require("express");
const router = Router();

const msg404 = "404: Item not found.";

const itemData = require('../dataInterface/items');

router.get("/", (req, res, next) => {
  res.status(200).send(itemData.getAll())
});

router.get("/:id", (req, res, next) => {
  const gotItem = itemData.getById(req.params.id);
  if (!gotItem) {
    res.status(404).send(msg404);
  } else {
    res.status(200).send(gotItem);
  }
});

router.post("/", (req, res, next) => {
  itemData.create(req.body);
  res.sendStatus(200);
});

router.put("/:id", (req, res, next) => {
  // TODO: complete writing this route handler
  res.status(501).send({ error: 'route not yet implemented' });
});


router.delete("/:id", (req, res, next) => {
  // TODO: complete writing this route handler
  res.status(501).send({ error: 'route not yet implemented' });
});

module.exports = router;
