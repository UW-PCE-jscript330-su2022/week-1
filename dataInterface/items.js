// dataInterface/items.js ///////////////////////////////////////////////////

const uuid = require('uuid');

module.exports = {};

module.exports.items = [{ id: '7', field: 'example' }];

module.exports.getAll = () => {
  return module.exports.items;
}

// Given [itemId], returns [item] with [id] of [itemId].
module.exports.getById = (itemId) => {
  const gotById = module.exports.items.find(item => item.id === itemId);
  return gotById;
}

// potentiallyEmptyValue = null;
// fallbackValue = "swag";
// console.log(potentiallyEmptyValue {{c1::||}} fallbackValue);
// → "swag"

// Given [itemId], deletes [item] with [itemId].
module.exports.deleteById = async (itemId) => {
  const deletedIndex = module.exports.items.findIndex(itemId);
  module.exports.items.splice(deletedIndex, 1);
}

module.exports.updateById = async (itemId, newObj) => {
    // TODO: complete writing this function
}

module.exports.create = async (item) => {
  const id = uuid.v4();
  const newItem = { ...item, id };
  module.exports.items.push(newItem);
  return newItem;
}