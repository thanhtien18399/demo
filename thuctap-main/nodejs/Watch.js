const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const watch = new Schema({
    name: { type: String, require: true },
    type: { type: String, require: true },
    price: { type: Number, require: true },
    img: { type: String, require: true },
}, {
    timestamps: true,
})

module.exports = mongoose.model("Model", watch, "watch");