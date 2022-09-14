const express = require('express')
const {getCategory} = require('./controllers')

const categoryRoute=express.Router()

categoryRoute.all('/category',(req,res,next)=>{
    next()
})

categoryRoute.get('/category', getCategory)

module.exports = {
    categoryRoute
}
