let express = require("express");
let mongoose = require("mongoose");

let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

let PORT = process.env.PORT || 8080;
let app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

let exphbs =  require("express-handlebars");
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Routes
let routes = require("./Controllers/news_controller.js");
app.use(routes);
require("./routes/apiRoutes")(app);

mongoose.connect(MONGODB_URI,  { useNewUrlParser: true });

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});