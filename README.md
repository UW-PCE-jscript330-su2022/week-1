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

## Routes

This API has seven routes:

| Request Type | Endpoint                 | Expected results                                                    |
| ------------ | ------------------------ | ------------------------------------------------------------------- |
| GET          | /movies                  | Retrieves all movies from database                                  |
| GET          | /movies/:id              | Retrieves movie with \_id value matching :id                        |
| GET          | /movies/title/:title     | Retrieves movies with title value matching :title                   |
| GET          | /title/:title/year/:year | Retrieves movies with title matching :title and year matching :year |
| POST         | /movies                  | Posts a new movie to the database                                   |
| PUT          | /movies/:id              | Updates an existing movie in the database with \_id matching :id    |
| DELETE       | /movies/:id              | Removes movie from database with \_id matching :id                  |

GET /movies

```
curl http://localhost:5000/movies

[{"_id":"573a1390f29313caabcd42e8","plot":"A group of bandits stage a brazen train hold-up, only to find a determined posse hot on their heels.","genres":["Short","Western"],"runtime":11,"cast":["A.C. Abadie","Gilbert M. 'Broncho Billy' Anderson","George Barnes","Justus D. Barnes"],"poster":"https://m.media-amazon.com/images/M/MV5BMTU3NjE5NzYtYTYyNS00MDVmLWIwYjgtMmYwYWIxZDYyNzU2XkEyXkFqcGdeQXVyNzQzNzQxNzI@._V1_SY1000_SX677_AL_.jpg","title":"The Great Train Robbery","fullplot":"Among the earliest existing films in American cinema - notable as the first film that presented a narrative story to tell - it depicts a group of cowboy outlaws who hold up a train and rob the passengers. They are then pursued by a Sheriff's posse. Several scenes have color included - all hand tinted.","languages":["English"],"released":"1903-12-01T00:00:00.000Z","directors":["Edwin S. Porter"],"rated":"TV-G","awards":{"wins":1,"nominations":0,"text":"1 win."},"lastupdated":"2015-08-13 00:27:59.177000000","year":1903,"imdb":{"rating":7.4,"votes":9847,"id":439},"countries":["USA"],"type":"movie","tomatoes":{"viewer":{"rating":3.7,"numReviews":2559,"meter":75},"fresh":6,"critic":{"rating":7.6,"numReviews":6,"meter":100},"rotten":0,"lastUpdated":"2015-08-08T19:16:10.000Z"},"num_mflix_comments":0}
]

GET /movies/:id
curl http://localhost:5000/movies/<movieId>

{
  "_id":"573a1390f29313caabcd42e8","plot":"A group of bandits stage a brazen train hold-up, only to find a determined posse hot on their heels.","genres":["Short","Western"],"runtime":11,"cast":["A.C. Abadie","Gilbert M. 'Broncho Billy' Anderson","George Barnes","Justus D. Barnes"],"poster":"https://m.media-amazon.com/images/M/MV5BMTU3NjE5NzYtYTYyNS00MDVmLWIwYjgtMmYwYWIxZDYyNzU2XkEyXkFqcGdeQXVyNzQzNzQxNzI@._V1_SY1000_SX677_AL_.jpg","title":"The Great Train Robbery","fullplot":"Among the earliest existing films in American cinema - notable as the first film that presented a narrative story to tell - it depicts a group of cowboy outlaws who hold up a train and rob the passengers. They are then pursued by a Sheriff's posse. Several scenes have color included - all hand tinted.","languages":["English"],"released":"1903-12-01T00:00:00.000Z","directors":["Edwin S. Porter"],"rated":"TV-G","awards":{"wins":1,"nominations":0,"text":"1 win."},"lastupdated":"2015-08-13 00:27:59.177000000","year":1903,"imdb":{"rating":7.4,"votes":9847,"id":439},"countries":["USA"],"type":"movie","tomatoes":{"viewer":{"rating":3.7,"numReviews":2559,"meter":75},"fresh":6,"critic":{"rating":7.6,"numReviews":6,"meter":100},"rotten":0,"lastUpdated":"2015-08-08T19:16:10.000Z"},"num_mflix_comments":0
}

GET /movies/title/:title
curl http://localhost:5000/movies/title/<movieTitle>

EXAMPLE REQUEST
curl http://localhost:5000/movies/title/The%20Goonies
{
  "_id":"573a1398f29313caabce9848","plot":"In order to save their home from foreclosure, a group of misfits set out to find a pirate's ancient treasure.","genres":["Adventure","Comedy","Family"],"runtime":114,"metacritic":60,"rated":"PG","cast":["Sean Astin","Josh Brolin","Jeff Cohen","Corey Feldman"],"poster":"https://m.media-amazon.com/images/M/MV5BNGViMjJjNTUtY2IzNi00YzcyLWFjODUtMjc0NTI3YWNhNjgzXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SY1000_SX677_AL_.jpg","title":"The Goonies","fullplot":"Mikey Walsh and Brandon Walsh are brothers whose family is preparing to move because developers want to build a golf course in the place of their neighborhood -- unless enough money is raised to stop the construction of the golf course, and that's quite doubtful. But when Mikey stumbles upon a treasure map of the famed \"One-Eyed\" Willy's hidden fortune, Mikey, Brandon, and their friends Lawrence \"Chunk\" Cohen, Clark \"Mouth\" Devereaux, Andrea \"Andy\" Carmichael, Stefanie \"Stef\" Steinbrenner, and Richard \"Data\" Wang, calling themselves The Goonies, set out on a quest to find the treasure in hopes of saving their neighborhood. The treasure is in a cavern, but the entrance to the cavern is under the house of evil thief Mama Fratelli and her sons Jake Fratelli, Francis Fratelli, and the severely disfigured Lotney \"Sloth\" Fratelli. Sloth befriends the Goonies and decides to help them.","languages":["English","Spanish","Cantonese","Italian"],"released":"1985-06-07T00:00:00.000Z","directors":["Richard Donner"],"writers":["Steven Spielberg (story)","Chris Columbus (screenplay)"],"awards":{"wins":2,"nominations":6,"text":"2 wins & 6 nominations."},"lastupdated":"2015-09-14 12:56:07.260000000","year":1985,"imdb":{"rating":7.8,"votes":163721,"id":89218},"countries":["USA"],"type":"movie","num_mflix_comments":0
}

GET /title/:title/year/:year
curl http://localhost:5000/movies/title/<movieTitle>/year/<movieYear>

EXAMPLE REQUEST
curl http://localhost:5000/movies/title/The%20Goonies/year/1985

{
  "_id":"573a1398f29313caabce9848","plot":"In order to save their home from foreclosure, a group of misfits set out to find a pirate's ancient treasure.","genres":["Adventure","Comedy","Family"],"runtime":114,"metacritic":60,"rated":"PG","cast":["Sean Astin","Josh Brolin","Jeff Cohen","Corey Feldman"],"poster":"https://m.media-amazon.com/images/M/MV5BNGViMjJjNTUtY2IzNi00YzcyLWFjODUtMjc0NTI3YWNhNjgzXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SY1000_SX677_AL_.jpg","title":"The Goonies","fullplot":"Mikey Walsh and Brandon Walsh are brothers whose family is preparing to move because developers want to build a golf course in the place of their neighborhood -- unless enough money is raised to stop the construction of the golf course, and that's quite doubtful. But when Mikey stumbles upon a treasure map of the famed \"One-Eyed\" Willy's hidden fortune, Mikey, Brandon, and their friends Lawrence \"Chunk\" Cohen, Clark \"Mouth\" Devereaux, Andrea \"Andy\" Carmichael, Stefanie \"Stef\" Steinbrenner, and Richard \"Data\" Wang, calling themselves The Goonies, set out on a quest to find the treasure in hopes of saving their neighborhood. The treasure is in a cavern, but the entrance to the cavern is under the house of evil thief Mama Fratelli and her sons Jake Fratelli, Francis Fratelli, and the severely disfigured Lotney \"Sloth\" Fratelli. Sloth befriends the Goonies and decides to help them.","languages":["English","Spanish","Cantonese","Italian"],"released":"1985-06-07T00:00:00.000Z","directors":["Richard Donner"],"writers":["Steven Spielberg (story)","Chris Columbus (screenplay)"],"awards":{"wins":2,"nominations":6,"text":"2 wins & 6 nominations."},"lastupdated":"2015-09-14 12:56:07.260000000","year":1985,"imdb":{"rating":7.8,"votes":163721,"id":89218},"countries":["USA"],"type":"movie","num_mflix_comments":0
}

POST /movies
curl -X POST -H "Content-Type: application/json" -d '{"title":"Llamas From Space", "plot":"Aliens..."}' http://localhost:5000/movies

PUT /movies/:id
curl -X PUT -H "Content-Type: application/json" -d '{"title":"Llamas From Space", "plot":"Llamas..."}' http://localhost:5000/<movieId>/movies

DELETE /movies/:id
curl -X DELETE http://localhost:5000/movies/<movieId>
```

