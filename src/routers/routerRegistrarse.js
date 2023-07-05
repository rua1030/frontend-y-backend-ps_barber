const express = require('express');
const Router = express.Router();
const bcrypt = require('bcrypt');

Router.get('/', (req, res) => {
    res.status(200).render('../views/registrarse');
});

Router.post('/save', async (req, res) => {
    const nombres = req.body.nombres;
    const plainPassword = req.body.pass;
    const email = req.body.email;
    const estado = 1;
    const id_Rol = 2;

    try {
        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(plainPassword, 10);

        req.getConnection((err, conn) => {
            conn.query('SELECT * FROM usuario WHERE email = ?', [email], (err, userdata) => {
                if (userdata.length > 0) {
                    res.render('../views/registrarse', { error: 'El email que intenta ingresar ya existe' });
                } else {
                    req.getConnection((err, conn) => {
                        conn.query('INSERT INTO usuario SET ?', {
                            nombres: nombres,
                            pass: hashedPassword,
                            email: email,
                            id_Rol: id_Rol,
                            estado: estado
                        }, (error) => {
                            if (error) {
                                console.log(error);
                            } else {
                                res.redirect('/login');
                            }
                        });
                    });
                }
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el registro de usuario.');
    }
});

module.exports = Router;
