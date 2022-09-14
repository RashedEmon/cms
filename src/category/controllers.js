const {category} = require('./models')

const getCategory = async(req,res)=>{
    let data;
    try{
        data=await category.find({})
    }catch{
        console.log("error")
    }
    console.log(data)
    // console.log('category hit')
    res.render('./client/allCategoryPage.ejs', {categories: data})
}


module.exports = {
    getCategory,
}