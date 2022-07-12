const { Router } = require("express");
const router = Router();

const itemData = require('../dataInterface/items');

router.get("/", (req, res, next) => {
  res.status(200).send(itemData.getAll())
});

router.get("/:id", (req, res, next) => {
  const foundId = itemData.getById(req.params.id);
  if(foundId){
    res.status(200).send(foundId)
  } else {
    res.status(404).send({error: "item not found"})
  }
});

router.post("/", (req, res, next) => {
  itemData.create(req.body);
  res.sendStatus(200);
});

router.put("/:id", (req, res, next) => {
  const updatedId = itemData.getById(req.params.id);
  if(updatedId){
    itemData.updateById(req.params.id,req.body)
  } 
  res.status(200).send(updatedId)  
});


router.delete("/:id", (req, res, next) => {
  const deletedId = itemData.getById(req.params.id);
  if(deletedId){
    itemData.deleteById(req.params.id)
  }
  res.status(200).send(deletedId)
});

module.exports = router;
