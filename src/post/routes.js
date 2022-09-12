const express = require('express')
const {getPostBySlug,createPostByAdmin} = require('./controllers')
const {allowedHttpVerbs}= require('./middlewares')
const {upload} = require('../utils')


let router = express.Router()

router.all('/post/*',allowedHttpVerbs(['GET','POST']))
.get('/post',getPostBySlug)
.post('/post',upload.single('image'),createPostByAdmin)


module.exports = {
    postRoute: router
}