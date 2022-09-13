const express = require('express')
const {getCategory} = require('./controllers')

const router=express.Router()

router.all('/category',(req,res,next)=>{
    next()
})

router.get('/category', getCategory)
