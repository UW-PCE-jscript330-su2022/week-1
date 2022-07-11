const { Router } = require("express");
const router = Router();

const itemData = require('../dataInterface/items');

router.get("/", (req, res, next) => {
  res.status(200).send(itemData.getAll())
});

router.get("/:id", (req, res, next) => {
  const inputId = req.params.id;
  const item = itemData.getById(inputId);
  if (item === undefined) {
    res.status(404).send(`no item with id ${inputId} found`);
  }
  else {
    res.status(200).send(item);
  }
});

router.post("/", (req, res, next) => {

  if (!validateRequestBody(req.body)) {
    res.status(400).send('invalid request body');
  }
  else {
    itemData.create(req.body);
    res.sendStatus(200);
  }
});

router.put("/:id", (req, res, next) => {
  const inputId = req.params.id;

  // Validating request body
  if (!validateRequestBody(req.body)) {
    res.status(400).send('invalid request body');
  }
  else {
    itemData.updateById(inputId, req.body);
    res.status(200).send();
  }
});


router.delete("/:id", (req, res, next) => {
  const inputId = req.params.id;
  const item = itemData.getById(inputId);
  if (item === undefined) {
    res.status(404).send(`no item with id ${inputId} found`);
  }
  else {
    itemData.deleteById(item.id);
    res.status(200).send(`item deleted ${item.id}`);
  }

});

const validateRequestBody = (reqBody) => {
  if (reqBody === null) {
    return false;
  }

  const requestBodyKeys = Object.keys(reqBody);
  const fieldIndex = requestBodyKeys.findIndex(element => element === 'field');
  if (fieldIndex === -1) {
    return false;
  }

  return true;
}

module.exports = router;
