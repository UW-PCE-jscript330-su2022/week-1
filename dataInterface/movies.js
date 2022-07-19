const { MongoClient } = require("mongodb");
const ObjectId = require('mongodb').ObjectId;

const uri =
  "mongodb+srv://jnaden:Or05Kila@cluster0.gyrolbu.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

const databaseName = 'sample_mflix';
const collName = 'movies'

module.exports.getByTitle = async (movieTitle) => {
  const database = client.db(databaseName);
  const movies = database.collection(collName); 

  const query = {title: movieTitle};
  let movie = await movies.findOne(query);

  return movie
}

// https://www.mongodb.com/docs/drivers/node/current/usage-examples/find/
module.exports.getAll = async () => {
  const database = client.db(databaseName);
  const movies = database.collection(collName);

  const query = {};
  let movieCursor = await movies.find(query).limit(10).sort({year: -1}).project({title: 1, year: 1});

  return movieCursor.toArray();
}

// https://www.mongodb.com/docs/drivers/node/current/usage-examples/findOne/
module.exports.getById = async (movieId) => {
  const database = client.db(databaseName);
  const movies = database.collection(collName);

  const query = {_id: ObjectId(movieId)};
  let movie = await movies.findOne(query);

  return movie
}

// https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/write-operations/delete/
module.exports.deleteById = async (movieId) => {
  const database = client.db(databaseName);
  const movies = database.collection(collName);

  const deletionDoc = {_id:ObjectId(movieId)}
  const deleteResult = await movies.deleteOne(deletionDoc);
  if (deleteResult.deletedCount > 0){
  return {message: `DELETED ${deleteResult.deletedCount} movies`}
  } else {
    return null
  }
}

// https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/write-operations/change-a-document/
module.exports.updateById = async (movieId, newObj) => {
  const database = client.db(databaseName);
  const movies = database.collection(collName);

  const updateDoc = { $set: {field : newObj.field} }
  const filter = { _id: ObjectId(movieId) };
  const result = await movies.updateOne(filter, updateDoc);
  if (result.modifiedCount > 0) {
  return {message: `UPDATED ${result.modifiedCount} movies`}
} else {
  return null
}}

// https://www.mongodb.com/docs/v4.4/tutorial/insert-documents/
module.exports.create = async (newObj) => {
  const database = client.db(databaseName);
  const movies = database.collection(collName);

  const result = await movies.insertOne(newObj);

  if(result.acknowledged){
    return { newObjectId: result.insertedId, message: `Item created! ID: ${result.insertedId}` }
  } else {
    return null
  
}
}