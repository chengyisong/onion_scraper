let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let newsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    picURL: {
        type: String,
        required: true
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});

let news = mongoose.model("news", newsSchema);

module.exports = news;