const { readFile } = require("fs");

const root = document.querySelector('.root');
const isLogged = sessionStorage.setItem()

if(isLogged){
    const loginPage = fetch('p_login.html').then((res)=>{
        if (res.ok){
            return res.text();
        }
        throw res;
    }).then(function (text) {
        console.log(text);
    })
}