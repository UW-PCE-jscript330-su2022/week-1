const uuid = require('uuid');

module.exports = {};

module.exports.items = [{ id: '7', field: 'example' }];

module.exports.getAll = () => {
  return module.exports.items;
}

module.exports.getById = (itemId) => {
  // TODO: complete writing this function
  const found = module.exports.items.find(item => item.id == itemId);
  return found;
}

module.exports.deleteById = async (itemId) => {
    // TODO: complete writing this function
    const index = moduel.exports.item.findIndex(item => item.id == itemId);
     found = module.exports.items.splice(index, 1);
}

module.exports.updateById = async (itemId, newObj) => {
    // TODO: complete writing this function
    const index = moduel.exports.item.findIndex(item => item.id == itemId);
    found = module.exports.items.splice(index, 1, newObj);
}

module.exports.create = async (item) => {
  const newid = uuid.v4();
  const newItem = { ...item, {id: newid, field: 'field ' + newid }};
  module.exports.items.push(newItem);
  return newItem;
}