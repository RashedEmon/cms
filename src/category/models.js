const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title: String,
    slug: String,
    timestamp: Date,
    image: String
})

const category = mongoose.model('Category',categorySchema)


module.exports = {
    category,
}