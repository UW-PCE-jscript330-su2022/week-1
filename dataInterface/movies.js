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
  let movieCursor = await movies.find(query).limit(10).project({title: 1});
  // Converts `movieCursor` response `toArray()`.
  return movieCursor.toArray();
}

module.exports.getById = async (movieId) => {
  const database = client.db(databaseName);
  const movies = database.collection(colName);
  const query = {_id: ObjectId(movieId)};
  // `findOne(query)` returns single entry given `query`.
  let movie = await movies.findOne(query);
  console.log("MOVIE: " + movie);
  return movie;
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
  return result = await movies.insertOne(newObj);
  if (result.acknowledged) {
    return { newObjectId: result.insertId, message: `Item created! ID: ${result.insertedId}` };
  } else {
    return { message: "🛆 Error: Item not created." };
  }
}