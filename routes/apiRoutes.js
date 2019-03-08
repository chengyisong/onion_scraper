let axios = require("axios");
let cheerio = require("cheerio");
let db = require("../models");

module.exports = function (app) {
    // A GET route for scraping the echoJS website
    app.get("/scrape", function (req, res) {
        db.news.deleteMany({}, function (err) {
            console.log("records deleted")
        });

        // First, we grab the body of the html with axios
        axios.get("https://www.theonion.com/").then(function (response) {
            var $ = cheerio.load(response.data);

            $("h1.entry-title").each(function (i, element) {
                var result = {};
                result.title = $(this).children().text();
                result.link = $(this).find("a").attr("href");
                result.summary = $(this).parent().parent().find("div.entry-summary").text();

                db.news.create(result)
                    .then(function (dbNews) {
                        console.log(dbNews);
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            });

            // Route for getting all Articles from the db
            router.get("/", function (req, res) {
                // Grab every document in the Articles collection
                db.news.find({
                    isSaved: false
                }, function (err, dbNews) {
                    var hbsObj = {
                        news: dbNews
                    };
                    res.render("index", hbsObj);
                })
            });
        });

    });

    app.post("/scrape", function (req, res) {
        db.news.deleteMany({}, function (err) {
            console.log("records deleted")
        });
    });

    app.get("/news/:id", function (req, res) {
        db.news.updateOne({ _id: req.params.id }, { isSaved: true }).then(function () {
            console.log("updated to be true..")
        });

        db.news.findOne({ _id: req.params.id })
            .then(function (dbNews) {
                var result = {};
                result.title = dbNews.title;
                result.link = dbNews.link;
                result._id = dbNews._id;
                result.summary = dbNews.summary;
                db.saved.create(result).then(function () {
                    db.saved.find({})
                        .then(function (dbNews) {
                            var hbsObj = {
                                savedNews: dbNews
                            };
                            res.render("saved", hbsObj);
                        })
                });
            })
    });

    app.post("/news/:id", function (req, res) {
        db.saved.deleteOne({ _id: req.params.id })
            .then(function () {
                db.saved.find()
                    .then(function (dbNews) {
                        var hbsObj = {
                            savedNews: dbNews
                        };
                        res.render("saved", hbsObj);
                    })
            })
        db.news.updateOne({ _id: req.params.id }, { isSaved: false}).then(function () {
            console.log("updated to be false..")
        });
    });

    app.get("/notes/:id", function(req, res) {
        db.note.find({ linkedNewsId: req.params.id })  
      .then(function(dbSaved) {
        res.json(dbSaved);
      })
    });

    app.post("/notes/:id", function(req, res) {
        db.note.create(req.body)  
     .then(function(dbSaved) {
        res.json(dbSaved);
      })
    });

    app.put("/notes/:id", function(req, res) {
        db.note.deleteOne({ _id: req.params.id })  
     .then(function(dbSaved) {
        res.json(dbSaved);
      })
    });
}


