const express = require('express')
const allowedHttpVerbs = require('./../utils')
const { createPostByAdmin, getAdminPage, getCategoryPage,createCategoryByAdmin,getPostPage } = require('./controllers')

const router=express.Router()

router.all('/*', (req,res,next)=>{
    next()
})

router.get('/admin',getAdminPage)
router.get('/admin/post',getPostPage)
router.get('/admin/category',getCategoryPage)
router.post('/admin/post',createPostByAdmin)
router.post('/admin/category',createCategoryByAdmin)


module.exports = {
    admin_route: router
}