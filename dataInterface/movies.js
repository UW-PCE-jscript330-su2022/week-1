const {
    MongoClient
} = require("mongodb");
const ObjectId = require('mongodb').ObjectId;


const uri =
    "mongodb+srv://cahilljm53:Mevin*80@cluster0.qlff5yn.mongodb.net/?retryWrites=true&w=majority"

const client = new MongoClient(uri);

const databaseName = 'sample_mflix';

const collName = 'movies'

module.exports = {}

// find all movies and sort by lastupdated
module.exports.getAll = async () => {
    const database = client.db(databaseName);
    const movies = database.collection(collName);

    const query = {};
    let movieCursor = await movies.find(query).limit(10).sort({
        lastupdated:1
    }).project({title:1,lastupdated:1 });
    if (movieCursor) {
        return movieCursor.toArray();
    } else {
        return {
            message: `no movie data found`
        };
    }
}

// find movies with the title Titanic
module.exports.getByTitle = async () => {
    const database = client.db(databaseName);
    const movies = database.collection(collName);

    const query = {
        "title": "Titanic"
    };

    let movieTitle = await movies.find(query);
    if (movieTitle) {
        console.log("MOVIE: ", movieTitle);
        return movieTitle.toArray();
    } else {
        return {
            message: `no movie found with that title`
        };
    }
}


// find one movie record with a specified id
module.exports.getById = async () => {
    const database = client.db(databaseName);
    const movies = database.collection(collName);

    const query = {title: "Titanic"};
    let movie = await movies.findOne(query);
    console.log("MOVIE: ", movie);
    return movie;
}


module.exports.deleteById = (movieId) => {
    const database = client.db(databaseName);
    const movies = database.collection(collName);
    return []
}

module.exports.updateById = (movieId, newObj) => {
    const database = client.db(databaseName);
    const movies = database.collection(collName);
    return []
}

module.exports.create = async (newObj) => {
    const database = client.db(databaseName);
    const movies = database.collection(collName);
    const result = await movies.insertOne(newObj);

    console.log(result)


    if (result.acknowledged) {
        return {
            newObjectId: result.insertedId,
            message: `Item created! ID: ${result.insertedId}`
        }
    } else {
        return {
            message: "ERROR"
        }
    }
}