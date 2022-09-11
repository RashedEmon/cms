var multer = require('multer');
multer.diskStorage()

var storage = multer.diskStorage({
    destination: (req,res,callBack)=>{
        callBack(null,'./../public/')
    },
    filename: (req,file,callBack)=>{
        callBack(null,Date.now()+'_'+file.originalname)
    }
})

var multipartHandlerInstance = multer({
    storage: storage,
})



const slugify = (slug='ok')=>{
    return slug.split(' ').join('_')
}

module.exports ={
    slugify,
    multipartHandlerInstance
}