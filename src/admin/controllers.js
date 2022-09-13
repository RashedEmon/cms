// const { render } = require("ejs")
const {post} = require('../post/models')
const {category} = require('../category/models')
const {slugify} = require('../utils')

//recieve post data and insert to database route: host/admin/post
const createPostByAdmin = async(req,res)=>{
    let obj={
        ...req.body,
        timestamp: new Date(),
        slug: slugify(req.body.title),
        image: `images/${req.file.filename}`
    }
    const newPost = new post(obj)
    try{
        const data=await newPost.save()
        console.log(data)
    }catch{
        console.log('error happend while post post data')
    }
    res.redirect('/admin/post')
    // res.render('./admin.ejs',{page: 'post', postst: []})
}
//recieve category data and insert to database route: host/admin/category
const createCategoryByAdmin = async(req,res)=>{
    console.log(req.body)
    let obj={
        ...req.body,
        timestamp: new Date(),
        slug: slugify(req.body.title),
        image: `images/${req.file.filename}`
    }
    console.log(obj)
    const newCategory = new category(obj)
    let categories=[]
    try{
        const data=await newCategory.save()
        categories = await category.find().sort({timestamp: -1}).limit(10)
    }catch{
        console.log('error happend while create category')
        res.send('error')
    }
    res.redirect('/admin/category')
    // res.render('./admin.ejs',{page: 'category', categories: [...categories]})
}


//get admin page  host/admin
const getAdminPage = (req,res,next)=>{

    return res.render('./admin.ejs',{page: 'adminhome'})
}
//get the page to create category route: host/admin/category
const getCategoryPage = async(req,res,next)=>{
    let categories=[]
    try{
        categories = await category.find().sort({timestamp: -1}).limit(10)
        console.log(categories)
    }catch{
        console.log('error happend while create category')
        res.send('error')
    }

    res.render('./admin.ejs',{page: 'category', categories: categories})
}
//get the page to create post route: host/admin/post
const getPostPage = async(req,res,next)=>{
    let categories=[]
    let posts=[]
    try{
        categories = await category.find()
        posts = await post.find().sort({timestamp: -1}).limit(10)
    }catch{
        console.log('error happend while create category')
        res.status(500)
        res.send('error')
    }

    return res.render('./admin.ejs',{page: 'post', posts: posts, categories: categories})
}

module.exports ={
    getAdminPage,
    getPostPage,
    createPostByAdmin,
    getCategoryPage,
    createCategoryByAdmin
}