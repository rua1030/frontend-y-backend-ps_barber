const express=require('express')
const Router=express.Router()

Router.get('/',(req,res)=>{
    if(req.session.loggedin == true){
        req.session.destroy();
    }
    res.redirect('/login')})

module.exports=Router