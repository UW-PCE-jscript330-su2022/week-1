const { Router } = require("express");
const router = Router();

const itemData = require('../dataInterface/items');

router.get("/", (req, res, next) => {
  res.status(200).send(itemData.getAll())
});

router.get("/:id", (req, res, next) => {
  // TODO: complete writing this route handler
  const theItem = itemData.items.find(item => item.id === req.params.id)
  if (theItem){
    res.json(theItem)
  } else{
    res.status(501).send({ error: 'route not yet implemented' });
  }
});

router.post("/", (req, res, next) => {
  itemData.create(req.body);
  res.sendStatus(200);
});

router.put("/:id", (req, res, next) => {
  // TODO: complete writing this route handler

  const { field } = req.body
  const theItem = itemData.items.find(item => item.id === req.params.id)
  console.log(theItem)
  if (!theItem){
    res.status(501).send({ error: 'route not yet implemented' });
  } else{
    theItem.field=field
    res.status(200).json(theItem)
  }

});


router.delete("/:id", (req, res, next) => {
  // TODO: complete writing this route handler

  const theItemIndex = itemData.items.findIndex(item => item.id === req.params.id)
  console.log(theItemIndex)

  //res.status(501).send({ error: 'route not yet implemented' });

  if (typeof itemData.items[theItemIndex]==='undefined'){
    res.status(501).send({ error: 'route not yet implemented' });
  } else{
    itemData.items.splice(theItemIndex,1)
    console.log(itemData.items)
    res.sendStatus(200)
  }

});

module.exports = router;
