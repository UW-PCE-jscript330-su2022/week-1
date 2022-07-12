const { Router } = require("express");
const router = Router();

const itemData = require('../dataInterface/items');

router.get("/", (req, res, next) => {
  res.status(200).send(itemData.getAll())
});

router.get("/:id", (req, res, next) => {
  // TODO: complete writing this route handler
  // Get the item by Id
  const theItem = itemData.getById(req.params.id);
  if (theItem) {
    res.status(200).send(theItem)
  } else {
    res.status(404).send({ error: 'No item found with that id' })
  }
});

router.post("/", (req, res, next) => {
  itemData.create(req.body).then(result => {
    if (result) {
      res.sendStatus(200);
    } else {
      res.sendStatus(204);
    }
  });

});

router.put("/:id", (req, res, next) => {
  // TODO: complete writing this route handler
  const theItem = itemData.updateById(req.params.id, req.body);
  theItem.then(result => {
    if (result) {
      res.status(200).send(theItem)
    } else if (result===null) {
      res.status(404).send({ error: 'No item found with that id' })
    } else {
      res.status(204).send(theItem)
    }
  })
});

router.delete("/:id", (req, res, next) => {
  // TODO: complete writing this route handler
  // res.status(501).send({ error: 'route not yet implemented' });
  const theItems = itemData.deleteById(req.params.id);
  theItems.then(result => {
    if (!result) {
      res.status(404).send({ error: 'No item found with that id' })
    } else {
      res.status(200).send(theItems)
    }
  })
});

module.exports = router;
