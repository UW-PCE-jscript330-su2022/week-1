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

// getAll //////////////////////////////////////////////////////////////////////
// Returns an array of all movies (limited to 10).
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

// getById /////////////////////////////////////////////////////////////////////
// Given a valid `movieId`,
// Returns a `movie` with the same `movieId`.
module.exports.getById = async (movieId) => {
  if (!ObjectId.isValid(movieId)) {
    return { 
      status: 400
    }
  } else {
    const database = client.db(databaseName);
    const movies = database.collection(colName);
    const query = {_id: ObjectId(movieId)};
    // `findOne(query)` returns single entry given `query`.
    let movie = await movies.findOne(query);
    return movie;
  }
}

// getByTitle //////////////////////////////////////////////////////////////////
// Given a valid `movieTitle`,
// Returns an array of all movies (limited to 10) with titles matching the 
// `movieTitle`.
module.exports.getByTitle = async (movieTitle) => {
  const database = client.db(databaseName);
  const movies = database.collection(colName);
  const query = {title: movieTitle};
  let moviesCursor = await movies.find(query).limit(10);
  return moviesCursor.toArray();
}

// deleteById //////////////////////////////////////////////////////////////////
// Given a valid `movieId`,
// Deletes the movie with the same `movieId`.
module.exports.deleteById = async (movieId) => {
  if (!ObjectId.isValid(movieId)) {
    return { 
      status: 400
    }
  } else {
    const database = client.db(databaseName);
    const movies = database.collection(colName);
    const query = {_id: ObjectId(movieId)};
    const result = await movies.deleteOne(query);
    return result;
  }
}

// updateById //////////////////////////////////////////////////////////////////
// Given a valid `movieId` and a `newObj`,
// Updates the movie with the same `movieId` with the properties in `newObj`.
module.exports.updateById = async (movieId, newObj) => {
  if (!ObjectId.isValid(movieId)) {
    return {
      status: 400
    }
  } else {
    const database = client.db(databaseName);
    const movies = database.collection(colName);
    const query = {_id: ObjectId(movieId)};
    const result = await movies.updateOne(query, {$set: newObj});
    return result;
  }
}

// create //////////////////////////////////////////////////////////////////////
// Given `newObj`,
// Adds `newObj` to the movie database.
module.exports.create = async (newObj) => {
  const database = client.db(databaseName);
  const movies = database.collection(colName);
  const result = await movies.insertOne(newObj);
  return result;
}