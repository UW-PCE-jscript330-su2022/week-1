const { Router } = require("express");
const router = Router();

const itemData = require('../dataInterface/items');

router.get("/", (req, res, next) => {
  res.status(200).send(itemData.getAll())
});

router.get("/:id", (req, res, next) => {
  console.log('looking for id: ', req.params.id)
  const theItem = itemData.getById(req.params.id)
  if (theItem) {
      res.status(200).json(theItem)
  } else {
      res.status(404).json({error: 'No item found with that id'})
  }
});

router.post("/", (req, res, next) => {
  itemData.create(req.body);
  res.sendStatus(200);
});

router.put("/:id", (req, res, next) => {
  console.log('looking for id: ', req.params.id)
  const theItem = itemData.updateById( req.params.id, req.body )
  if (theItem) {
      res.status(200).json(theItem)
  } else {
      res.status(404).json({error: 'No item found with that id'})
  }
});

router.delete("/:id", (req, res, next) => {
  console.log('looking for id: ', req.params.id)
  const theItem = itemData.deleteById(req.params.id)
  if (theItem) {
      res.status(200).json(theItem)
  } else {
      res.status(404).json({error: 'No item found with that id'})
  }
});

module.exports = router;
