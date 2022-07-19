// TODO: add data interface methods

const {MongoClient, ObjectId} = require("mongodb");
const uri = "mongodb+srv://artrodrig3:ad345P82Papu94PH@cluster0.schch.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const database = client.db('sample_mflix');
const movies = database.collection('movies');

module.exports = {}

module.exports.movies = {}

module.exports.getAll = async () => {
    const query = {};
    let movieCursor = await movies.find(query).limit(30).project({title: 1, plot: 1}).sort({title: 1});

    // Commenting out to avoid distractions.

    // movieCursor.forEach((movie) => {
    //     console.log(movie["_id"].toString());
    //     console.log(movie["title"]);
    //     console.log(movie["plot"]);
    //     console.log()
    // })

    return movieCursor.toArray();
}

module.exports.getById = async (movieId) => {
    const query = {_id: ObjectId(movieId) };
    const movie = await movies.findOne(query);
    
    return movie
}

module.exports.getByTitle = async (movieTitle) => {
    const query = {title: {$regex: movieTitle, $options: 'i'}};
    let movieCursor = movies.find(query);

    // for whatever reason, these console.log below, an error
    // keeps popping up if not commented out. Sometimes the
    // error shows up, sometimes not. It's really frustrating.

    // movieCursor.forEach((movie) => {
    //     console.log(movie["_id"].toString());
    //     console.log(movie["title"]);
    //     console.log(movie["plot"]);
    //     console.log()
    // });

    return movieCursor.toArray();
}

module.exports.deleteById = async (movieId) => {
    const query = {_id: ObjectId(movieId) };
    const deletionResponse = await movies.deleteOne(query); 

    if (deletionResponse.acknowledged) {
        return deletionResponse;
    }
    else { return null }
}

module.exports.updateById = async (movieId, newObj) => {
    const updatedMovie = await movies.updateOne(
        { _id: ObjectId(movieId) },
        { $set: {field: newObj.field } }
    );
    
    console.log(updatedMovie);

    if(updatedMovie.modifiedCount > 0) {
        return updatedMovie;
    }

    else { return null }
}

module.exports.create = async (newObj) => {
    const newMovie = {_id: new ObjectId(newObj._id)}        // Create new object
    const existingMovie = await movies.findOne(newMovie)    // Check for duplicates
    
    if(existingMovie.acknowledged) {
        // If movieId is found, then do not proceed.
        // A statistical impossibility has occurred. 😢
        return null
    }

    else {
        const result = await movies.insertOne(newMovie);
        return result
    }
}