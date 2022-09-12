const express = require('express')
const path = require('path')
const app = express()
const {port,host,database} = require('./server.config.js')
const {postRoute} = require('./src/post/routes')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const {admin_route} = require('./src/admin/routes')


const main=()=>{

//routes configation for all routes 
var router = express.Router({
    caseSensitive: true,
    strict: true
})

//for home route
app.get('/',(req,res)=>{
    res.render('index.ejs',{user: [{name: 'emon',age: 25},{name: 'basar', age: 19}]})
    console.log(`${__dirname}/public`)
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
