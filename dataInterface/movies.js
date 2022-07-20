const uuid = require('uuid');
const { MongoClient } = require("mongodb");

const uri = 'ypur connection string';
const client = new MongoClient(uri);
module.exports = {};

module.exports.getAll = async() => {
    const database = client.db('sample_mflix');
    const movies = database.collection('movies');
    const query = {};
    let list = await movies.find(query).limit(5).project({title: 1}).sort({runtime: -1});
    return list.toArray();
}

module.exports.getById = async(itemId) => {
    const database = client.db('sample_mflix');
    const movies = database.collection('movies');
    const query = {_id: ObjectId(itemId)};
    let movie = await movies.findOne(query);
    return movie;
}

module.exports.deleteById = async (itemId) => {
    const database = client.db('sample_mflix');
    const movies = database.collection('movies');
    const deleteMovie = {_id:ObjectId(itemId)}
    const result = await movies.deleteOne(deleteMovie);
    if(result.deletedCount != 1){
      return {error: `Something went wrong`}
    };
  
    return {message: `Successfully deleted the movie`};
  
}

module.exports.updateById = async (itemId, newObj) => {
    const database = client.db('sample_mflix');
    const movies = database.collection('movies');
    const updatedMovie = {
      $set: {"title" : newObj.title}
    };
    const filter = { _id: ObjectId(itemId) };
    const result = await movies.updateOne(filter, updatedMovie);
  
    if(result.modifiedCount != 1){
      return {error: `please try again`};
    }
    else {
      return module.exports.getById(itemId);
    };

}

module.exports.create = async (newMovie) => {
    const database = client.db('sample_mflix');
    const movies = database.collection('movies');
  if(!newMovie.title){
    return {error: "Movies must have a title."}
  }
  const result = await movies.insertOne(newMovie);

  if(result.acknowledged){
    return { message: `New Movie created!` }
  } else {
    return {error: "Something went wrong. Please try again."}
  }
}

module.exports.getByTitle = async (title) => {
  const database = client.db('sample_mflix');
  const movies = database.collection('movies');
  const query = {title: title};
  let movieObj = await movies.findOne(query);
  return movieObj;
}
