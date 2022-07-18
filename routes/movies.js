const { Router } = require("express");
const router = Router();

const movieData = require('../dataInterface/movies');

// curl http://localhost:5000/movies
router.get("/", (req, res, next) => {
  movieData.getAll().then(data => {
    res.status(200).send(data);
  }, err => {
    res.status(500).send(`Error occured : ${err}`);
  });
});

router.get("/search", (req, res, next) => {
  const title = req.query.title;
  const yearString = req.query.year;

  if (title === undefined || title === '' || yearString === undefined || yearString === '') {
    res.status(400).send('invalid query params');
  }
  else {
    const year = parseInt(yearString);
    if (Number.isNaN(year)) {
      res.status(400).send('Invalid year');
    }
    else {
      movieData.search(title, year).then(data => {
        if (data === undefined || data.length === 0) {
          res.status(404).send(`Movies with title: '${title}' and year : ${year} not found`);
        }

        else {
          res.status(200).send(data);
        }
      }, err => {
        res.status(500).send(`Error occurred: ${err}`);
      });
    }
  }
});

router.get("/:title", (req, res, next) => {
  movieData.getByTitle(req.params.title).then(data => {
    if (data === undefined || data.length === 0) {
      res.status(404).send(`Movie with title: '${req.params.title}' not found`);
    }
    else {
      res.status(200).send(data);
    }
  }, err => {
    res.status(500).send(`Error occurred: ${err}`);
  });
});

router.post("/", (req, res, next) => {
  if (!validateRequestBody(req.body)) {
    res.status(400).send('Invalid request body');
  }
  else {
    movieData.createMovie(req.body).then(data => {
      console.log(data);
      if (data !== undefined && data.acknowledged === true) {
        res.status(200).send(`movie with id: ${data.insertedId} created`);
      }
      else {
        res.status(500).send(data);
      }
    }, err => {
      res.status(500).send(err);
    });
  }

});

// curl -X PUT -H "Content-Type: application/json" -d '{"field":"updated value"}' http://localhost:5000/movies/7
router.put("/:id", async (req, res, next) => {
  if (!validateRequestBody(req.body)) {
    res.status(400).send('Invalid request body');
  }
  else {
    movieData.updateMovie(req.params.id, req.body).then(data => {
      console.log(data);
      if (data !== undefined && data.acknowledged === true) {
        res.status(200).send(data);
      }
      else {
        res.status(500).send(data);
      }
    }, err => {
      res.status(500).send(err);
    });
  }

});

// curl -X DELETE http://localhost:5000/movies/7
router.delete("/:id", (req, res, next) => {
  movieData.deleteMovie(req.params.id).then(data => {
    console.log(data);
    if (data !== undefined && data.acknowledged === true) {
      res.status(200).send(data);
    }
    else {
      res.status(500).send(data);
    }
  }, err => {
    res.status(500).send(err);
  });
});

const validateRequestBody = (reqBody) => {
  if (reqBody === null) {
    return false;
  }

  const requestBodyKeys = Object.keys(reqBody);
  const fieldIndex = requestBodyKeys.findIndex(element => element === 'title');
  if (fieldIndex === -1) {
    return false;
  }

  return true;
}

module.exports = router;