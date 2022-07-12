const { Router } = require('express');
const router = Router();

const itemData = require('../dataInterface/items');

router.get('/', (req, res) => {
  itemData.getAll()
    ? res.status(200).send(itemData.getAll())
    : res.status(404).json({ error: `No data found` });
});

router.get('/:id', (req, res, next) => {
  const item = itemData.getById(req.params.id);
  item
    ? res.status(200).json(item)
    : res
        .status(404)
        .json({ error: `No item found with the id of ${req.params.id}` });
});

router.post('/', (req, res, next) => {
  itemData.create(req.body);
  res.status(200).send(`New item created`);
});

router.put('/:id', (req, res, next) => {
  if (itemData.getById(req.params.id)) {
    itemData.updateById(req.params.id, req.body.field);
    res.status(200).send(`Item with id ${req.params.id} updated`);
  } else {
    res
      .status(200)
      .send(
        `Item with id ${req.params.id} does not exist. No update made to data.`
      );
  }
});

router.delete('/:id', (req, res, next) => {
  if (itemData.getById(req.params.id)) {
    itemData.deleteById(req.params.id);
    res.status(200).send(`Record with id of ${req.params.id} has been deleted`);
  } else {
    res.status(200).send(`Record with id of ${req.params.id} not found`);
  }
});

module.exports = router;
