const express = require('express')
require('dotenv').configDotenv({ path:'./.env/dev.env' })

const app = express()
const path = process.env.SERV_PATH
const port  = process.env.SERV_PORT
const proto = process.env.SERV_PROTO

console.log(path+port)

app.get('/', (req,res)=>{
    res.send('hello world')
})

app.listen(port, path, ()=>{
    console.log(`Listening on ${proto}${path}:${port}`)
})