# Week 2 API Documentation

This API allows a user to interact with a movie data base with full CRUD actions.

Mongodb URI:  "mongodb+srv://jnaden:Or05Kila@cluster0.gyrolbu.mongodb.net/?retryWrites=true&w=majority"

This API has six Routes:
````
GET /movies
    -Returns 10 documents including :id, :title, and :year. Sorted newest to oldest.
GET /movies/:id
    -Returns movie with provided :id
GET /movies/titles/:title
    -Returns first movie with provided :title
POST /movies
    -Creates new document in db
PUT /movies/:id
    -Locates document by :id a updates provided parameters
DELETE /movies/:id
    -Deletes document with provided :id

EXAMPLES: 

#GET /movies
$ curl http://localhost:3000/movies
[{"_id":"573a13f1f29313caabddc613","title":"Halo: Nightfall","year":"2014è"},{"_id":"573a13eaf29313caabdcfbc1","title":"The Roosevelts: An Intimate History","year":"2014è"},{"_id":"573a13d9f29313caabda87b7","title":"Hit & Miss","year":"2012è"},{"_id":"573a13d5f29313caabd9d89c","title":"Penance","year":"2012è"},{"_id":"573a13dbf29313caabdae27b","title":"The Weight of the Nation","year":"2012è"},{"_id":"573a13d7f29313caabda189f","title":"Vietnam in HD","year":"2011è"},{"_id":"573a13c7f29313caabd75324","title":"Falling Skies","year":"2011è"},{"_id":"573a13cdf29313caabd83c05","title":"Stephen Hawking's Universe","year":"2010è"},{"_id":"573a13d2f29313caabd92d3b","title":"Third Reich: The Rise & Fall","year":"2010è"},{"_id":"573a13cbf29313caabd7ecd4","title":"If God Is Willing and da Creek Don't Rise","year":"2010è"}]% 

# GET /movies/:id
$ curl http://localhost:5000/movies/573a1390f29313caabcd5c0f
{"_id":"573a1390f29313caabcd5c0f","plot":"The story of a poor young woman, separated by prejudice from her husband and baby, is interwoven with tales of intolerance from throughout history.","genres":["Drama","History"],"runtime":197,"rated":"NOT RATED","cast":["Lillian Gish","Spottiswoode Aitken","Mary Alden","Frank Bennett"],"num_mflix_comments":0,"poster":"https://m.media-amazon.com/images/M/MV5BZTc0YjA1ZjctOTFlZi00NWRiLWE2MTAtZDE1MWY1YTgzOTJjXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_SX677_AL_.jpg","title":"Intolerance: Love's Struggle Throughout the Ages","fullplot":"Intolerance and its terrible effects are examined in four historical eras. In ancient Babylon, a mountain girl is caught up in the religious rivalry that leads to the city's downfall. In Judea, the hypocritical Pharisees condemn Jesus Christ. In 1572 Paris, unaware of the impending St. Bartholomew's Day Massacre, two young Huguenots prepare for marriage. Finally, in modern America, social reformers destroy the lives of a young woman and her beloved.","countries":["USA"],"released":"1916-09-05T00:00:00.000Z","directors":["D.W. Griffith"],"writers":["D.W. Griffith (scenario)","Anita Loos (titles)"],"awards":{"wins":1,"nominations":0,"text":"1 win."},"lastupdated":"2015-09-05 00:01:19.580000000","year":1916,"imdb":{"rating":8,"votes":9880,"id":6864},"type":"movie","tomatoes":{"viewer":{"rating":3.8,"numReviews":4718,"meter":78},"dvd":"2002-12-10T00:00:00.000Z","critic":{"rating":8.1,"numReviews":32,"meter":97},"lastUpdated":"2015-09-15T17:02:34.000Z","consensus":"A pioneering classic and one of the most influential films ever made, D.W. Griffith's Intolerance stands as the crowning jewel in an incredible filmography.","rotten":1,"production":"Cohen Media Group","fresh":31}}%

