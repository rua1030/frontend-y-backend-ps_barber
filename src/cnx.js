const cnx = require('mysql');

const conexion = cnx.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        port: 3306,
        database: 'psbarber'
})

const conectar = () =>{
    conexion.connect(err =>{
        if (err) throw err
        console.log('conectado a la DB')
    })
}

module.exports = {conectar}