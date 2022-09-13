const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: String,
    slug: String,
    category: String,
    description: String,
    timestamp: Date,
    image: String
})

const post = mongoose.model('Post',postSchema)


module.exports = {
    post,
}