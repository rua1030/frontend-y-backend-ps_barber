const express=require('express')
const Router=express.Router()

Router.get('/', (req, res)=>{
    req.getConnection((err,conn) =>{
    conn.query('SELECT * FROM venta WHERE 1' , function(error, result, fields){
        if(error){
            throw error;
        }else{
            res.status(200).render('../views/listarVen', {title:result})
        }     
        });
    });
      
})

Router.get('/create', (req, res)=>{
    
    res.status(200).render('../views/agregarVen');
  
})

Router.post('/save', async (req, res)=>{

    const fecha = req.body.fecha;
    const total = req.body.total;
    const id_Cliente= req.body.id_Cliente;
    const estado = 1;

    req.getConnection((err,conn)=>{
     conn.query(`INSERT INTO venta SET ?`, { fecha: fecha, total: total,id_Cliente:id_Cliente, estado:estado}, function(error){
        if(error){
            console.log(error);
        }else{
            res.redirect('/ventas');
        }     
        });
    })
})

Router.get('/eliminar/:id', (req, res)=>{
    const id= req.params.id;
    req.getConnection((err,conn)=>{
    conn.query('DELETE FROM venta WHERE id_venta = ?', [id] , function(error){
        if(error){
            console.log(error)
            
        }else{
            res.redirect('/ventas');

        }     
        });
    });
     
})

Router.get('/update/:id', (req, res)=>{
    const id= parseInt(req.params.id);
    
    req.getConnection((err,conn)=>{
    conn.query(`SELECT fecha, total, id_Cliente FROM venta WHERE id_venta='${id}'` , function(error, result){
        if(error){
            throw error;
        }else{
            res.status(200).render('../views/actualizarVen', {title:result[0]});

        }     
        });
    });
          
    })

Router.post('/update/:id',(req, res)=>{ 

    const id= parseInt(req.params.id);
    const fecha = req.body.fecha;
    const total = req.body.total; 
    req.getConnection((err,conn)=>{
    conn.query('UPDATE venta SET fecha=?, total=? WHERE id_Venta=?', [fecha, total,id], function(error, result, fields){
    if(error){
        console.log(error);
    }else{
        res.redirect('/ventas');
    }     
    });
})
})

    Router.get('/update', (req, res)=>{
             
        res.status(200).render('../views/actualizarVen')
         
    })

    Router.get('/info/:id',(req,res)=>{
        const id = parseInt(req.params.id);
        req.getConnection((err,conn)=>{
            conn.query('SELECT v.fecha, v.total, cl.nombre, cl.documento FROM venta v INNER JOIN cliente cl on cl.id_Cliente = v.id_Cliente WHERE v.id_Venta = ?', [id], function(error,result,fields){
                if(error){
                    console.log(error);
                }else{
                    res.render('../views/infoVen', {title:result});
                }
            })
        })
    })
module.exports=Router;