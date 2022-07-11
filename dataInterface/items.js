const uuid = require('uuid');

module.exports = {};

module.exports.items = [{ id: '7', field: 'example' }];

module.exports.getAll = () => {
  return module.exports.items;
}

module.exports.getById = (itemId) => {
  // TODO: complete writing this function

  return module.exports.items.find(item => item.id === itemId)

}

module.exports.deleteById = (itemId) => {
    // TODO: complete writing this function

  const myIndex = module.exports.items.findIndex(item => item.id === itemId)
  if (myIndex){
    const myItems = module.exports.items.splice(myIndex,1)
    console.log(myItems)
    return myIndex
  }

}

module.exports.updateById = (itemId, newObj) => {
    // TODO: complete writing this function

  //const findItem = module.exports.items.find(item => item.id === itemId)
  const updateItem = module.exports.items.find(item => item.id === itemId)
  if (updateItem){
    updateItem.field=newObj.field
    return updateItem
  }

}

module.exports.create = async (item) => {
  const id = uuid.v4();
  const newItem = { ...item, id };
  module.exports.items.push(newItem);
  return newItem;
}
