const express = require("express");
const produtos = require("../data/produtos");

const router = express.Router();

router.get("/", (req, res) => {
    res.json(produtos);
});

module.exports = router;