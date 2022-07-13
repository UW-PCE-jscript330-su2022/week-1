const { MongoClient, ObjectId } = require('mongodb');

const uri =
  'mongodb+srv://Ryan:7Kvszal8Uz7Oqzok@cluster0.couuu.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri);

const databaseName = 'sample_mflix';
const collectionName = 'movies';

module.exports = {};

module.exports.getAll = async () => {
  const database = client.db(databaseName);
  const movies = database.collection(collectionName);

  const query = {};
  let movieCursor = await movies.find(query).limit(10);
  return movieCursor.toArray();
};

module.exports.getById = async (movieId) => {
  const database = client.db(databaseName);
  const movies = database.collection(collectionName);

  const query = { _id: ObjectId(movieId) };
  let movie = await movies.findOne(query);
  return movie;
};

module.exports.deleteById = (movieId) => {
  const database = client.db(databaseName);
  const movies = database.collection(collectionName);
  return [];
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
