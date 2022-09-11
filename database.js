const { MongoClient, ServerApiVersion } = require('mongodb');
const {database} = require('./server.config.js')

var _db

//db connection


const initDB=async(callBack)=>{
    if(_db){
        console.log('already connected')
        callBack(true)
        return 
    }
    console.log(database.dburl)
    const uri = database.dburl;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    client.connect(err => {
        _db = client.db("cms_rashed");
        console.log("successfully connected with database");
        if (err) {
            callBack(false);
            client.close();
            return;
        }
        console.log('new connection')
        if(_db){
            console.log('db created')
        }
        callBack(true)

    });
    
}

module.exports={
    initDB,
    getDB:()=>{
        console.log('db exist')
        return _db
    }
}


