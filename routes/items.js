////////////////////////////////////////////////////////////////////////////////
// routes/items.js /////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

const { Router } = require("express");
const router = Router();

const itemData = require('../dataInterface/items');

const msg404 = "🛆 404: Item not found.";

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
  itemData.updateById(req.params.id, req.body);
  res.status(200).send();
});

router.delete("/:id", (req, res, next) => {
  itemData.deleteById(req.params.id);
  res.status(200).send();
});

module.exports = router;
