const uuid = require('uuid');

module.exports = {};

module.exports.items = [{ id: '7', field: 'example' }];

module.exports.getAll = () => {
  return module.exports.items;
}

module.exports.getById = (itemId) => {
  // TODO: complete writing this function
  // Get an item by its id
  return module.exports.items.find(item => item.id == itemId);
}

module.exports.deleteById = async (itemId) => {
  // TODO: complete writing this function
  // Get the item's index
  const theItemIndex = module.exports.items.findIndex(item => item.id === itemId);
  if (theItemIndex >= 0) {
    // Remove this item from items array
    return module.exports.items.splice(theItemIndex, 1)
  } else {
    return null
  }
}

module.exports.updateById = async (itemId, newObj) => {
  // TODO: complete writing this function
  const field = newObj.field;
  // Check if the field is empty or not
  if (field.trim().length === 0) {
    return undefined
  }
  const id = itemId;
  const newUpdate = { field, id };
  // Get the item's index
  const theItemIndex = module.exports.items.findIndex(item => item.id === itemId);
  if (theItemIndex >= 0) {
    // Replace this item by newObj
    return module.exports.items.splice(theItemIndex, 1, newUpdate)
  } else {
    return null
  }
}

module.exports.create = async (item) => {
  // Check if the field is empty or not
  const itemLength = item.field.trim().length;

  if (itemLength > 0) {
    const id = uuid.v4();
    const newItem = { ...item, id };
    module.exports.items.push(newItem);
    return newItem;
  } else {
    return null
  }
}