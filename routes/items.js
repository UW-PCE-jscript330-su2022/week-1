const { Router } = require("express");
const router = Router();

const itemData = require('../dataInterface/items');

router.get("/", (req, res, next) => {
  res.status(200).send(itemData.getAll())
});

router.get("/:id", (req, res, next) => {
  // TODO: complete writing this route handler  
  let item = itemData.getById(req.params.id); //req.params.id is a path param needed since it is a dynmaic id in the path 
  if(item){
    res.status(200).send(item);
  } else {
    res.status(404).send({ error: 'item does not exist' });
  }
});

router.post("/", (req, res, next) => {
  itemData.create(req.body); //req.body is the argument needed here so it can update the body of the item
  res.sendStatus(200);
});

router.put("/:id", (req, res, next) => {
  let item =  itemData.updateById(req.params.id, req.body); //needs 2 args, params.id to get the id on the dynmaic path and req.body to update the bidy
  if(item){
    res.status(200).send(item);
  } else {
  res.status(501).send({ error: 'route not yet implemented' });
  }
});


router.delete("/:id", (req, res, next) => {
  // TODO: complete writing this route handler
  let itemsList = itemData.deleteById(req.params.id);
  if(itemsList){
    res.status(200).send(itemsList);
  } else {
    res.status(501).send({ error: 'route not yet implemented' });
  }
});
module.exports = router;
