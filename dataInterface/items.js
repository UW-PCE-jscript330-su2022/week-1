const uuid = require('uuid');

module.exports = {};

module.exports.items = [{ id: '7', field: 'example' }];

module.exports.getAll = () => {
  return module.exports.items;
}

module.exports.getById = (itemId) => {
  return module.exports.items.find(item => item.id === itemId);
}

module.exports.deleteById = async (itemId) => {
    let index = module.exports.items.findIndex(item => item.id === itemId);
    if (index >= 0)
    {
       module.exports.items.splice(index, 1);
    }
    return index;
}

module.exports.updateById = async (itemId, newObj) => {
    let index = module.exports.items.findIndex(item => item.id === itemId);
    if (index >= 0)
    {
        newObj.id = itemId;
        module.exports.items[index] = newObj;
    }
}

module.exports.create = async (item) => {
  const id = uuid.v4();
  const newItem = { ...item, id };
  module.exports.items.push(newItem);
  return newItem;
}
