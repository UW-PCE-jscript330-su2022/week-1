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

| Request Type | Endpoint                 | Expected results                                                                                                          |
| ------------ | ------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| GET          | /movies                  | Retrieves all movies from database. Supports sorting of results through addition of sortKey and sortDirection to request. |
| GET          | /movies/:id              | Retrieves movie with \_id value matching :id                                                                              |
| GET          | /movies/title/:title     | Retrieves movies with title value matching :title                                                                         |
| GET          | /title/:title/year/:year | Retrieves movies with title matching :title and year matching :year                                                       |
| POST         | /movies                  | Posts a new movie to the database                                                                                         |
| PUT          | /movies/:id              | Updates an existing movie in the database with \_id matching :id                                                          |
| DELETE       | /movies/:id              | Removes movie from database with \_id matching :id                                                                        |

## Route Errors

| Request Type | Endpoint                 | Errors                                                                                          |
| ------------ | ------------------------ | ----------------------------------------------------------------------------------------------- |
| GET          | /movies                  | 404: No movie data found in database                                                            |
| GET          | /movies/:id              | 404: No movie found with \_id field matching supplied :id value                                 |
| GET          | /movies/title/:title     | 404: No movies found with title field matching supplied :title value                            |
| GET          | /title/:title/year/:year | 404: No movies found with title field and year fields matching supplied :title and :year values |
| POST         | /movies                  | 404: New movie could not be added to database.                                                  |
| PUT          | /movies/:id              | 404: No movie could be found with \_id field matching :id value provided.                       |
| DELETE       | /movies/:id              | 404: No movie could be found with \_id field matching :id value provided.                       |

## Route Example curl Calls

| Request Type | Curl                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| GET          | curl http://localhost:5000/movies                                                                                                    |
| GET          | curl http://localhost:5000/movies/<movieId>                                                                                          |
| GET          | curl http://localhost:5000/movies/title/<movieTitle>                                                                                 |
| GET          | curl http://localhost:5000/movies/title/<movieTitle>/year/<movieYear>                                                                |
| POST         | curl -X POST -H "Content-Type: application/json" -d '{"title":"Llamas From Space", "plot":"Aliens..."}' http://localhost:5000/movies |
| PUT          | curl -X PUT -H "Content-Type: application/json" -d '{"plot":"Sharks..."}' http://localhost:5000/movies/<movieId>                     |
| DELETE       | curl -X DELETE http://localhost:5000/movies/<movieId>                                                                                |

# Helpful Documentation

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
