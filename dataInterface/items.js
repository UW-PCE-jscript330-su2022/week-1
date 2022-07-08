const uuid = require('uuid');

module.exports = {};

module.exports.items = [
  { id: '7', field: 'example' }, 
  { id: '9', field: 'example two' }];

module.exports.getAll = () => {
  return module.exports.items;
}

module.exports.getById = (itemId) => {
  // const item = items.find(element => element[itemId] == req.params.id);
  return module.exports.item[id];
}

module.exports.deleteById = async (itemId) => {
    // TODO: complete writing this function
}

module.exports.updateById = (itemId, newObj) => {
    // TODO: complete writing this function
    let indexInItems = module.exports.items.findIndex((item) => item.id == itemId);
    console.log(indexInItems);
    if (indexInItems >= 0) {
      module.exports.items[indexInItems].field = newObj;
      console.log(module.exports.items[indexInItems])
    } 
    return module.exports.items[indexInItems];
    // console.log(indexInItems);
}
exampleexample
module.exports.create = async (item) => {
  const id = uuid.v4();
  const newItem = { ...item, id };
  module.exports.items.push(newItem);
  return newItem;
}