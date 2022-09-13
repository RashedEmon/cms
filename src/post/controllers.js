const {post} = require('./models')




const getPostBySlug = async(req,res,next)=>{
    const {slug}=req.params
    let posts;
    if(slug){
        try{
            posts=await post.find({slug: slug}).limit(1)
            // console.log(posts)
        }catch{
            console.log('error happend')
            res.status(500)
            res.send('server error')
        }
        if(posts.length<=0){
            res.status(404)
            res.send('Not Found')
        }
    }
    // res.send(posts)
    res.render('./client/postDetails.ejs',{posts: posts[0]})
}

const getPostsByCategory = async(req,res,next)=>{
    const {category} = req.params  
    let posts=[]
    if(category){
        try{
            posts=await post.find({category: category})
        }catch{
            res.status(500)
            res.send('server error')
        }
        if(posts.length <= 0){
            res.status(404)
            res.send('Not Found')
        }    
    }

    res.status(200)
    // res.send(posts)
    res.render('./client/postBycategoryPage.ejs', {posts: posts})
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

// const createPostByAdmin = async(req,res)=>{
//     console.log("hello from create post in post feature")
//     // console.log(req.file)
//     // console.log(req.body)
//     let obj={
//         ...req.body,
//         timestamp: new Date(),
//         slug: slugify(req.body.title),
//         image: `images/${req.file.filename}`
//     }
//     const newPost = new post(obj)
//     try{
//         const data=await newPost.save()
//         console.log(data)
//     }catch{
//         console.log('error happend while post post data')
//     }
//     res.send(newPost)
// }

module.exports ={
    getPostBySlug,
    // createPostByAdmin,
    getPostsByCategory
}