# GET /movies/titles/:title
$ curl http://localhost:3000/movies/titles/Titanic
{"_id":"573a139af29313caabcf0d74","fullplot":"84 years later, a 101-year-old woman named Rose DeWitt Bukater tells the story to her granddaughter Lizzy Calvert, Brock Lovett, Lewis Bodine, Bobby Buell and Anatoly Mikailavich on the Keldysh about her life set in April 10th 1912, on a ship called Titanic when young Rose boards the departing ship with the upper-class passengers and her mother, Ruth DeWitt Bukater, and her fiancè, Caledon Hockley. Meanwhile, a drifter and artist named Jack Dawson and his best friend Fabrizio De Rossi win third-class tickets to the ship in a game. And she explains the whole story from departure until the death of Titanic on its first and last voyage April 15th, 1912 at 2:20 in the morning.","imdb":{"rating":7.7,"votes":716392,"id":120338},"year":1997,"plot":"A seventeen-year-old aristocrat falls in love with a kind, but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.","genres":["Drama","Romance"],"rated":"PG-13","metacritic":74,"title":"Titanic","lastupdated":"2015-09-13 00:41:42.117000000","languages":["English","French","German","Swedish","Italian","Russian"],"writers":["James Cameron"],"type":"movie","tomatoes":{"website":"http://www.titanicmovie.com/","viewer":{"rating":3.3,"numReviews":35792304,"meter":69},"dvd":"2012-09-10T00:00:00.000Z","critic":{"rating":8,"numReviews":178,"meter":88},"boxOffice":"$57.9M","consensus":"A mostly unqualified triumph for James Cameron, who offers a dizzying blend of spectacular visuals and old-fashioned melodrama.","rotten":21,"production":"Paramount Pictures","lastUpdated":"2015-09-13T17:05:18.000Z","fresh":157},"poster":"https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SY1000_SX677_AL_.jpg","num_mflix_comments":128,"released":"1997-12-19T00:00:00.000Z","awards":{"wins":127,"nominations":63,"text":"Won 11 Oscars. Another 116 wins & 63 nominations."},"countries":["USA"],"cast":["Leonardo DiCaprio","Kate Winslet","Billy Zane","Kathy Bates"],"directors":["James Cameron"],"runtime":194}%  

# POST /movies
$ curl -X POST -H "Content-Type: application/json" -d '{"title":"Inspector Gadget", "plot":"Bionic man.."}' http://localhost:3000/movies
{"newObjectId":"62d73cf9902733cb4ed2beae","message":"Item created! ID: 62d73cf9902733cb4ed2beae"}% 

# PUT /movies/:id
$ curl -X PUT -H "Content-Type: application/json" -d '{"title": "Inspector Gadget"}' http://localhost:3000/movies/573a1390f29313caabcd5ea4
{"message":"UPDATED 1 movies"}% 

# DELETE /movies/:id
$ curl -X DELETE http://localhost:5000/movies/573a1390f29313caabcd6223
{"message":"DELETED 1 movies"}%  

ERROR HANDLING:

GET /movies/:id
PUT /movies/:id
DELETE /movies/:id
    - If an invalid :id is sent, the following 404 returns: {"error":"no item found with id {movieId}"}%  

GET /movies/titles/:title
    - If an invalid title is submitted, the following 404 returns: {"error":"no item found with title {movieTitle}"}%    


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

Component | Points
--------- | --------
All tests, as originally written, are passing | 50
Newly written code is valid javascript that runs without errors | 35
Newly written code is sensible | 15

Extra credit:

For 10 extra points, add a new test to items.test.js. It may be for an existing piece of API functionality or something that requires additional code in the data interface or routes files. Ideas: What happens when a delete request is made with an invalid id parameter? What happens when a post or put request is made with no data in the "field" parameter?

### Submission

- Create a pull request (PR) from your repository to the main branch of this repository with a title of your name.
- Continuous Integration is handled using Github Actions. This will automatically run your tests and show the results on your PR. If you see a red X and a message saying `All checks have failed` then you will not receive full credit. Ensure all tests are passing in order to receive full marks.
