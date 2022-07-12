const uuid = require('uuid');

module.exports = {};

module.exports.items = [{ id: '7', field: 'example' }];

module.exports.getAll = () => {
  return module.exports.items;
}

module.exports.getById = (id) => {
  let itemArr = module.exports.items;
  let item = itemArr.find( element => element.id === id);
  return item;
}

module.exports.deleteById = async (itemId) => {
    // TODO: complete writing this function
    const theIndex = module.exports.items.findIndex(element => element.id === itemId)
    module.exports.items.splice(theIndex, 1)
    return module.exports.items
}

module.exports.updateById = async (itemId, newObj) => {
 // TODO: complete writing this function
  module.exports.items = module.exports.items.map(element => { //better to use the module.exports.items here vs a variable since this is updating the data directly, vs a variable will make of "copy" of the data 
    if (element.id === itemId) {
      return {...element, field: newObj.field};
    }
  
    return element;
  });
}

module.exports.create = async (item) => {
  const id = uuid.v4();
  const newItem = { ...item, id };
  module.exports.items.push(newItem);
  return newItem;
}