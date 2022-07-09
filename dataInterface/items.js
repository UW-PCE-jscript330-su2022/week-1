const uuid = require('uuid');

module.exports = {};

module.exports.items = [{ id: '7', field: 'example' }];

module.exports.getAll = () => {
  
  return module.exports.items;
}

module.exports.getById = (itemId) => {
  const item = module.exports.items.find(item => item.id == itemId)
  return item;
}

module.exports.deleteById = async (itemId) => {
  const itemIndex = module.exports.items.findIndex( item => item.id == itemId );
  
  const deleted = module.exports.items.splice(itemIndex, 1);
  return deleted;
}

module.exports.updateById = async (itemId, newObj) => {
  const item = module.exports.items.find(item => item.id == itemId)
    if (!item){
      return null
    }
    const updatedItem = item.field = newObj;
    return updatedItem
}

module.exports.create = async (item) => {
  const id = uuid.v4();
  const newItem = { ...item, id };
  module.exports.items.push(newItem);
  return newItem;
}