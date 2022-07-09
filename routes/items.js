const { Router } = require("express");
const router = Router();

const itemData = require('../dataInterface/items');



router.get("/", (req, res, next) => {
  res.status(200).send(itemData.getAll())
});

router.get("/:id", (req, res, next) => {
  const theItem = itemData.getById(req.params.id)
  if (!theItem){
    res.status(404).send({ error: 'does not exist' });
  }
  res.json(theItem)
});

router.post("/", (req, res, next) => {
  itemData.create(req.body);
  res.sendStatus(200);
});

router.put("/:id", (req, res, next) => {
  const newItem = itemData.updateById(req.params.id, req.body.field)
   if (newItem) {
    res.sendStatus(200)
   }
   res.status(404).send({ error: 'does not exist' });
});


router.delete("/:id", (req, res, next) => {
  const theItem = itemData.getById(req.params.id);
  if(theItem){
  const newItemsArray = itemData.deleteById(req.params.id);
  res.json(newItemsArray)
  }
  res.status(404).send({ error: 'does not exist' });
});

module.exports = router;

// router.delete("/:id", (req, res, next) => {
//   const newItemsArray = itemData.deleteById(req.params.id)
//   res.json(newItemsArray)
// });
