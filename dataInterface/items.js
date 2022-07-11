const uuid = require('uuid');

module.exports = {};

module.exports.items = [{ id: '7', field: 'example' }];

module.exports.getAll = () => {
  return module.exports.items;
}

module.exports.getById = (itemId) => {
  return module.exports.items.find(element => element.id === itemId);
}

module.exports.deleteById = async (itemId) => {

  var index = module.exports.items.findIndex(element => element.id === itemId);
  if (index >= 0) {
   module.exports.items.splice(index, 1);
  }
}

module.exports.updateById = async (itemId, newObj) => {
  var index = module.exports.items.findIndex(element => element.id === itemId);
  if (index >= 0) {
   module.exports.items[index].field = newObj.field;
  }
}

module.exports.create = async (item) => {
  const id = uuid.v4();
  const newItem = { ...item, id };
  module.exports.items.push(newItem);
  return newItem;
}