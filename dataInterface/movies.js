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
    let movieCursor = await movies.find(query).limit(10).project({title: 1})
    //console.log(movieCursor.toArray())
    return movieCursor.toArray()
}

module.exports.getById = async (movieId) => {
    const database = client.db(databaseName)
    const movies = database.collection(collName)
    //const query = {title: "Titanic"}
    const query = {_id: ObjectId(movieId)}

    const result = await movies.findOne(query)

    return result
}

module.exports.deleteById =  (movieId) => {
    const database = client.db(databaseName)
    const movies = database.collection(collName)

    return []
}

module.exports.updateById = (movieId, newObj) => {
    const database = client.db(databaseName)
    const movies = database.collection(collName)

    return []
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
