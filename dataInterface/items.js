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
  let indexInItemsUpdateByID = module.exports.items.findIndex((item) => item.id == itemId);
  if (indexInItemsUpdateByID >= 0) {
    let jsonString = JSON.stringify(newObj);
    let jsonObj = JSON.parse(jsonString);
    // console.log(`jsonObj: ${jsonObj.field}`);
    // console.log(`indexInItemsUpdateById: ${indexInItemsUpdateByID}`);
    module.exports.items[indexInItemsUpdateByID].field = jsonObj.field;
    // console.log(`module.exports.items[indexInItemsUpdateByID]: ${JSON.stringify(module.exports.items[indexInItemsUpdateByID])}`)
    // console.log(`indexInItemsUpdateByID: ${indexInItemsUpdateByID}`);
    return JSON.stringify(module.exports.items[indexInItemsUpdateByID]);
  } else {

  }
}

module.exports.create = async (item) => {
  const id = uuid.v4();
  const newItem = { ...item, id };
  module.exports.items.push(newItem);
  return newItem;
}