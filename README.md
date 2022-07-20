### Getting started

1. Make sure you have a recent version of [Node.js](https://nodejs.org/en/download/) installed on your computer. I am using Node v16.15, but anything above 14 will be fine.
2. Ensure you have git and github set up on your computer. If you do not, please follow this guide: https://help.github.com/en/github/getting-started-with-github.
3. Fork this repository and clone it locally. 
4. In your terminal, from inside this project directory, run `npm install` to install the project dependencies.
5. Run `npm start` to start your local server. You should see a logged statement telling you `Server is listening on http://localhost:5000`.
6. Use curl or API client of your choice to browse the various endpoints (8 in total) contained in this project. Practice calling all of them and getting 200 HTTP responses.
7. Run the unit tests of this project: `npm test`. Your test output should end in something like this:


This API has twelve routes:
```
GET /items
GET /items/:id
POST /items
PUT /items/:id
DELETE /items/:id
```
```
GET /movies
GET /movies/:id
GET /movies/title/:title
POST /movies
PUT /movies/:id
DELETE /movies/:id
```
```
all * 
```

Express documentation: http://expressjs.com
Curl documentation: https://curl.se/docs/manpage.html
Jest documentation: https://jestjs.io/


### Connecting to MongoDB

1. Create a New Cluster
  a. Free: Choose Shared, or pay for dedicated Server
  b. Cloud Provider: AWS
  c. Choose closest serving point
2. Connect to Cluster
  a. Click > Connect
  b. Connect you application
  c. copy uri
3. In your dataInterface 

```
const uri = "your uri";
const client = new MongoClient(uri);

const databaseName = 'db name';
const collName = 'collection name'

module.exports = {}
// curl http://localhost:5000/movies/
module.exports.getAll = async () => {
  const database = client.db(databaseName);
  const movies = database.collection(collName);
  
  const query = {};
  let movieCursor = await movies.find(query).limit(10);
  
  return movieCursor.toArray();
}
```
4. Make sure your password is added to the uri

