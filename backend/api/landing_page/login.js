const express = require('express');
const jwt = require('jsonwebtoken');
var fs = require('fs');

const privatekey = fs.readFileSync('key/key-id.key');

const router = express.Router();

function validatingLogin(username, password){
    console.log(username=="Test")
    console.log(password=="testpass123")
    return username=="Test" && password=="testpass123"
}

const loginHandler = (req,res) => {
    const {username, password} = req.body;
    var isValid = false;
    isValid = validatingLogin(username, password);
    console.log(isValid)
    if (isValid){
        var token = jwt.sign({ uid: '465d0948218e7dfc4e17d5a261dd9e096f62b155' }, privatekey, { algorithm: 'RS256', expiresIn: '10s' })
        
        res.json({
            sessionID: token,
        })
    } else {
        console.log('username password mismatch')
    }
} 

router.post('/', express.json(), loginHandler)

module.exports = router;