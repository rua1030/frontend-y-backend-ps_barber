const express=require('express')
const Router=express.Router()
const bcript=require('bcrypt');


Router.get('/',(req,res)=>{
    if(req.session.loggedin != true){
        res.status(200).render('../views/recuperarcontra');
    }else{
        res.redirect('/login');
    }
})


module.exports = Router;