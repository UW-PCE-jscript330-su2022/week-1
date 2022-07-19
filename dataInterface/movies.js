module.exports = {}
const { MongoClient } = require("mongodb");
const ObjectId = require('mongodb').ObjectId;

const uri = "mongodb+srv://jilinda10:liaNg331*)@cluster0.f4ghe7b.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

module.exports.getAll = async () => {
    const database = client.db('sample_mflix');
    const movies = database.collection('movies');

    const query = {};
    const mysort = {title: -1};
    let movieCursor = await movies.find(query).limit(10).project({title: 1}).sort(mysort);
    return movieCursor.toArray();
}

module.exports.getById = async (movieId) => {
    const database = client.db('sample_mflix');
    const movies = database.collection('movies');

    const query = {_id: ObjectId(movieId)};

    let movie = await movies.findOne(query);

    return movie;
}

module.exports.getByTitle = async (ttl) => {
    const database = client.db('sample_mflix');
    const movies = database.collection('movies');

    const query = {title: ttl};

    let movie = await movies.findOne(query);

    return movie;
}

module.exports.deleteById = (movieId) => {
    const database = client.db('sample_mflix');
    const movies = database.collection('movies');
    return [];
}

module.exports.updateById = (movieId, newObj) => {
    const database = client.db('sample_mflix');
    const movies = database.collection('movies');
    return [];
}

module.exports.create = async (newObj) => {
    const database = client.db('sample_mflix');
    const movies = database.collection('movies');

    let result = await movies.insertOne(newObj);
    console.log(result);

    if (result.acknowledged) {
        return {newObjectId: result.insertedId, message: `Item created ID: ${result.insertedId}`};
    } else {
        return {message: "ERROR"};
    }
}