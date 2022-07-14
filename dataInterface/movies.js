const { MongoClient, ObjectId } = require('mongodb');

const uri =
  'mongodb+srv://Ryan:7Kvszal8Uz7Oqzok@cluster0.couuu.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri);

const databaseName = 'sample_mflix';
const collectionName = 'movies';

module.exports = {};

// sortType of 1 is ascending, sortType of 0 is descending
module.exports.getAll = async (sortKey, sortDirection) => {
  const database = client.db(databaseName);
  const movies = database.collection(collectionName);

  const query = {};

  if (sortKey && sortDirection) {
    movieCursor = await movies
      .find(query)
      .limit(50)
      .project({ [sortKey]: 1 })
      .sort({ [sortKey]: sortDirection });
    return movieCursor.toArray();
  } else {
    movieCursor = await movies.find(query).limit(50);
    return movieCursor.toArray();
  }
};

module.exports.getByTitle = async (title) => {
  const database = client.db(databaseName);
  const movies = database.collection(collectionName);

  const query = { title: title };
  let movieCursor = await movies.findOne(query);
  return movieCursor;
};

module.exports.getById = async (movieId) => {
  const database = client.db(databaseName);
  const movies = database.collection(collectionName);

  const query = { _id: ObjectId(movieId) };
  let movieCursor = await movies.findOne(query);
  return movieCursor;
};

module.exports.deleteById = (movieId) => {
  const database = client.db(databaseName);
  const movies = database.collection(collectionName);

  return movies.deleteOne({ _id: ObjectId(movieId) });
};

module.exports.updateById = (movieId, newObj) => {
  const database = client.db(databaseName);
  const movies = database.collection(collectionName);
  return [];
};

module.exports.create = async (movie) => {
  const database = client.db(databaseName);
  const movies = database.collection(collectionName);

  const result = await movies.insert(newObj);

  if (result.acknowledged) {
    return {
      newObjectId: result.insertedId,
      message: `Item created! ID ${result.insertedId}`,
    };
  } else {
    return { message: 'ERROR' };
  }
};
