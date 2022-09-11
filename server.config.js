const PORT = 3000
const HOST = '127.0.0.1'
const username='rashedul'
const password= 'fJNiUwZ8xs5bPijo'
const dnconfig = {
    username: 'rashedul',
    password: 'fJNiUwZ8xs5bPijo',
    dburl: `mongodb+srv://rashedul:${password}@cluster0.7jdmi1s.mongodb.net/?retryWrites=true&w=majority`
}

module.exports={
    port: PORT,
    host: HOST,
    database: dnconfig
}