import { Router } from "express";
import { UserRepositories } from "../repository/user_repos";
import { UserData } from "../data/user_data";

const route = Router()
const user_data = new UserData()

route.post('/login', (req,res)=>{
    const {username, password} = req.body
    user_data.db.getConnection().serialize(async ()=>{
        const uid = await user_data.login(username, password)
        const user = await user_data.getByUid(uid)
        console.log(user)
    })
})

export default route