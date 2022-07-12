const uuid = require('uuid');

module.exports = {};

module.exports.items = [
  { id: '7', field: 'Mariners' },
  { id: '8', field: 'Yankees' },
];

module.exports.getAll = () => {
  return module.exports.items;
};

module.exports.getById = (itemId) => {
  return module.exports.items.find((item) => item.id === itemId);
};

module.exports.deleteById = async (itemId) => {
  let item = module.exports.items.indexOf(module.exports.getById(itemId));
  module.exports.items.splice(item, 1);
};

module.exports.updateById = async (itemId, newObj) => {
  let item = module.exports.items.find((item) => item.id === itemId);
  item.field = newObj;
};

module.exports.create = async (item) => {
  const id = uuid.v4();
  const newItem = { id, ...item };
  module.exports.items.push(newItem);
  return newItem;
};
