const express = require('express')
const {getPostBySlug,createPostByAdmin,getPostsByCategory} = require('./controllers')
const {allowedHttpVerbs}= require('./middlewares')
const {upload} = require('../utils')


let router = express.Router()

router.all('/post/*',allowedHttpVerbs(['GET','POST']))
.get('/post/:slug',getPostBySlug)
.get('/posts/:category',getPostsByCategory)
// .post('/post',upload.single('image'),createPostByAdmin)

// let route=express.Router()
// route.get('/posts/:category',getPostsByCategory)
// route.get(getPostBySlug,getPostsByCategory)

module.exports = {
    postRoute: router
}