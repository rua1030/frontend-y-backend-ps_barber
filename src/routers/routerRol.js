const express = require('express');
const Router = express.Router();


Router.get('/', (req, res)=>{
    req.getConnection((err,conn) =>{
    conn.query('SELECT * FROM rol WHERE 1' , function(error, result, fields){
        if(error){
            throw error;
        }else{
            res.status(200).render('../views/listarRol', {title:result})
        }     
        });
    });
      
})


Router.get('/create', (req, res)=>{
    
    res.status(200).render('../views/agregarRol');
  
})

Router.post('/save', async (req, res)=>{

    const nombre = req.body.nombre;
    const estado = 1;

    req.getConnection((err,conn)=>{
     conn.query(`INSERT INTO cliente SET ?`, { nombre: nombre, telefono: telefono, documento: documento, email: email, estado:estado}, function(error){
        if(error){
            console.log(error);
        }else{
            res.redirect('/cliente');
        }     
        });
    })
})
module.exports=Router