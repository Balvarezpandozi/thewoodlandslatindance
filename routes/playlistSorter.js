const express = require("express");
const router = express.Router();
const playlistSorterController = require("../controllers/playlistSorter");

router.route("/").get(playlistSorterController.testFn);
module.exports = router;
