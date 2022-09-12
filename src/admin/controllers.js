const { render } = require("ejs")


//recieve post data and insert to database route: host/admin/post
const createPostByAdmin = async(req,res)=>{
    // console.log(req.file)
    // console.log(req.body)
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
    return res.render('/admin.ejs',{page: 'post', postst: []})
}
//recieve category data and insert to database route: host/admin/category
const createCategoryByAdmin = (req,res,next)=>{

    return res.render('/admin.ejs',{page: 'category', categories: []})
}

//get admin page  host/admin
const getAdminPage = (req,res,next)=>{

    return res.render('./admin.ejs',{page: 'adminhome'})
}
//get the page to create category route: host/admin/category
const getCategoryPage = (req,res,next)=>{
    return res.render('./admin.ejs',{page: 'category'})
}
//get the page to create post route: host/admin/post
const getPostPage = (req,res,next)=>{

    return res.render('./admin.ejs',{page: 'post', posts: []})
}

module.exports ={
    getAdminPage,
    getPostPage,
    createPostByAdmin,
    getCategoryPage,
    createCategoryByAdmin
}