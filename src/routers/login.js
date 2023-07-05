const express=require('express')
const Router=express.Router()
const bcript=require('bcrypt');


Router.get('/',(req,res)=>{
    if(req.session.loggedin != true){
        res.status(200).render('../views/login');
    }else{
        res.redirect('/home');
    }
})

Router.post('/save',(req,res)=>{

    const data = req.body;
    // const pass = req.body.pass;

    req.getConnection((err,conn)=>{
        conn.query('SELECT * FROM usuario WHERE email = ?',[data.email],(err,userdata)=>{
            if(userdata.length > 0){
                userdata.forEach(element=>{
                    bcript.compare(data.pass,element.pass,(err,isMatch)=>{
                        console.log(data)
                        console.log(data.pass)
                        console.log(data.email)
                        if(!isMatch){
                            res.render('../views/login',{error:'Contraseña incorrecta'});
                        }else{
                            req.session.loggedin = true;
                            req.session.nombres = element.nombres;
                            res.redirect('/home');
                        }
                    })
                })
                
            }else{
                res.render('../views/login',{error:'El usuario no existe'});
            }
        })
    })
})
module.exports=Router