const { Router } = require("express");
const router = Router();

const itemData = require('../dataInterface/items');

router.get("/", (req, res, next) => {
  res.status(200).send(itemData.getAll())
});

router.get("/:id", (req, res, next) => {
  // complete writing this route handler
  const itemFound = itemData.getById(req.params.id)
  if (itemFound) {
    res.status(200).send(itemFound)

  } else {
    res.status(404).send({ error: "No item found with that id" })
  }
  next();
});

router.post("/", (req, res, next) => {
  itemData.create(req.body);
  res.sendStatus(200);
});

router.put("/:id", (req, res, next) => {
  // complete writing this route handler
  // res.status(501).send({ error: 'route not yet implemented' });
  const itemUpdated = itemData.getById(req.params.id);
  if (itemUpdated) {
    itemData.updateById(req.params.id, req.body);
  }
  res.status(200).send(itemUpdated)
  next();
});


router.delete("/:id", (req, res, next) => {
  // complete writing this route handler
  const itemDeleted = itemData.getById(req.params.id)
  if (itemDeleted) {
    itemData.deleteById(req.params.id);
    res.status(200).send({ success: "Your item was found." })

  } else {
    res.status(404).send({ error: "No item found with that id" })
  }
  next()
});


module.exports = router;
