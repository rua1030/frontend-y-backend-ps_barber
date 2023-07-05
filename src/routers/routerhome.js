const express = require('express');
const Router = express.Router();

Router.get('/', (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('SELECT COUNT(*) as total FROM venta', function (error, resultVentas, fields) {
      if (error) {
        throw error;
      } else {
        conn.query('SELECT COUNT(*) as total FROM usuario', function (error, resultUsuarios, fields) {
          if (error) {
            throw error;
          } else {
            conn.query('SELECT SUM(total) as total FROM venta', function (error, resultSuma, fields) {
              if (error) {
                throw error;
              } else {
                res.status(200).render('../views/home', { title: resultVentas[0].total, usuario: resultUsuarios[0].total, sumaTotal: resultSuma[0].total });
              }
            });
          }
        });
      }
    });
  });
});

module.exports = Router;
