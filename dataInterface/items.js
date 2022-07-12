const uuid = require('uuid');

module.exports = {};

module.exports.items = [{ id: '7', field: 'example' }];

module.exports.getAll = () => {
    return module.exports.items;
}

module.exports.getById = (itemId) => {
  // NOTE: Completed.
    const itemList = module.exports.items;
    const result = itemList.find(
        item => item.id == itemId);
   return result;
}

module.exports.deleteById = async (itemId) => {
    // NOTE: Completed.
    const itemList = module.exports.items;
    const result = module.exports.getById(itemId); 
    const index = itemList.indexOf(result);

    if (result) {
        itemList.splice(index, 1);
        return itemList;
    }
}

module.exports.updateById = async (itemId, newObj) => {
    // NOTE: completed.
    
    let result = module.exports.getById(itemId);

    if(result) {
        result.field = newObj.field;
        return result;
    }
}

module.exports.create = async (item) => {
  const id = uuid.v4();
  const newItem = { ...item, id };
  module.exports.items.push(newItem);
  return newItem;
}