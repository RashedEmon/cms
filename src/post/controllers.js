const {post} = require('./models')
const {slugify} = require('../utils')




const getPostBySlug = async(req,res,next)=>{
    console.log('slug')
    const {slug}=req.params
    let posts;
    try{
        posts=await post.find()
        console.log(posts)
    }catch{
        console.log('error happend')
    }
    res.send(posts)
}

// {
//     fieldname: 'image',
//     originalname: 'whitemap.png',
//     encoding: '7bit',
//     mimetype: 'image/png',
//     destination: './public/images/',
//     filename: 'image-1662961618636-143837502.png',
//     path: 'public/images/image-1662961618636-143837502.png',
//     size: 1531379
//   }

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
    res.send(newPost)
}

module.exports ={
    getPostBySlug,
    createPostByAdmin
}