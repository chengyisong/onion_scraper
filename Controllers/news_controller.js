let express = require("express");
let router = express.Router();

let mongoose = require("mongoose");
let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI,  { useNewUrlParser: true });
let db = require("../models");

// Route for getting all Articles from the db
router.get("/", function(req, res) {
  // Grab every document in the Articles collection
  db.news.find({
      isSaved: false
  }, function(err, dbNews){
    var hbsObj = {
      news: dbNews
    };
    res.render("index",hbsObj);
  })
});


router.get("/saved", function(req, res) {
  // Grab every document in the Articles collection
  db.saved.find({})
    .then(function(dbNews) {
        var hbsObj = {
            savedNews: dbNews
        };
        res.render("saved",hbsObj);
    })
    .catch(function(err) {
      res.json(err);
    });
});

// // Route for grabbing a specific Article by id, populate it with it's note
// router.get("/saved/:id", function(req, res) {
//   // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
//   db.news.findOne({ _id: req.params.id })
//     // ..and populate all of the notes associated with it
//     .populate("note")
//     .then(function(dbNews) {
//       // If we were able to successfully find an Article with the given id, send it back to the client
//       res.json(dbNews);
//     })
//     .catch(function(err) {
//       // If an error occurred, send it to the client
//       res.json(err);
//     });
// });



module.exports = router;