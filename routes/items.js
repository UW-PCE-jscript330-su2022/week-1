const { Router } = require("express");
const router = Router();

const itemData = require('../dataInterface/items');

router.get("/", (req, res, next) => {
  res.status(200).send(itemData.getAll())
});

// curl http://localhost:5000/items/id#
router.get("/:id", (req, res, next) => {

  // Need to put logic in ./dataInterface/items.js getById() (similar to router.put() below)???
  
  const answer = itemData.items.find(item => item.id == req.params.id);
  if (answer) {
    res.send(answer)
  } else{
    res.status(404).send({ error: `That id doesn't exist.` });
  }
});

router.post("/", (req, res, next) => {
  itemData.create(req.body);
  res.sendStatus(200);
});

router.put("/:id", (req, res, next) => {
  // TODO: complete writing this route handler
  
  let answerTwo = itemData.updateById(req.params.id, req.body);
  console.log(answerTwo);
  res.send(answerTwo);

  // 1)
  // let id = +req.params.id;
  // let indexInItems = itemData.items.findIndex((item) => item.id === id);
  
  // 2)
  // let indexInItems = itemData.items.find((item) => item.id == req.params.id);
  
  // let body = req.body;
  // if (indexInItems >= 0) {
    // let updatedItem = { id:id, ...body };
    // itemData[indexInItems] = updatedItem;
  // } else {
  // res.status(404).send({ error: `That id doesn't exist` });
  // }
});


router.delete("/:id", (req, res, next) => {
  // TODO: complete writing this route handler
  res.status(501).send({ error: 'route not yet implemented' });
});

module.exports = router;
