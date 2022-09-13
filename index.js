const express = require('express')
const path = require('path')
const app = express()
const {port,host,database} = require('./server.config.js')
const {postRoute} = require('./src/post/routes')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {post} = require('./src/post/models')
const {category} = require('./src/category/models')
const {admin_route} = require('./src/admin/routes')


const main=()=>{

//routes configation for all routes 
var router = express.Router({
    caseSensitive: true,
    strict: true
})

//for home route
app.get('/',async(req,res)=>{
    let featuredPost=[]
    let categories=[]
    let latestPost=[]
    let categorySet =new Set()
    let categoryWisePost = [{
        category: '',
        posts: [
            {

            }
        ]
    }]
    let allPost = []
    try{
        featuredPost = post.find().limit(3)
        categories = categories.find()
        latestPost = post.find().sort({timestamp: -1}).limit(5)
        allPost = post.find()
    }catch{

    }
    categories?Array(5).fill(0).forEach((v,idx)=> categorySet.add(categories[idx].title)): null

    if(allPost && categorySet){
        categoryWisePost=allPost.filter((post,idx)=>{
            if(categorySet.has(post.category)){
                return {
                    category: post.category,
                    posts: [...allPost[idx],post],
                }
            }
        })
    }
    res.render('./client/home.ejs',{featuredPost: featuredPost, categories: categories, latestPost: latestPost, categoryWisePost: categoryWisePost})
    // console.log(`${__dirname}/public`)
})

//use middlewares in app instance
app.use(express.static(`${__dirname}/public`))
app.set('views',path.join(__dirname,'views'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(router)
app.use(postRoute)
app.use(admin_route)
}

mongoose.connect(database.dburl)
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
