import { Router } from "express";
import { UserRepositories } from "../repository/user_repos";
import { UserData } from "../data/user_data";
import { User } from "../data/user_data";
import errorHandler from "../util/error_handler"
import crypto from 'crypto';

const route = Router()
const user_data = new UserData()
const connection = user_data.db.getConnection()


route.post('/login', (req, res, next)=>{
    const {username, password} = req.body
    connection.serialize(async ()=>{
        try {
            const uid = await user_data.login(username, password)
            const user = await user_data.getByUid(uid)
            res.json(user[0])
        } catch (error) {
            next(errorHandler(res, error as Record<any, any>))
        }
    })
})

route.post('/register', (req, res, next)=>{
    const reqbody = req.body
    const passwd = crypto.createHash('sha256').update(reqbody.password).digest('hex')
    const user = User.fromJson({...reqbody, password: passwd})
    connection.serialize(async ()=>{
        try{
            const createres = await user_data.createOne(user)
            res.json(createres)
        } catch (error){
            next(errorHandler(res, error as Record<any, any>))
        }
    })
})

export default route