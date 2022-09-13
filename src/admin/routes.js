const express = require('express')
// const {allowedHttpVerbs} = require('./../utils')
const {upload,allowedHttpVerbs} = require('./middlewares')
const { createPostByAdmin, getAdminPage, getCategoryPage,createCategoryByAdmin,getPostPage } = require('./controllers')

const router=express.Router()

router.all('/*', allowedHttpVerbs(['GET','POST']))

router.get('/admin',getAdminPage)
router.get('/admin/post',getPostPage)
router.get('/admin/category',getCategoryPage)
router.post('/admin/post',upload.single('image'),createPostByAdmin)
router.post('/admin/category',upload.single('image'),createCategoryByAdmin)


module.exports = {
    admin_route: router
}