Express documentation: http://expressjs.com
Curl documentation: https://curl.se/docs/manpage.html
Jest documentation: https://jestjs.io/

**_ Remember that changes to route handlers will not be reflected in responses until the server is restarted _**

### Your task

As you can see, there is a simple set of unit tests (routes/items.test.js) for this project's routes. However, the routes have not been fully implemented yet. Your task is to implement the route definitions (in routes/items.js) and data interface functions (in dataInterface/items.js) necessary to get all the tests to pass. The tests define the requirements, read the test file thoroughly. To get full credit for this assignment, all the tests must pass without any changes to routes/items.test.js.

### Grading

Rubric:

| Component                                                       | Points |
| --------------------------------------------------------------- | ------ |
| All tests, as originally written, are passing                   | 50     |
| Newly written code is valid javascript that runs without errors | 35     |
| Newly written code is sensible                                  | 15     |

Extra credit:

For 10 extra points, add a new test to items.test.js. It may be for an existing piece of API functionality or something that requires additional code in the data interface or routes files. Ideas: What happens when a delete request is made with an invalid id parameter? What happens when a post or put request is made with no data in the "field" parameter?

### Submission

- Create a pull request (PR) from your repository to the main branch of this repository with a title of your name.
- Continuous Integration is handled using Github Actions. This will automatically run your tests and show the results on your PR. If you see a red X and a message saying `All checks have failed` then you will not receive full credit. Ensure all tests are passing in order to receive full marks.
