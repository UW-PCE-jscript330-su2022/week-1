# Week 1

This week is an introduction to Node.js, Express, and unit testing with Jest. The focus of this week will be on getting comfortable with the development environment, tools, and best practices in back-end development.

## Learning Objectives

At the end of this week, a student should:
- be able to navigate an Express API and understand what it does
- know how to run a local Express server and test its endpoints manually
- be comfortable reading and working with unit tests
- be able to build a simple in-memory REST API

## ENDPOINT DOCUMENTATION

```
GET /movies
```
Typing in `http://localhost:5000/movies` will provide a list of movies sorted in ascending order (A to Z, not Z to A) by title. Be aware that there will be repeated titles, as there are only so many combinations of words that make sense and not overly combersome - such is the fate of the 1995 movie *The Englishman Who Went Up a Hill But Came Down a Mountain* is not as succinct as 2018's *Avengers: Infinity War* - so don't be bothered by the repeating titles.

Be aware this is arranging alphabetically and follows the ASCII rank of symbols - there will be movies that start with symbols such as the starburst (\*), which is why **batteries not included* will show up before, say, *Avatar* from 2009.

```
GET /movies/:id
```


```
GET /movies/title/:title
```
*Be sure that **title** is singular. Not **titles**.*

Typing in `http://localhost:5000/movies/title/<title>` will provide the first movie that matches the criteria. Remember that this is URL encoded, e.g.: spaces will need to show up as %20. So instead of writing `http://localhost:5000/movies/title/return of the king`, one will need to write `http://localhost:5000/movies/title/return%20of%20the%20king`.

This is also mostly case insensitve, so capitalization is not needed, but be aware that this will also look at partial movie titles. If you are looking for Alita: Battle Angel, and you put in `http://localhost:5000/movies/title/alita`, you get *Igualita a mi* because it's the first instance of `alita` that is seen. Now you may want to try the term `battle angel` and so you input `http://localhost:5000/movies/title/battle%20angel`. But alas, not all movies that you seek may be in this list.

```
POST /movies
```
Be sure to use the POST command when creating a new entry. Pretty easy. Everything else is automatically generated as long as it is specified in the command line.

```
PUT /items/:id
```
Be sure to use the PUT command when editing an existing entry. Pretty easy. Everything else is automatically generated as long as it is specified in the command line.

```
DELETE /items/:id
```
Be sure to use the DELETE command when attempting to delete an existing entry and that that the given ID is correct. There will be no go backs and recovery.


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
