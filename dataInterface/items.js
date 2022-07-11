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
    let itemArr = module.exports.items;
    const theIndex = itemArr.findIndex(element => element.id === itemId)
    const theItem = itemArr[theIndex]
    itemArr.splice(theIndex, 1)
    return theItem
}

module.exports.updateById = async (itemId, newObj) => {
 // TODO: complete writing this function
  let itemArr = module.exports.items;

  const newArr = itemArr.map(element => {
    if (element.id) {
      return {...element, field: ''};
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