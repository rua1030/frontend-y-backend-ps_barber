const express=require('express')
const Router=express.Router()



Router.get('/', (req, res)=>{
    req.getConnection((err,conn) =>{
    conn.query('SELECT * FROM cliente WHERE 1',function(error, result, fields){
        if(error){
            throw error;
        }else{
            res.status(200).render('../views/listarCli', {title:result})
        }     
        });
    });
        
})

Router.get('/create', (req, res)=>{
    
    res.status(200).render('../views/agregarCli');
  
})

Router.post('/save', async (req, res)=>{

    const documento = req.body.documento;
    const nombre = req.body.nombre;
    const telefono = req.body.telefono;
    const email=req.body.email;
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

Router.get('/eliminar/:id', (req, res)=>{
    const id= req.params.id;
    req.getConnection((err,conn)=>{
    conn.query('DELETE FROM cliente WHERE id_Cliente = ?', [id] , function(error){
        if(error){
            console.log(error)
            
        }else{
            res.redirect('/cliente');

        }     
        });
    });
     
})

Router.get('/update/:id', (req, res)=>{
    const id= parseInt(req.params.id);
    
    req.getConnection((err,conn)=>{
    conn.query(`SELECT nombre, telefono, documento, email FROM cliente WHERE id_Cliente='${id}'` , function(error, result){
        if(error){
            throw error;
        }else{
            res.status(200).render('../views/actualizarCli', {title:result[0]});

        }     
        });
    });
          
    })

Router.post('/update/:id',(req, res)=>{ 
    const id= parseInt(req.params.id);
    const nombre = req.body.nombre;
    const telefono = req.body.telefono;
    const documento = req.body.documento;
    const email=req.body.email;   
    
    req.getConnection((err,conn)=>{
    conn.query('UPDATE cliente SET nombre=?, telefono=?, documento=?, email=? WHERE id_Cliente=?', [nombre, telefono, documento, email, id], function(error, result, fields){
    if(error){
        console.log(error);
    }else{
        res.redirect('/cliente');
    }     
    });
})
})

    Router.get('/update', (req, res)=>{
             
        res.status(200).render('../views/actualizarCli')
         
    })

    Router.get('/info/:id',(req,res)=>{
        const id = parseInt(req.params.id);
        req.getConnection((err,conn)=>{
            conn.query('SELECT v.fecha, v.total, cl.nombre, cl.documento FROM venta v INNER JOIN cliente cl on cl.id_Cliente = v.id_Cliente WHERE cl.id_Cliente = ?', [id], function(error,result,fields){
                if(error){
                    console.log(error);
                }else{
                    res.render('../views/infoCli', {title:result});
                }
            })
        })
    })
    
module.exports=Router;