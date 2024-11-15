const {faker} = require('@faker-js/faker')
const User = require('../class/user')

class UserData{
    constructor(){
        this.res = []
        for (var i=0;i<=10;i++){
            this.createOne({
                'uid': i,
                'username': faker.internet.username(),
                'password': faker.internet.password(),
                'firstname': faker.person.firstName(),
                'lastname': faker.person.lastName(),
                'createdAt': faker.date.recent(),
                'updatedAt': faker.date.future(),  
            })
        }
    }

    getAll(){
        return this.res
    }

    getOne(uid){
        const res = this.res.filter(v=>v.uid==uid)
        return res
    }

    createOne(json){
        this.res.push(User.fromJson(json))
        return json
    }
    
    updateOne(uid, changes){
        const updidx = this.res.findIndex((v)=>v.uid==uid);
        this.res[updidx] = changes;
        return {...this.res[updidx]}
    }

    deleteOne(uid){
        const delidx = this.res.findIndex((v)=>v.uid == uid)
        const deltd = this.res.splice(delidx,1);
        return {...deltd[0]}
    }
}

module.exports = UserData