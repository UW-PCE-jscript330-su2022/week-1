const { Router } = require('express');
const router = Router();

const movieData = require('../dataInterface/movies');

// Get all movies: curl http://localhost:5000/movies
// Get all movies and sort: curl -X GET -H "Content-Type: application/json" -d '{"sortKey": "<key>", "sortDirection": "<sortDirection>"}' http://localhost:5000/movies
router.get('/', async (req, res, next) => {
  let movieList = await movieData.getAll(
    req.body.sortKey,
    req.body.sortDirection
  );
  movieList
    ? res.status(200).json(movieList)
    : res.status(404).json({ error: `No movies found in database.` });
});

// curl http://localhost:5000/movies/573a1398f29313caabce9848
router.get('/:id', async (req, res, next) => {
  const movie = await movieData.getById(req.params.id);
  console.log(movie);
  movie
    ? res.status(200).json(movie)
    : res
        .status(404)
        .json({ error: `No movie found with the id of ${req.params.id}.` });
});

// curl http://localhost:5000/movies/title/The%20Goonies
router.get('/title/:title', async (req, res, next) => {
  const movie = await movieData.getByTitle(req.params.title);

  movie
    ? res.status(200).json(movie)
    : res.status(404).json({
        error: `No movie found with the title of ${req.params.title}.`,
      });
});
// curl http://localhost:5000/movies/title/Happiness/year/1998
router.get('/title/:title/year/:year', async (req, res, next) => {
  const movies = await movieData.getByTitleAndYear(
    req.params.title,
    req.params.year
  );

  movies
    ? res.status(200).json(movies)
    : res.status(404).json({
        error: `No movies found with the title of ${req.params.title} and release year of ${req.params.year}.`,
      });
});

// curl -X POST -H "Content-Type: application/json" -d '{"title":"Llamas From Space", "plot":"Aliens..."}' http://localhost:5000/movies
router.post('/', async (req, res, next) => {
  let result = await movieData.create(req.body);
  result
    ? res
        .status(200)
        .send(
          `New movie added to database (id of ${result.newObjectId} assigned).`
        )
    : res.status(404).json({
        error: `New movie could not be added to database at this time. Please try again later.`,
      });
});

// curl -X PUT -H "Content-Type: application/json" -d '{"plot":"Sharks..."}' http://localhost:5000/movies/573a1390f29313caabcd42e8
router.put('/:id', (req, res, next) => {
  if (movieData.getById(req.params.id)) {
    movieData.updateById(req.params.id, req.body.field);
    res.status(200).send(`Movie with id ${req.params.id} updated`);
  } else {
    res
      .status(404)
      .send(
        `Movie with id ${req.params.id} does not exist. No update made to data.`
      );
  }
});

// curl -X DELETE http://localhost:5000/movies/573a1390f29313caabcd4135
router.delete('/:id', async (req, res, next) => {
  if (await movieData.getById(req.params.id)) {
    if ((await movieData.deleteById(req.params.id)).deleteCount !== 0) {
      res
        .status(200)
        .send(`Record with id of ${req.params.id} has been deleted.`);
    } else {
      res.status(500).json({
        error: `Record with id of ${req.params.id} found, but could not be deleted.`,
      });
    }
  } else {
    res
      .status(404)
      .json({ error: `Record with id of ${req.params.id} not found.` });
  }
});

module.exports = router;
