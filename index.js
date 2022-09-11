var express = require('express')
var app = express()
const {port,host} = require('./server.config.js')
const {postRoute} = require('./src/post/routes')
const {initDB,getDB} = require('./database')
var bodyParser = require('body-parser');



//db instance
var db

//routes configation for all routes 
var router = express.Router({
    caseSensitive: true,
    strict: true
})

//for home route
app.get('/',(req,res)=>{
    res.render('index.ejs',{user: [{name: 'emon',age: 25},{name: 'basar', age: 19}]})
})

//use middlewares in app instance
app.use(express.static(__dirname+'/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
// app.use(multer.array())
app.use(router)
app.use(postRoute)

//databse connection establishment
initDB((connect)=>{
    //if database connected successfully then server will start to listen
    if(connect){
        app.listen(port,host,()=>{
            console.log(`server running on port:${port} and host: http://${host}:${port}`)
        })
        db=getDB()
    }else{
        throw Error("database connection failed")
    }
})
