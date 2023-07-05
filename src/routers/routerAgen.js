// const express=require('express')
// const Router=express.Router()

// Router.get('/', (req, res)=>{
//     req.getConnection((err,conn) =>{
//     conn.query('SELECT * FROM horario WHERE estado = 1 ' , function(error, result, fields){
//         if(error){
//             throw error;
//         }else{
//             res.status(200).render('../views/agregarAgen', {title:result})
//         }     
//         });
//     });
      
// })

// Router.get('/create', (req, res)=>{
    
//     res.status(200).render('../views/agregarCli');
  
// })

// Router.post('/save', async (req, res)=>{

//     const fecha = req.body.fecha;
//     const hora_inicio = req.body.hora_inicio;
//     const hora_fin = req.body.hora_fin;
//     const mensaje=req.body.mensaje;
//     const estado =1;

//     req.getConnection((err,conn)=>{
//      conn.query(`INSERT INTO agenda SET ?`, { fecha:fecha,hora_inicio:hora_inicio,hora_fin:hora_fin,mensaje:mensaje,estado:estado}, function(error){
//         if(error){
//             console.log(error);
//         }else{
//             res.redirect('/agenda');
//         }     
//         });
//     })
// })

// Router.get('/eliminar/:id', (req, res)=>{
//     const id= req.params.id;
//     req.getConnection((err,conn)=>{
//     conn.query('DELETE FROM agenda WHERE id_Horario = ?', [id] , function(error){
//         if(error){
//             console.log(error)
            
//         }else{
//             res.redirect('/agenda');

//         }     
//         });
//     });
     
// })

// Router.get('/update/:id', (req, res)=>{
//     const id= parseInt(req.params.id);
    
//     req.getConnection((err,conn)=>{
//     conn.query(`SELECT fecha, hora_inicio, hora_fin, mensaje FROM agenda WHERE id_Horario='${id}'` , function(error, result){
//         if(error){
//             throw error;
//         }else{
//             res.status(200).render('../views/actualizarCli', {title:result[0]});

//         }     
//         });
//     });
          
//     })

// Router.post('/update/:id',(req, res)=>{ 
//     const id= parseInt(req.params.id);
//     const fecha = req.body.fecha;
//     const hora_inicio = req.body.hora_inicio;
//     const hora_fin = req.body.hora_fin;
//     const mensaje=req.body.mensaje;
//     const estado =0;
    
//     req.getConnection((err,conn)=>{
//     conn.query('UPDATE horario SET fecha=?, hora_inicio=?, hora_fin=?, mensaje=?, estado=? WHERE id_Horario=?', [fecha,hora_inicio,hora_fin,mensaje,estado,id], function(error, result, fields){
//     if(error){
//         console.log(error);
//     }else{
//         res.redirect('/agenda');
//     }     
//     });
// })
// })

//     Router.get('/update', (req, res)=>{
             
//         res.status(200).render('../views/actualizarCli')
         
//     })

// module.exports=Router

