const uuid = require('uuid');

module.exports = {};

module.exports.items = [
  { id: '7', field: 'example' }, 
  { id: '9', field: 'example two' }];

module.exports.getAll = () => {
  return module.exports.items;
}

module.exports.getById = (itemId) => {
  let indexInItemsgetById = module.exports.items.find((item) => item.id == itemId);
  return indexInItemsgetById;
}

module.exports.deleteById = async (itemId) => {
    // TODO: complete writing this function
}

module.exports.updateById = (itemId, newObj) => {
  // TODO: complete writing this function

  let indexInItemsUpdateByID = module.exports.items.findIndex((item) => item.id == itemId);
  // console.log(indexInItemsUpdateByID);
  if (indexInItemsUpdateByID >= 0) {
    module.exports.items[indexInItemsUpdateByID].field = newObj;
    // console.log(module.exports.items[indexInItemsUpdateByID])
  } 
  return module.exports.items[indexInItemsUpdateByID];
  // console.log(indexInItemsUpdateByID);
}

module.exports.create = async (item) => {
  const id = uuid.v4();
  const newItem = { ...item, id };
  module.exports.items.push(newItem);
  return newItem;
}