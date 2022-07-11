const { Router } = require("express");
const router = Router();

const itemData = require('../dataInterface/items');

router.get("/", (req, res, next) => {
  res.status(200).send(itemData.getAll())
});

router.get("/:id", (req, res, next) => {
  // TODO: complete writing this route handler  
  let item = itemData.getById('test2');
  if(item){
    res.status(200).send(item);
  } else {
    res.status(404).send({ error: 'item does not exist' });
  }
});

router.post("/", (req, res, next) => {
  itemData.create(req.body);
  res.sendStatus(200);
});

router.put("/:id", (req, res, next) => {
  let item =  itemData.updateById('test1', 'this is an updated thingy');
  if(item){
    res.status(200).send(item);
  } else {
  res.status(501).send({ error: 'route not yet implemented' });
  }
});


router.delete("/:id", (req, res, next) => {
  // TODO: complete writing this route handler
  let item = itemData.deleteById('test1');
  if(item){
    res.status(200).send(item);
  } else {
    res.status(501).send({ error: 'route not yet implemented' });
  }
});

module.exports = router;
