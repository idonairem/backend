const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 5000;

// Habilitar CORS para permitir solicitudes desde el frontend
app.use(cors());

// Configura el middleware para parsear las solicitudes JSON
app.use(express.json());

// Crear conexión con la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',           // tu usuario de MySQL
  password: 'root',           // tu contraseña de MySQL
  database: 'pruebabd'    // el nombre de tu base de datos
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos: ' + err.stack);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

// Ruta para obtener todos los usuarios
app.get('/usuarios', (req, res) => {
  db.query('SELECT * FROM usuarios', (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
    res.json(result);
  });
});

// Ruta para insertar un nuevo usuario
app.post('/api/usuarios', (req, res) => {
    const { nombre, correo } = req.body;
    const sql = `INSERT INTO usuarios (nombre, correo) VALUES ('${nombre}', '${correo}')`;
    
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al agregar usuario:', err);
        res.status(500).send('Error al agregar usuario');
      } else {
        res.status(201).send('Usuario agregado correctamente');
      }
    });
  });
  

// Iniciar el servidor en el puerto 5000
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
