const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 5000;

// Configuración de CORS
app.use(cors());
app.use(express.json());

// Configuración de la conexión a MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root', // Pon aquí tu contraseña de MySQL
  database: 'prueba_react', // Reemplaza con tu nombre de base de datos
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos: ' + err.stack);
    return;
  }
  console.log('Conexión a la base de datos establecida.');
});

// Ejemplo de ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Servidor backend en funcionamiento!');
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}`);
});
