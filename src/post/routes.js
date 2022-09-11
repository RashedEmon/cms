const express = require('express')
const {getPostBySlug,createPostByAdmin} = require('./controllers')
const {allowedHttpVerbs}= require('./middlewares')
const {multipartHandlerInstance} = require('../utils')


let router = express.Router()

router.all('/post/*',allowedHttpVerbs(['GET','POST']))
.get('/post/:slug',getPostBySlug)
.post('/post',multipartHandlerInstance.single('image'),createPostByAdmin)


module.exports = {
    postRoute: router
}