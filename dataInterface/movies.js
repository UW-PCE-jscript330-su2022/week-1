//add data interface methods 

module.exports = {};


const req = require("express/lib/request");
const {MongoClient} = require("mongodb");
const ObjectId = require('mongodb').ObjectId;

const uri = 'mongodb+srv://mig1035:T6hLiJHR2FBNbGPX@cluster0.ickzz.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri);

const databaseName = 'sample_mflix';
const colName = 'movies'

module.exports.getAll = async () => {

    const database = client.db(databaseName);
    const movies = database.collection(colName);
     
    const query = {};
    let movieCursor = await movies.find(query).limit(10).project({title: 1}).sort({title: 1});
    return movieCursor.toArray();
  }
  
  module.exports.getById = async (movieId) => {

    const database = client.db(databaseName);
    const movies = database.collection(colName);

    const query = {_id: ObjectId(movieId)};
    let movie = await movies.findOne(query)
    if(movieId.length === 24){
      return movie
    }else{
      return {message: "Error!"}
    }
  }


  module.exports.getByTitle = async (title) => {


    const database = client.db(databaseName);
    const movies = database.collection(colName);

    const toTitleCase = (title) => { // this function takes the title ipnut and returns the title with the first letter of every word capitalized, as the title format in the collection is all in Title Case

      const words = title.split(" ");
      
      for (let i = 0; i < words.length; i++) {
          words[i] = words[i][0].toUpperCase() + words[i].substr(1);
      }
      
      return words.join(" ");
    }

    const titleQuery = { title: `${toTitleCase(title)}` };
    let movieResults = await movies.find(titleQuery); 
    let resultsArray = movieResults.toArray();
    
    return resultsArray
  }


  module.exports.getByTitleAndYear = async (title, year) => { //Attempted find by title and year but couldn't get it to work


    const database = client.db(databaseName);
    const movies = database.collection(colName);

    const toTitleCase = (title) => { // this function takes the title ipnut and returns the title with the first letter of every word capitalized, as the title format in the collection is all in Title Case

      const words = title.split(" ");
      
      for (let i = 0; i < words.length; i++) {
          words[i] = words[i][0].toUpperCase() + words[i].substr(1);
      }
      
      return words.join(" ");
    }

    const query = {title: `${toTitleCase(title)}`, year: `${year}`}
    console.log(query)
    let movieResult = await movies.find(query); 
    console.log(movieResult.toArray())
    return movieResult.toArray();
  }

  
  module.exports.deleteById = async (movieId) => {

    const database = client.db(databaseName);
    const movies = database.collection(colName);

    const query = {_id: ObjectId(movieId)};
    let deleteMovie = await movies.deleteOne(query)

    if (movieId.length ===24){
    return deleteMovie
  } else {
    return {message: "Error!"}
  }
}
  
  module.exports.updateById = async (movieId, newObj) => {

    const database = client.db(databaseName);
    const movies = database.collection(colName);

    const query = {_id: ObjectId(movieId)};
    let updateMovie = await movies.updateOne(
      {query},{$set:{TomatometerScore : newObj}}
    );


    if (movieId.length ===24){
      return updateMovie
    } else {
      return {message: "Error!"}
    }
  }

  
  module.exports.create = async (newObj) => {

    const database = client.db(databaseName);
    const movies = database.collection(colName);

    const result = await movies.insertOne(newObj);

    console.log(result)

    if(result.acknowledged){
        return {message: `Success! Item with a new ID of: ${result.insertedId} has been created`}
    } else{
        return {message: "Error!"}
    }
  }