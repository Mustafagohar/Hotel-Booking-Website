const express = require("express");
const router = express.Router({ mergeParams: true }); // mergeParams true because you are nested inside listings

// Sample POST route for reviews
router.post("/", (req, res) => {
    res.send("Review created successfully!");
});

module.exports = router;
 