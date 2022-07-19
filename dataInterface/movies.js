const { MongoClient } = require("mongodb");
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
    let movieCursor = await movies.find(query).limit(30).sort({
        lastupdated: 1
    }).project({ title: 1, lastupdated: 1 });

    console.log("MOVIE: ", movieCursor);

    if (movieCursor) {

        return movieCursor.toArray();
    } else {
        return {
            message: `no movie data was found`
        };
    }
}

// find all movies with the title Titanic
module.exports.getByTitle = async () => {
    const database = client.db(databaseName);
    const movies = database.collection(collName);

    const query = {
        "title": "Titanic"
    };

    let movieTitle = await movies.find(query);

    console.log("MOVIE: ", movieTitle);

    if (movieTitle) {
        return movieTitle.toArray();
    }
}

// find one movie record with a specified id
module.exports.getById = async (movieId) => {
    const database = client.db(databaseName);
    const movies = database.collection(collName);

    const query = { _id: ObjectId(movieId) };
    let movie = await movies.findOne(query);
    console.log("MOVIE: ", movie);

    if (movie) {
        return movie;
    }
}

// insert a new object in the database
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
    }
}


// delete by id
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

// update an object
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