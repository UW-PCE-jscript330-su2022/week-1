const uuid = require('uuid');

module.exports = {};

module.exports.items = [{ id: '7', field: 'example' }];

module.exports.getAll = () => {
  return module.exports.items;
}

module.exports.getById = (itemId) => {
  const item = module.exports.items.find(item => item.id == itemId);
  return item;
}

module.exports.deleteById = async (itemId) => {
    const index = module.exports.items.findIndex(item => item.id == itemId);
    if(index>=0){
      const deletedId = module.exports.items.splice(index,1);
      return deletedId[0];
    }
}

module.exports.updateById = async (itemId, newObj) => {
    const index = module.exports.items.findIndex(item => item.id == itemId);
    if(index>=0){
     const updatedId = module.exports.items[index].field = newObj.field;
     return updatedId[0];
    }
}

module.exports.create = async (item) => {
  const id = uuid.v4();
  const newItem = { ...item, id };
  module.exports.items.push(newItem);
  return newItem;
}