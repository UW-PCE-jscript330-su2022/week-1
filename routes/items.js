const { Router } = require("express");
const router = Router();

const itemData = require('../dataInterface/items');

router.get("/", (req, res, next) => {
  res.status(200).send(itemData.getAll())
});

// curl http://localhost:5000/items/id#
router.get("/:id", (req, res, next) => {
  let answer = itemData.getById(req.params.id);
  if (answer) {
    res.send(answer);
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
  
  let jsonBody = req.body.json()
  let answerTwo = itemData.updateById(req.params.id, jsonBody);
  // console.log(jsonBody);

  if (answerTwo) {
    res.send(answerTwo);
  } else {
    res.status(404).send({ error: `That id doesn't exist.` })
  }
});


router.delete("/:id", (req, res, next) => {
  // TODO: complete writing this route handler
  res.status(501).send({ error: 'route not yet implemented' });
});

module.exports = router;
