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
    return movieCursor.toArray()
}

module.exports.getById = async (movieId) => {
    const database = client.db(databaseName)
    const movies = database.collection(collName)

    if (movieId.length ===24){
        const query = {_id: ObjectId(movieId)}
        const result = await movies.findOne(query)
        if(result){
            return result
        } else{
        return {message: `ERROR: Title ${movieId} not Found in database`}
    }

    } else{

        return {message: `ERROR: id ${movieId} not Found in database`}
    }

}

module.exports.getByTitle = async (movieTitle) => {
    const database = client.db(databaseName)
    const movies = database.collection(collName)
    const query = {title: movieTitle}
    const result = await movies.findOne(query)

    if (result){
        return result
    } else{
        return {message: `ERROR: Title ${movieTitle} not Found in database`}
    }

}

module.exports.deleteById =  async (movieId) => {
    const database = client.db(databaseName)
    const movies = database.collection(collName)

    const query = {_id: ObjectId(movieId)}
    const searchID = await movies.findOne(query)

    // hard to handle exceptions

    // await movies.deleteOne(query,(error, result)=>{
    //     if (error) {
    //         console.log('error')
    //         return {message: `ERROR: id ${movieId} not Found in database`}
    //     }
    //
    //     else if (result.acknowledged && result.deletedCount === 1){
    //         //console.log('item deleted')
    //         console.log(result.acknowledged)
    //         return result
    //         //return {message: `MESSAGE: id ${movieId} deleted`}
    //     } else{
    //         return {message: `ERROR: id ${movieId} not Found in database`}
    //     }
    // })

    if(searchID){
        if (movieId.length ===24){
            const query = {_id: ObjectId(movieId)}
            const result = await movies.deleteOne(query)
            if (result.acknowledged===true){
                return result
            } else{
                return {message: `ERROR: id ${movieId} not Found in database`}
            }

        } else{
            return {message: `ERROR: id ${movieId} not Found in database`}
        }
    } else{
        return {message: `ERROR: id ${movieId} not Found in database`}
    }

}

module.exports.updateById = async (movieId, newObj) => {
    const database = client.db(databaseName)
    const movies = database.collection(collName)
    //console.log(movieId.length)

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
    const query = {_id: ObjectId(newObj._id)}
    const movieID = await movies.findOne(query)

    if(!movieID){

        const result = await movies.insertOne(newObj)
        const id = result.insertedId

        if(result.acknowledged){
            return {newObjectId: id, message: `Item created ID: ${id} and title: ${newObj.title}`}

        } else {
            return {message: `ERROR: Unable to insert ${newObj.title} into database`}
        }

    } else{
        return {message: `ID: ${newObj._id} already exists. Unable to create a duplicate`}
    }

}
