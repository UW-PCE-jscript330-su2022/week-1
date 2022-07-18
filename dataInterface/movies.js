const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://sonalaggarwal555:kTxjBQ4OUATJlkZL@cluster0.0zk7c.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

const databaseName = 'sample_mflix';
const collName = 'movies';
const database = client.db(databaseName);
const movies = database.collection(collName);

module.exports = {}

module.exports.getAll = async () => {

  const query = {};
  let movieCursor = await movies.find(query).sort({ year: -1 }).limit(10);
  return movieCursor.toArray();
}

module.exports.getByTitle = async (title) => {
  const query = { "title": title };
  let movieCursor = await movies.find(query).limit(10);
  return movieCursor.toArray();
}

module.exports.createMovie = async (movie) => {
  const result = await movies.insertOne(movie);
  return result;
}

module.exports.updateMovie = async (movieId, movieBody) => {
  const filter = { _id: movieId };
  const options = { upsert: true };
  const updateDoc = {
    $set: movieBody
  };
  const result = await movies.updateOne(filter, updateDoc, options);
  return result;
}

module.exports.deleteMovie = async (movieId) => {
  const query = { _id: movieId };
  const result = await movies.deleteOne(query);
  return result;
}

module.exports.search = async (titleInput, yearInput) => {
  const query = { 'title': titleInput, 'year': yearInput };
  let movieCursor = await movies.find(query);
  return movieCursor.toArray();
} 
