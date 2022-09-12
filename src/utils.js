var multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log(__dirname+'../public/images/')
      cb(null, './public/images/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+'.'+file.mimetype.split('/')[1])
    }
  })
  
  const upload = multer({ storage: storage })
  


const slugify = (slug)=>{
    return slug.split(' ').join('_')
}

module.exports ={
    slugify,
    upload
}