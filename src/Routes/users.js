const { Router } = require('express');
const router = new Router();
const conn = require('D:/Proyecto BBDD2/proyecto-BBDD2/src/Config/DatabaseConfig');

router.get('/', (req, res) => {
    const sql = 'SELECT * FROM Usuarios';

    conn.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send('Not result');
    }
    });
});
/*LogIn*/
router.get('/login/:id/:password', (req, res) => {
    const { id } = req.params;
    const { password } = req.params;
   
    const sql = `SELECT * FROM Usuarios WHERE id_user = ${id} AND password_user = ${password}`;
    conn.query(sql, (error, result) => {
      if (error) throw error;
  
      if (result.length > 0) {
        res.json({"acceso": true});
      } else {
        res.json({"acceso": false});
      }
    });
});

router.post('/signIn', (req, res) => {
    const sql = 'INSERT INTO Usuarios SET ?';
  
    const userObj = {
      id_user: req.body.cedula,
      email: req.body.email,
      password_user: req.body.contraseña,
    };
    
    // Aqui poner las verificaciones
    
    conn.query(sql, userObj, error => {
      if (error) throw error;
      res.send('Usuario creado!');
    });
});

router.delete('/delete/:id/:password', (req, res) => {
    const { id, password } = req.params;
    const sql = `DELETE FROM Usuarios WHERE id_user = '${id}' AND password = '${password}'`;
  
    conn.query(sql, error => {
      if (error) throw error;
      res.send('Usuario Eliminado');
    });
  });

router.put('/update/:id/:password', (req, res) => {
    const { id, password } = req.params;
    const {email,contraseña} = req.body;
      const sql = 'UPDATE Usuarios SET '  +
      `email='${email}',` + 
      `password_user='${contraseña}'` +
      ` WHERE id_user = '${id}' AND password_user = '${password}'`;
  
    conn.query(sql, error => {
      if (error) throw error;
      res.send('Worker updated!');
    });
});

module.exports = router;