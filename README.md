# Week 1

This week is an introduction to Node.js, Express, and unit testing with Jest. The focus of this week will be on getting comfortable with the development environment, tools, and best practices in back-end development.

## Learning Objectives

At the end of this week, a student should:
- be able to navigate an Express API and understand what it does
- know how to run a local Express server and test its endpoints manually
- be comfortable reading and working with unit tests
- be able to build a simple in-memory REST API

## The assignment

The assignment this week is designed to get you comfortable working in an Express server. It is meant to get you aquainted with a project of the type we will be working in during this course. It contains a simple set of REST endpoints for a generic data type (`items`). You will complete the code for this REST API to meet the requirements as defined in the test suite.

### Getting started

1. Make sure you have a recent version of [Node.js](https://nodejs.org/en/download/) installed on your computer. I am using Node v16.15, but anything above 14 will be fine.
2. Ensure you have git and github set up on your computer. If you do not, please follow this guide: https://help.github.com/en/github/getting-started-with-github.
3. Fork this repository and clone it locally. 
4. In your terminal, from inside this project directory, run `npm install` to install the project dependencies.
5. Run `npm start` to start your local server. You should see a logged statement telling you `Server is listening on http://localhost:5000`.
6. Use curl or API client of your choice to browse the various endpoints (8 in total) contained in this project. Practice calling all of them and getting 200 HTTP responses.
7. Run the unit tests of this project: `npm test`. Your test output should end in something like this:
```
Test Suites: 1 failed, 1 total
Tests:       7 failed, 2 passed, 9 total
```

This API has five routes:
```
GET /items
GET /items/:id
POST /items
PUT /items/:id
DELTE /items/:id
```

Express documentation: http://expressjs.com
Curl documentation: https://curl.se/docs/manpage.html
Jest documentation: https://jestjs.io/

*** Remember that changes to route handlers will not be reflected in responses until the server is restarted ***

### Your task

As you can see, there is a simple set of unit tests (routes/items.test.js) for this project's routes. However, the routes have not been fully implemented yet. Your task is to implement the route definitions (in routes/items.js) and data interface functions (in dataInterface/items.js) necessary to get all the tests to pass.  The tests define the requirements, read the test file thoroughly. To get full credit for this assignment, all the tests must pass without any changes to routes/items.test.js.

### Grading

Rubric:

| Component                                                       | Points |
|-----------------------------------------------------------------|--------|
| All tests, as originally written, are passing                   | 50     |
| Newly written code is valid javascript that runs without errors | 35     |
|  Newly written code is sensible                                 | 15     |     

Extra credit:

For 10 extra points, add a new test to items.test.js. It may be for an existing piece of API functionality or something that requires additional code in the data interface or routes files. Ideas: What happens when a delete request is made with an invalid id parameter? What happens when a post or put request is made with no data in the "field" parameter?

### Submission

- Create a pull request (PR) from your repository to the main branch of this repository with a title of your name.
- Continuous Integration is handled using Github Actions. This will automatically run your tests and show the results on your PR. If you see a red X and a message saying `All checks have failed` then you will not receive full credit. Ensure all tests are passing in order to receive full marks.


Movie API Documentation

Overview: Simple CRUD methods for mongo sample movie database

Get movies by title and year:
Sample curl:
curl http://localhost:5000/movies/title/<title url encoded>/year/<year>

Endpoint:
get http://localhost:5000/movies/title/<title url encoded>/year/<year>

title = "Cops", year=1922
Sample output:
[
{
"_id": "573a1391f29313caabcd73f4",
"title": "Cops",
"year": 1922
}
]

Get movies by title:
Sample curl:
curl http://localhost:5000/movies/title/<title url encoded>

Endpoint:
get http://localhost:5000/movies/title/<title url encoded>


title=3x3
Sample result:
[{"_id":"573a13cdf29313caabd83b84","title":"3x3"}]

Get movies by partial title:
Sample curl:
curl http://localhost:5000/movies/ptitle/<partial title url encoded>

Endpoint:
get http://localhost:5000/movies/title/<partial title url encoded>

partial title = miracle
Sample result:
[{"_id":"573a1392f29313caabcdb30f","title":"The Man Who Could Work Miracles"},
{"_id":"573a1393f29313caabcdd1bf","title":"The Miracle of Morgan's Creek"},
{"_id":"573a1393f29313caabcddbb5","title":"Miracle on 34th Street"},
{"_id":"573a1394f29313caabcdec01","title":"Miracle in Milan"},
{"_id":"573a1394f29313caabcdf03b","title":"The Miracle of Our Lady of Fatima"},
{"_id":"573a1394f29313caabcdf938","title":"The Miracle of Marcelino"},
{"_id":"573a1395f29313caabce1884","title":"Pocketful of Miracles"},
{"_id":"573a1395f29313caabce1c31","title":"The Miracle Worker"},
{"_id":"573a1395f29313caabce2faf","title":"More Than a Miracle"},
{"_id":"573a1396f29313caabce4692","title":"Between Miracles"}]

Get all movies (limited to first 10, sorted by title)

Sample curl:
curl http://localhost:5000/movies
Endpoint:
get http://localhost:5000/movies

Sample result
[{"_id":"573a13cef29313caabd86ecc","title":"!Women Art Revolution"},
{"_id":"573a13e6f29313caabdc56c7","title":"#chicagoGirl: The Social Network Takes on a Dictator"},
{"_id":"573a1396f29313caabce48c4","title":"$"},
{"_id":"573a13b8f29313caabd4bd33","title":"$9.99"},
{"_id":"573a13d9f29313caabda9ffb","title":"$ellebrity"},
{"_id":"573a13dff29313caabdb9439","title":"'71"},
{"_id":"573a1396f29313caabce4485","title":"'Doc'"},
{"_id":"573a1398f29313caabce99ac","title":"'Master Harold'... and the Boys"},
{"_id":"573a1393f29313caabcdc5dc","title":"'Pimpernel' Smith"},
{"_id":"573a13a1f29313caabd07b8a","title":"'R Xmas"}]

Get movie by id
Sample curl:
curl http://localhost:5000/movies/<id>
Endpoint:
http://localhost:5000/movies/<id>

id = 573a13cef29313caabd86ecc
Sample result:
{"_id":"573a13cef29313caabd86ecc",
"plot":"Through intimate interviews, provocative art, and rare, historical film and video footage, this feature documentary reveals how art addressing political consequences of discrimination and ...",
"genres":["Documentary"],
"runtime":83,
"metacritic":70,
"cast":["Lynn Hershman-Leeson"],
"num_mflix_comments":1,
"poster":"https://m.media-amazon.com/images/M/MV5BMjE1MDU1MDA2Nl5BMl5BanBnXkFtZTcwNTQ2Mzk2NQ@@._V1_SY1000_SX677_AL_.jpg",
"title":"!Women Art Revolution",
"fullplot":"Through intimate interviews, provocative art, and rare, historical film and video footage, this feature documentary reveals how art addressing political consequences of discrimination and violence, the Feminist Art Revolution radically transformed the art and culture of our times.",
"languages":["English"],
"released":"2011-06-01T00:00:00.000Z",
"directors":["Lynn Hershman-Leeson"],
"awards":{"wins":0,"nominations":2,"text":"2 nominations."},
"lastupdated":"2015-04-02 00:54:39.997000000",
"year":2010,
"imdb":{"rating":6.7,"votes":142,"id":1699720},
"countries":["USA"],
"type":"movie",
"tomatoes":{"website":"http://www.womenartrevolution.com/","viewer":{"rating":3.7,"numReviews":203,"meter":60},
"dvd":"2012-03-19T00:00:00.000Z",
"critic":{"rating":6.9,"numReviews":24,"meter":83},"boxOffice":"$51.5k",
"consensus":"Though a tad messy in spots, !Women Art Revolution is a worthy chronicle of an influential art movement seldom explored or documented.",
"rotten":4,
"production":"Zeitgeist Films",
"lastUpdated":"2015-07-16T18:12:36.000Z",
"fresh":20}}

Add new movie entry, title is required
Sample curl:
curl -X POST -H "Content-Type: application/json" -d '{"title":"<title>", "plot":"<plot>"}' http://localhost:5000/movies
Endpoint:
post http://localhost:5000/movies
Sample result:
{"newObjectId":"62d7b665785aa5eeb7083c73","message":"Item created! ID: 62d7b665785aa5eeb7083c73"}

Update a movie entry
Sample curl:
curl -X PUT -H "Content-Type: application/json" -d '{"<field>":"<value>..."}' http://localhost:5000/movies/<id>
Endpoint:
put http://localhost:5000/movies/

id = 62d7b665785aa5eeb7083c73
Sample result:
{"message":"UPDATED 1 movies"}

Delete a movie entry
Sample curl:
curl -X DELETE http://localhost:5000/movies/<id>
Endpoint:
delete http://localhost:5000/movies/<id>

id = 62d7b665785aa5eeb7083c73
Sample result:
{"message":"DELETED 1 movies"}



