const { Router } = require('express');
const router = Router();

const movieData = require('../dataInterface/movies');

// curl http://localhost:5000/movies
router.get('/', async (req, res, next) => {
  let movieList = await movieData.getAll();
  res.status(200).send(movieList);
});

router.get('/:id', async (req, res, next) => {
  const movie = await movieData.getById(req.params.id);
  movie
    ? res.status(200).json(movie)
    : res
        .status(404)
        .json({ error: `No movie found with the id of ${req.params.id}` });
});

router.post('/', async (req, res, next) => {
  let result = await movieData.create(req.body);
  res.status(200).send(`New movie created`);
});

router.put('/:id', (req, res, next) => {
  if (movieData.getById(req.params.id)) {
    movieData.updateById(req.params.id, req.body.field);
    res.status(200).send(`movie with id ${req.params.id} updated`);
  } else {
    res
      .status(200)
      .send(
        `movie with id ${req.params.id} does not exist. No update made to data.`
      );
  }
});

router.delete('/:id', (req, res, next) => {
  if (movieData.getById(req.params.id)) {
    movieData.deleteById(req.params.id);
    res.status(200).send(`Record with id of ${req.params.id} has been deleted`);
  } else {
    res.status(200).send(`Record with id of ${req.params.id} not found`);
  }
});

module.exports = router;
