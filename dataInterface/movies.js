const { MongoClient, ObjectId } = require('mongodb');

const uri =
  'mongodb+srv://Ryan:7Kvszal8Uz7Oqzok@cluster0.couuu.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri);

const databaseName = 'sample_mflix';
const collectionName = 'movies';

module.exports = {};

// sortType of 1 is ascending, sortType of -1 is descending
// NOTE: Unless you specify the sort() method or use the $near operator, MongoDB does not guarantee the order of query results.
module.exports.getAll = async (sortKey, sortDirection) => {
  const database = client.db(databaseName);
  const movies = database.collection(collectionName);

  const query = {};

  if (sortKey && sortDirection) {
    const movieCursor = await movies
      .find(query)
      .limit(50)
      .project({ [sortKey]: 1 })
      .sort({ [sortKey]: sortDirection });
    return movieCursor.toArray();
  } else {
    const movieCursor = await movies.find(query).limit(50);
    return movieCursor.toArray();
  }
};

module.exports.getByTitle = async (title) => {
  const database = client.db(databaseName);
  const movies = database.collection(collectionName);

  const query = { title: title };
  let movieDoc = await movies.findOne(query);
  return movieDoc;
};

module.exports.getById = async (movieId) => {
  const database = client.db(databaseName);
  const movies = database.collection(collectionName);

  const query = { _id: ObjectId(movieId) };
  let movieDoc = await movies.findOne(query);
  return movieDoc;
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

  const result = await movies.insertOne(movie);

  if (result.acknowledged) {
    return {
      newObjectId: result.insertedId,
      message: `Item created! ID ${result.insertedId}`,
    };
  } else {
    return { message: 'ERROR' };
  }
};
