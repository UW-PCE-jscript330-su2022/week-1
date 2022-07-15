const { MongoClient } = require("mongodb")
const ObjectId = require('mongodb').ObjectId
const uri = "mongodb+srv://candy-dev:nIcjQAp7LPdpzDhm@cluster0.xaqhzyx.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri)
const databaseName ='sample_mflix'
const collName ='movies'

module.exports = {};

module.exports.getAll = async () => {

    const database = client.db(databaseName)
    const movies = database.collection(collName)
    const query={}
    let movieCursor = await movies.find(query).limit(10).project({title:1, runtime:1}).sort({runtime:-1})
    //console.log was causing a Promise {<Pending>} error
    //console.log(movieCursor.toArray())
    return movieCursor.toArray()
}

module.exports.getById = async (movieId) => {
    const database = client.db(databaseName)
    const movies = database.collection(collName)
    //const query = {title: "Titanic"}

    if (movieId.length ===24){
        const query = {_id: ObjectId(movieId)}
        const result = await movies.findOne(query)
        return result
    } else{

        return {message: `ERROR: id ${movieId} not Found in database`}
    }

}

module.exports.getByTitle = async (movieTitle) => {
    const database = client.db(databaseName)
    const movies = database.collection(collName)
    //const query = {title: "Titanic"}
    const query = {title: movieTitle}

    const result = await movies.findOne(query)
    //console.log(result)
    if (result){
        return result
    } else{
        return {message: `ERROR: Title ${movieTitle} not Found in database`}
    }


}

module.exports.deleteById =  async (movieId) => {
    const database = client.db(databaseName)
    const movies = database.collection(collName)

    if (movieId.length ===24){
        const query = {_id: ObjectId(movieId)}
        const result = await movies.deleteOne(query)
        return result
    } else{
        return {message: `ERROR: id ${movieId} not Found in database`}
    }

}

module.exports.updateById = async (movieId, newObj) => {
    const database = client.db(databaseName)
    const movies = database.collection(collName)
    console.log(movieId.length)

    if(movieId.length===24){
        const result = await movies.updateOne({
                _id: ObjectId(movieId)
            },{
                $set:{
                    title: newObj.title
                }
            }
        )
        return result
    } else{
        return {message: `MESSAGE: id ${movieId} not Found in database`}
    }


}

module.exports.create = async (newObj) => {
    const database = client.db(databaseName)
    const movies = database.collection(collName)
    const result = await movies.insertOne(newObj)
    const id = result.insertedId

    //console.log(result)

    if(result.acknowledged){
        return {newObjectId: id, message: `Item created ID: ${id}`}
    } else {
        return {message: "ERROR"}
    }
}
