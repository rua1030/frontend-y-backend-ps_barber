const express=require('express')
const Router=express.Router()
const bcrypt = require('bcrypt');

Router.get('/', (req, res)=>{
    req.getConnection((err,conn) =>{
    conn.query('SELECT * FROM usuario WHERE 1' , function(error, result, fields){
        if(error){
            throw error;
        }else{
            res.status(200).render('../views/listarUsu', {title:result})
        }     
        });
    });
      
})

Router.get('/create', (req, res)=>{
    
    res.status(200).render('../views/agregarUsu');
  
})

Router.post('/save', async (req, res) => {
    const nombres = req.body.nombres;
    const rawPassword = req.body.pass; // Contraseña sin encriptar
    const email = req.body.email;
    const id_Rol = req.body.id_Rol;
    const estado = 1;
  
    try {
      const hashedPassword = await bcrypt.hash(rawPassword, 10); // Encripta la contraseña usando bcrypt
  
      req.getConnection((err, conn) => {
        conn.query('INSERT INTO usuario SET ?', { nombres, pass: hashedPassword, email, id_Rol, estado }, function (error) {
          if (error) {
            console.log(error);
          } else {
            res.redirect('/usuarios');
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  });

Router.get('/eliminar/:id', (req, res)=>{
    const id= req.params.id;
    req.getConnection((err,conn)=>{
    conn.query('DELETE FROM usuario WHERE id_Usuario = ?', [id] , function(error){
        if(error){
            console.log(error)
            
        }else{
            res.redirect('/usuarios');

        }     
        });
    });
     
})

Router.get('/update/:id', (req, res)=>{
    const id= parseInt(req.params.id);
    
    req.getConnection((err,conn)=>{
    conn.query(`SELECT nombres, pass, email FROM usuario WHERE id_usuario='${id}'` , function(error, result){
        if(error){
            throw error;
        }else{
            res.status(200).render('../views/actualizarUsu', {title:result[0]});

        }     
        });
    });
          
    })

    Router.post('/update/:id', async (req, res) => {
        const id = parseInt(req.params.id);
        const nombres = req.body.nombres;
        const rawPassword = req.body.pass; // Contraseña sin encriptar
        const email = req.body.email;
      
        try {
          const hashedPassword = await bcrypt.hash(rawPassword, 10); // Encripta la contraseña usando bcrypt
      
          req.getConnection((err, conn) => {
            conn.query(
              'UPDATE usuario SET nombres=?, pass=?, email=? WHERE id_usuario=?',
              [nombres, hashedPassword, email, id],
              function (error, result, fields) {
                if (error) {
                  console.log(error);
                } else {
                  res.redirect('/usuarios');
                }
              }
            );
          });
        } catch (error) {
          console.log(error);
        }
      });
      
    Router.get('/update', (req, res)=>{
             
        res.status(200).render('../views/actualizarUsu')
         
    })
module.exports=Router;