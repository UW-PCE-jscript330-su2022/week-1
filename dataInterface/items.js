const uuid = require('uuid');
module.exports = {};
module.exports.items = [{ id: '7', field: 'example' }];
module.exports.getAll = () => {
  return module.exports.items;
}

module.exports.getById = (itemId) => {
  return module.exports.items.find(item => item.id === itemId)
}

module.exports.deleteById =  (itemId) => {
  const myIndex = module.exports.items.findIndex(item => item.id === itemId)
  if (myIndex!==-1){
    return module.exports.items.splice(myIndex,1)
  }
}

module.exports.updateById = async (itemId, newObj) => {
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
