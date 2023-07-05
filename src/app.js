const express = require('express');
const responsiApi = require('./routers');
const bodyParser = require('body-parser');
const myconnection = require('express-myconnection');
const mysql = require('mysql');
const hbs = require('hbs');
const path = require('path');
const session =require('express-session');


const app = express();
app.set('port',4000);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static('assets'))
app.use(express.static(path.join(__dirname,'assets')))

app.use(myconnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'psbarber'
},'single'))

app.use(session({

    secret:'secret',
    resave: true,
    saveUninitialized:true
    
}))

hbs.registerPartials(__dirname + '/views', function (err) {});
app.set('view engine','hbs')
app.set('views', __dirname +'/views')

responsiApi(app);

app.listen(app.get('port'),()=>{
    console.log('Listening on port', app.get('port')); 
});

app.get('/',(req,res)=>{
    res.sendFile('views/index.html',{
        root:__dirname
    })
})