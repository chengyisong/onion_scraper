let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let noteSchema = new Schema({
    content: String,
});

let note = mongoose.model("note", noteSchema);

module.exports = note;