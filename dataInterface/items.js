const uuid = require('uuid');

module.exports = {};

module.exports.items = [{ id: '7', field: 'example' }, {id:'test1', field: 'example1'}, {id:'test2', field: 'example2'}];

module.exports.getAll = () => {
  return module.exports.items;
}

module.exports.getById = (itemId) => {
  return module.exports.items.find(ele => ele.id === itemId);
}

module.exports.deleteById = async (itemId) => {
    const index = module.exports.items.findIndex(ele => ele.id === itemId)
    return module.exports.items.splice(index, 1);
}

module.exports.updateById = async (itemId, newObj) => {
   const element = module.exports.items.find(ele => ele.id === itemId)
   if(element){
    element.field = newObj.field;
   }
}

module.exports.create = async (item) => {
  const id = uuid.v4();
  const newItem = { ...item, id };
  module.exports.items.push(newItem);
  return newItem;
}