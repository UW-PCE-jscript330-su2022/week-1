const { MongoClient } = require("mongodb");
const ObjectId = require('mongodb').ObjectId;

const uri =
  "mongodb+srv://slartib:m0ng0rkdJScript330@cluster0.ipjwr.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

const databaseName = 'sample_mflix';
const collName = 'movies';

module.exports = {};

module.exports.getByTitle = async (titleIn) =>
{
  try
  {
    if (!titleIn)
    {
      throw 'Title is required'
    }
    const database = client.db(databaseName);
    const movies = database.collection(collName);

    const query = {title: titleIn};
    const fields = {title: 1};
    let movieCursor = movies.find(query).limit(10).project(fields);

    return movieCursor.toArray();
  }
  finally
  {
    //client.close();
  }

}

module.exports.getByPartialTitle = async (titleIn) =>
{
  try
  {
    if (!titleIn)
    {
      throw 'Partial title is required'
    }
    const database = client.db(databaseName);
    const movies = database.collection(collName);
    console.log(`titleIn: ${titleIn}`)
    const query = {title: {$regex: titleIn, $options: 'i'}};
    const fields = {title: 1};
    let movieCursor = movies.find(query).limit(10).project(fields);
    return movieCursor.toArray();
  }
  finally
  {
    //client.close();
  }
}

// https://www.mongodb.com/docs/drivers/node/current/usage-examples/find/
module.exports.getAll = async () =>
{
  try
  {
    const database = client.db(databaseName);
    const movies = database.collection(collName);

    const query = {};
    const sort = {title: 1}
    const outFields = {title: 1}
    let movieCursor = await movies.find(query).limit(10).sort(sort).project(outFields);

    return movieCursor.toArray();
  }
  finally
  {
    //await client.close();
  }
}

// https://www.mongodb.com/docs/drivers/node/current/usage-examples/findOne/
module.exports.getById = async (movieId) =>
{
  try
  {
    if (!movieId)
    {
      throw 'Movie ID is required'
    }
    const database = client.db(databaseName);
    const movies = database.collection(collName);

    const query = {_id: ObjectId(movieId)};
    let movie = await movies.findOne(query);

    return movie;
  }
  finally
  {
    //client.close();
  }
}

// https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/write-operations/delete/
module.exports.deleteById = async (movieId) =>
{
  try
  {
    const database = client.db(databaseName);
    const movies = database.collection(collName);

    const deletionDoc = {_id: ObjectId(movieId)}
    const deleteResult = await movies.deleteOne(deletionDoc);

    return {message: `DELETED ${deleteResult.deletedCount} movies`}
  }
  finally
  {
    //client.close();
  }
}

// https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/write-operations/change-a-document/
module.exports.updateById = async (movieId, newObj) =>
{
  try
  {
    const database = client.db(databaseName);
    const movies = database.collection(collName);

    const updateDoc = {$set: {"title": newObj.title}}
    const filter = {_id: ObjectId(movieId)};
    const result = await movies.updateOne(filter, updateDoc);

    return {message: `UPDATED ${result.modifiedCount} movies`}
  }
  finally
  {
    //client.close();
  }
}

// https://www.mongodb.com/docs/v4.4/tutorial/insert-documents/
module.exports.create = async (newObj) =>
{
  try {
    const database = client.db(databaseName);
    const movies = database.collection(collName);
    if(newObj.title) {
      const result = await movies.insertOne(newObj);

      if (result.acknowledged) {
        return {newObjectId: result.insertedId, message: `Item created! ID: ${result.insertedId}`}
      } else {
        return {message: "ERROR"}
      }
    }
    else
    {
      return {message: "Error: new object must contain a title"}
    }
  }
  finally
  {
    //client.close();
  }
}
