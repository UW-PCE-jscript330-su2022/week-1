const { MongoClient } = require("mongodb");
const ObjectId = require('mongodb').ObjectId;

const uri =
"mongodb+srv://Cahillmn:Ballard*85@cluster0.i33cd.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

const databaseName = 'sample_mflix';
const collName = 'movies'

module.exports = {}

module.exports.getByTitle = async () => {
  const database = client.db(databaseName);
  const movies = database.collection(collName);

  const query = {'title': "Titanic"};
  let film = await movies.find(query)

  if(film){
    return film.toArray(); 
  } else {
    return {message: "ERROR"}
  }
}

// https://www.mongodb.com/docs/drivers/node/current/usage-examples/find/
module.exports.getAll = async () => {
  const database = client.db(databaseName);
  const movies = database.collection(collName);

  const query = {};
  let movieCursor = await movies.find(query).limit(10).project({title: 1}).sort({title: 1});

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

  const query = { _id: ObjectId(movieId) };
  const deletedMovie = await movies.deleteOne(query);

  console.log(deletedMovie)

  if (deletedMovie.acknowledged) {
      return { message: `${ObjectId(movieId)} was deleted.` }
  } else {
      return {
          message: "ERROR - the object was not deleted"
      };
  }
}

// https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/write-operations/change-a-document/
module.exports.updateById = async (movieId, newObj) => {
  const database = client.db(databaseName);
  const movies = database.collection(collName);

  const filter = { _id: ObjectId(movieId) };
  const update = { $set: { "movies.plot": newObj.plot } }
  const updatedMovie = await movies.updateOne(filter, update);

  console.log(updatedMovie)

  if (updatedMovie.acknowledged) {
      return { message: `${ObjectId(movieId)} has been updated.` }
  } else {
      return {
          message: "ERROR - the object was not updated"
      };
  }
}

// https://www.mongodb.com/docs/v4.4/tutorial/insert-documents/
module.exports.create = async (newObj) => {
  const database = client.db(databaseName);
  const movies = database.collection(collName);

  const result = await movies.insertOne(newObj);

  if(result.acknowledged){
    return { newObjectId: result.insertedId, message: `Item created! ID: ${result.insertedId}` }
  } else {
    return {message: "ERROR"}
  }
}