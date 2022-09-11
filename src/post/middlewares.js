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

module.exports = {
    allowedHttpVerbs
}