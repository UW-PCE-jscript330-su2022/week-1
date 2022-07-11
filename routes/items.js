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
    res.status(501).send({ error: 'route not yet implemented' });
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
  console.log(theItem)
  if (!theItem){
    res.status(501).send({ error: 'route not yet implemented' });
  } else{
    //theItem.field=field
    res.status(200).json(theItem)
  }

});


router.delete("/:id", (req, res, next) => {
  // TODO: complete writing this route handler

  const theItemIndex = itemData.deleteById(req.params.id)
  console.log(theItemIndex)

  //res.status(501).send({ error: 'route not yet implemented' });

  if (theItemIndex === -1){
    res.status(501).send({ error: 'route not yet implemented' });
  } else{

    res.sendStatus(200)
  }

});

module.exports = router;
