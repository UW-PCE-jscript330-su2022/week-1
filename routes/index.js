const { Router } = require("express");
const router = Router();

router.use("/items", require("./items"));
router.use("/movies", require("./movies"))

// keep this route below ALL ACTIVE ROUTES
router.all('*', (req, res) => {
  res.status(502).send({error: "URL does not exist"})
})

// ensure any routes are above the root or remove root if not needed
// router.use("/", require("./items"))

module.exports = router;
