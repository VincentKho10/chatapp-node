require('dotenv').configDotenv({ path:'./.env/dev.env' });
require('dotenv').configDotenv({ path:'./.env/prod.env' });

const loginRoute  = require('../api/landing_page/login');

var jwt = require('jsonwebtoken');
var express = require('express');
var fs = require('fs');

const path = process.env.SERV_PATH
const port  = process.env.SERV_PORT
const proto = process.env.SERV_PROTO

const app = express();

app.use(express.json())

app.get('/', (req,res)=>{
    res.send('hello world')
})

app.use('/login', loginRoute)

app.listen(port, path, ()=>{
    console.log(`Listening on ${proto}${path}:${port}`)
})