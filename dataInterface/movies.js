//add data interface methods 

module.exports = {};


const {MongoClient} = require("mongodb");

const uri = 'mongodb+srv://mig1035:<password>@cluster0.ickzz.mongodb.net/?retryWrites=true&w=majority'; //MONGODB works, password hidden for commits

const client = new MongoClient(uri);

const databaseName = 'sample_mflix';
const colName = 'movies'

module.exports.getAll = async () => {

    const database = client.db(databaseName);
    const movies = database.collection(colName);
     
    const query = {};
    let movieCursor = await movies.find(query).limit(10).project({title: 1})
    return movieCursor.toArray();
  }
  
  module.exports.getById = (movieId) => {

    const database = client.db(databaseName);
    const movies = database.collection(colName);
      return {}
  }
  
  module.exports.deleteById = async (movieId) => {

    const database = client.db(databaseName);
    const movies = database.collection(colName);


    return[]
  }
  
  module.exports.updateById = async (movieId, newObj) => {

    const database = client.db(databaseName);
    const movies = database.collection(colName);


      return[]
  }
  
  module.exports.create = async (item) => {

    const database = client.db(databaseName);
    const movies = database.collection(colName);

    return {}
  }