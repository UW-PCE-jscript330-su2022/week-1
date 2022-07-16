// TODO: add data interface methods

const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://artrodrig3:ad345P82Papu94PH@cluster0.schch.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const database = client.db('sample_mflix');
const movies = database.collection('movies');

module.exports = {}

module.exports.movies = {}

module.exports.getAll = () => {
    return []
}

module.exports.getById = (movieId) => {
    let movieList = module.exports.movies;
    return {}
}

module.exports.deleteById = (movieId) => {
    return []
}

module.exports.updateById = (movieId, newObj) => {

    return []
}

module.exports.create = (newObj) => {
    return {}
}