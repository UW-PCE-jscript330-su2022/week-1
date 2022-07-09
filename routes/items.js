const { Router } = require("express");
const router = Router();

const itemData = require('../dataInterface/items');

router.get("/", (req, res, next) => {
  res.status(200).send(itemData.getAll())
});

router.get("/:id", (req, res, next) => {
  if(itemData.getById(req.params.id)) {
    res.status(200).send(itemData.getById(req.params.id));
  }
  else {
    res.status(404).json({error: "item does not exist"});
  } 
});

router.post("/", (req, res, next) => {
  itemData.create(req.body);
  res.sendStatus(200);
});

router.put("/:id", (req, res, next) => {
  res.status(200).send(itemData.updateById(req.params.id, req.body));
  
});

router.delete("/:id", (req, res, next) => {
 if(itemData.getById(req.params.id)){
  res.status(200).send(itemData.deleteById(req.params.id));
 }
  else {
    res.status(404).json({error: "item does not exist"})
  }
});

module.exports = router;
