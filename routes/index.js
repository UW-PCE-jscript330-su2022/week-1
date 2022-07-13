const { Router } = require("express");
const router = Router();

// Routes to use in app:
router.use("/items", require("./items"));
router.use("/movies", require("./movies"));

module.exports = router;
