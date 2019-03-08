let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let newsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: false
    },
    link: {
        type: String,
        required: true
    },
    isSaved: {
        type: Boolean,
        default: false
    }
});

let news = mongoose.model("news", newsSchema);

module.exports = news;