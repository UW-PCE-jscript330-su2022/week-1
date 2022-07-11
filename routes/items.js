const { Router } = require("express");
const router = Router();

const itemData = require('../dataInterface/items');

router.get("/", (req, res, next) => {
  res.status(200).send(itemData.getAll())
});

router.get("/:id", (req, res, next) => {
  // TODO: complete writing this route handler
  const theItem = itemData.getById(req.params.id)
  if (theItem){
    res.json(theItem)
  } else{
    res.status(404).send({ error: 'not found' });
  }
});

router.post("/", (req, res, next) => {
  itemData.create(req.body);
  res.sendStatus(200);
});

router.put("/:id", (req, res, next) => {
  // TODO: complete writing this route handler

  const { id, field } = req.body
  const updatedItem = {
    id: id,
    field: field
  }
  const theItem = itemData.updateById(req.params.id, updatedItem)
  if (!theItem){
    res.status(200).send({ error: 'item not found but sending a 200 to indicate no action taken' });
  } else{

    res.status(200).json(theItem)
  }

});

router.delete("/:id", (req, res, next) => {

  const myData = itemData.deleteById(req.params.id)

  if (myData){
    res.sendStatus(200)
  }

});

module.exports = router;
