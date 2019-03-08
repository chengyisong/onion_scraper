let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let savedSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    // note: {
    //     type: Schema.Types.ObjectId,
    //     ref: "note"
    // },
    summary: {
        type: String,
        required: false
    }
});

let saved = mongoose.model("saved", savedSchema);

module.exports = saved;