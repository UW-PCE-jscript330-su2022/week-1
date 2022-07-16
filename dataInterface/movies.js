////////////////////////////////////////////////////////////////////////////////
// dataInterface/movies.js /////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

const { MongoClient, ObjectId } = require("mongodb");
require('dotenv').config();

const uri = 
  "mongodb+srv://jelizaga:" + encodeURIComponent(process.env.MONGODB_PSWD) + "@cluster0.xhlewuy.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri);

const databaseName = "sample_mflix";
const colName = "movies";

const msgMovie = (movie) => {
  return movie;
}

module.exports = {};

module.exports.getAll = async () => {
  const database = client.db(databaseName);
  const movies = database.collection(colName);
  // Empty obj. as a `query` asks for everything.
  const query = {};
  // Network-calls `movies` collection,
  // `find()` returns a promise, so we use await to catch it and proceed,
  // `limit(10)` reduces allowed results to `10`,
  // `project({title: 1})` reduces results to just `title`s.
  let moviesCursor = await movies.find(query).limit(10).project({ title: 1 }).sort({ title: 1 });
  // Converts `movieCursor` response `toArray()`.
  return moviesCursor.toArray();
}

module.exports.getById = async (movieId) => {
  const database = client.db(databaseName);
  const movies = database.collection(colName);
  const query = {_id: ObjectId(movieId)};
  // `findOne(query)` returns single entry given `query`.
  let movie = await movies.findOne(query);
  console.log(msgMovie(movie));
  return movie;
}

module.exports.getByTitle = async (movieTitle) => {
  const database = client.db(databaseName);
  const movies = database.collection(colName);
  const query = {title: movieTitle};
  let moviesCursor = await movies.find(query).limit(10);
  return moviesCursor.toArray();
}

module.exports.deleteById = async (movieId) => {
  const database = client.db(databaseName);
  const movies = database.collection(colName);
  return [];
}

module.exports.updateById = async (movieId, newObj) => {
  const database = client.db(databaseName);
  const movies = database.collection(colName);
  return [];
}

module.exports.create = async (newObj) => {
  const database = client.db(databaseName);
  const movies = database.collection(colName);
  const result = await movies.insertOne(newObj);
  // console.log(result);
  if (result.acknowledged) {
    return { newObjectId: result.insertedId, message: `Item created! ID: ${result.insertedId}` };
  } else {
    return { message: "🛆 Error: Item not created." };
  }
}