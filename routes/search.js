const express = require("express");
const varifyToken = require("../middleWare/varifyToken");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const router = express.Router();

router.get("/search-user/:query", (req, res) => {
  const query = new RegExp(`^${req.params.query}`, "i");

  User.find(
    { name: { $regex: query } }
    // $text: { $search: "`d`", $caseSensitive: false },
  )
    .select("-password")
    .then((result) => {
      res.send(result);
    });
});

module.exports = router;
