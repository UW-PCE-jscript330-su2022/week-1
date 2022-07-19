const { json } = require("body-parser");
const { MongoClient } = require("mongodb")
const ObjectId = require('mongodb').ObjectId;
const uri = "mongodb+srv://carlitos:test@cluster0.o87d0no.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

const databaseName = 'sample_mflix';
const collName = 'movies'

module.exports = {}
// curl http://localhost:5000/movies/
module.exports.getAll = async () => {
  const database = client.db(databaseName);
  const movies = database.collection(collName);
  
  const query = {};
  let movieCursor = await movies.find(query).limit(10);
  
  return movieCursor.toArray();
}

// {"_id": "573a1390f29313caabcd4135"}
// curl http://localhost:5000/movies/573a1390f29313caabcd4135
module.exports.getById = async (movieId) => {
  const database = client.db(databaseName);  
  const movies = database.collection(collName);
  const query = {_id: ObjectId(movieId)};
  let movie = await movies.findOne(query);
  return movie
}

// get by title
// curl http://localhost:5000/movies/Titanic 
// curl http://localhost:5000/movies/Back%20%To%20The%20Future -> not found
// curl http://localhost:5000/movies/Back%20%to%20the%20Future -> Found

module.exports.getByTitle = async(movieTitle) => {
  const database = client.db(databaseName);  
  const movies = database.collection(collName);
  const query = {title: movieTitle}
  let movie = await movies.find(query)
  return movie.toArray()
}
// curl http://localhost:5000/movies/delete/:id
module.exports.deleteById = async (movieId) => {
  console.log(movieId)
  const database = client.db(databaseName);
  const movies = database.collection(collName);
  let movieExist = await movies.findOne(query)
  if(movieExist){
    const deletionDoc = {_id: ObjectId(movieId)}
    const deleteResult = await movies.deleteOne(deletionDoc);
    return {message: `DELETED ${deleteResult.deletedCount} movies`}
  }else{
    return {message: "Movie was not found"}
  }
}

module.exports.updateById = async (movieId, newObj) => {
  const database = client.db(databaseName);
  const movies = database.collection(collName);
  let movieExist = await movies.findOne(query)
  if(movieExist){
    const updateDoc = { $set: {"title" : newObj.title} }
    const filter = { _id: ObjectId(movieId) };
    const result = await movies.updateOne(filter, updateDoc);
    return {message: `UPDATED ${result.modifiedCount} movies`}
  }else{
    return {message: `Failed to update ID: ${movieId}`}
  }
}

module.exports.create = async (newObj) => {
  const database = client.db(databaseName);
  const movies = database.collection(collName);
  const result = await movies.insertOne(newObj);
  if(result.acknowledged){
    return { newObjectId: result.insertedId, message: `Item created! ID: ${result.insertedId}` }
  } else {
    return {message: `Failed to create ${newObj}`}
  }
}

// {title: "Blacksmith Scene"}

// Back%20%To%20The%20Future -> not found
// Back%20%to%20the%20Future  -> Found