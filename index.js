const express = require('express')
const path = require('path')
const app = express()
const {host} = require('./server.config.js')
const {postRoute} = require('./src/post/routes')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {post} = require('./src/post/models')
const {category} = require('./src/category/models')
const {admin_route} = require('./src/admin/routes')
require('dotenv').config()


//server specific data
const port = parseInt(process.env.PORT, 10) || 3000
const dburl = process.env.DBURL



//main function which will execute first
const main=()=>{
//routes configation for all routes 
var router = express.Router({
    caseSensitive: true,
    strict: true
})
// handle home page. get featured post,categories, latestPost, category wise post
// and render correcponding view
const getHomePage = async(req,res)=>{
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let featuredPost=[]
    let categories=[]
    let latestPost=[]
    var categoryWisePost = []
    try{
        featuredPost = await post.find({timestamp: {$gte: today}}).limit(5)
        categories = await category.find({})
        latestPost = await post.find({}).sort({timestamp: -1}).limit(5)
    }catch{

    }
    if(categories.length>0){
        
        categoryWisePost=await Promise.all(Object.values(categories).map(async(cat)=>{
            try{
                const data= await post.find({category: cat.title})
                const obj = {
                    category: cat.title,
                    posts: data
                }
                return obj
            }catch{
                console.log('error while loading category')
            }

        }))
    }
    res.render('./client/home.ejs',{featuredPost: featuredPost, categories: categories, latestPost: latestPost, categoryWisePost: categoryWisePost})
} 
//for home route
app.get('/',getHomePage)

//use middlewares in app instance
app.use(express.static(`${__dirname}/public`))
app.set('views',path.join(__dirname,'views'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(router)
app.use(postRoute)
app.use(admin_route)
}
//connect with mongoDB atlas
mongoose.connect(dburl)
.then(()=>{
    app.listen(port,host,()=>{
        console.log(`server running on port:${port} and host: http://${host}:${port}`)
    })
    console.log('database connected successfully')
})
.catch((err)=>{
    console.log(err)
})

main()
