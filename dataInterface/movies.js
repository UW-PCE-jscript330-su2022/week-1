// In-class & homework exercises.

const { MongoClient } = require("mongodb");
// To allow us to handle returned object ID's:
//(allows us to use the ObjectId's special data type in express (line 28))
const ObjectId = require('mongodb').ObjectId;

const uri = "mongodb+srv://user1:user1@cluster0.qshjt0w.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

module.exports = {}

module.exports.getAll = async () => {
  // MongoDB connection guide provides following two lines:
  const database = client.db('sample_mflix');
  const movies = database.collection('movies');

  const query = {};
  let movieCursor = await movies.find(query).sort({ "released": -1 }).limit(10).project({ "title": 1, "year": 1 });
  return movieCursor.toArray();
}

module.exports.getById = async (movieId) => {
  const database = client.db('sample_mflix');
  const movies = database.collection('movies');
  
  // _id is from the returned object's information:
  const query = {_id: ObjectId(movieId) };
  let movie = await movies.findOne(query);
  return movie;
}

module.exports.getByTitle = async (title) => {
  // TO DO: Add this
  const database = client.db('sample_mflix');
  const movies = database.collection('movies');

  const query = { title: title };
  const movieCursor = await movies.find(query);
  return movieCursor.toArray();
}

module.exports.deleteById = (movieId) => {
  const database = client.db('sample_mflix');
  const movies = database.collection('movies');

  return []
}

module.exports.updateById = (movieId, newObj) => {
  const database = client.db('sample_mflix');
  const movies = database.collection('movies');

  return []
}

module.exports.create = async (newObj) => {
  const database = client.db('sample_mflix');
  const movies = database.collection('movies');

  const result = await movies.insertOne(newObj);
  // console.log(result);
  // "acknowledged: true" & "insertedId: new ObjectId("##...##")" are part of console.log return, so if we want user-friendly return:
  if (result.acknowledged) {
    return { newObjectId: result.insertedId, message: `Item created! ID: ${result.insertedId}` };
  } else {
    return {message: "ERROR"};
  }
}