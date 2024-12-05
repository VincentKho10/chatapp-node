import express, { RequestHandler } from 'express'
import { UserData } from './data/user_data';
import userRoute from './route/user_routes'

require('dotenv').configDotenv({ path:'./.env/dev.env' });
require('dotenv').configDotenv({ path:'./.env/prod.env' });

var jwt = require('jsonwebtoken');
var fs = require('fs');

const path = process.env.SERV_PATH||""
const port: number = parseInt(process.env.SERV_PORT||"2334")
// const port: number = parseInt(process.env.SERV_PORT?process.env.SERV_PORT:"2334")
const proto = process.env.SERV_PROTO

const app = express();

app.use(express.json())

app.get('/', (req, res)=>{
    res.send('hello world')
})

app.use('/user', userRoute)

app.listen(port, path, ()=>{
    console.log(`Listening on ${proto}${path}:${port}`)
})