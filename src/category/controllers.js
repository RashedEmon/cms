const getCategory = (req,res)=>{
    console.log('category list')
    res.send("get category")
}

const createCategory = (req,res)=>{
    console.log(req.body)
    res.send('category post')
}