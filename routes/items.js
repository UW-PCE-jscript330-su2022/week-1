const { Router } = require("express");
const router = Router();

const itemData = require('../dataInterface/items');

router.get("/", (req, res, next) => {
  res.status(200).send(itemData.getAll())
});

router.get("/:id", (req, res, next) => {
  let item = itemData.getById(req.params.id);
  console.log(`${item}`);
  if (item) {
    res.status(200).json(item);
  }
  else {
    res.status(404).send({error: 'item not found'});
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
