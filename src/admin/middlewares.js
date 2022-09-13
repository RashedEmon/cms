var multer = require('multer');

const allowedHttpVerbs = (verbs=[])=>{
    let httpVerbs = new Set(verbs.map(item => item.toUpperCase()))

    return (req,res,next)=>{
        if(!httpVerbs.has(req.method)){
            res.send({
                message: 'method not allowed'
            })
        }else{
            next()
        }
    }
}

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log(__dirname+'../public/images/')
      cb(null, './public/images/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+'.'+file.mimetype.split('/')[1])
    }
  })
  
var upload = multer({ storage: storage })

module.exports = {
    allowedHttpVerbs,
    upload
}
