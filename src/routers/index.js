
const resclient = require('./routerCliente');
const resUsuario = require('./routerUsuario');
const resRegistrar = require('./routerRegistrarse');
const resVenta = require('./routerVentas')
const reslogin = require('./login')
const reslogout = require('./logout')
const reshome = require('./routerhome')
const resrol = require('./routerRol')
// const resAgenda = require('./routerAgen')
const resRecu = require('./recuperarCon')
const resPer = require('./routerPerfil')


function responseApi(app){
app.use('/registrar', resRegistrar);
app.use('/cliente', resclient);
app.use('/usuarios', resUsuario);
app.use('/ventas', resVenta);
app.use('/login',reslogin)
app.use('/logout',reslogout)
app.use('/home',reshome)
app.use('/rol',resrol)
// app.use('/agenda',resAgenda)
app.use('/recuperarCon',resRecu)
app.use('/perfil',resPer)


}




module.exports = responseApi;