const {getDB} = require('../../database')
const {slugify} = require('../utils')
const getPostBySlug = async(req,res,next)=>{
    console.log('slug')
    const {slug}=req.params
    const data=await getDB().collection('post').find({slug: slug}).toArray()
    res.send(data[0])
}
const createPostByAdmin = (req,res)=>{
    console.log(typeof(req.file))
    console.log(req.body)
    let obj={
        ...req.body,
        timestamp: new Date(),
        slug: slugify(req.body.title)
    }
    res.send(obj)
}

module.exports ={
    getPostBySlug,
    createPostByAdmin
}