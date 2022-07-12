const uuid = require('uuid');

module.exports = {};

module.exports.items = [{ id: '7', field: 'example' }];

module.exports.getAll = () => {
  return module.exports.items;
}

module.exports.getById = (itemId) => {
  // TODO: complete writing this function
  const selectedItem = module.exports.items.find(item => item.id == itemId)
  return selectedItem;
}

module.exports.deleteById = async (itemId) => {
  // TODO: complete writing this function
  const index = module.exports.items.findIndex(item=> item.id === itemId);
  if (index >= 0) {
     const deletedItem = module.exports.items.splice(index,1);
     return deletedItem[0]
  }
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