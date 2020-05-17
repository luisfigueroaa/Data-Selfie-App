// npm installs with Node.Js
// npm init
// npm install express
// node index.js - to run the server

// Acceder al dependence "express"
const express = require('express');
// Importar el Dependance "NedB"
const Datastore = require('nedb');

// Create a web application
const app = express();
// Establecer un listen para que sea visible en un host(local)

app.listen(3000, () => console.log('listening at 3000'));
// Hosting un web page en una carpeta del directorio public 
app.use(express.static('public'));
// Para poder leer la información del request en formato Json
// Poner una propiedad a json es opcional
app.use(express.json({ limit: '1mb' }));

// Create a database usando nedb
const database = new Datastore('database.db');
// Crear un archivo a la memoria
database.loadDatabase();

// primero buscar (find) para encontrar la respuesta de la app
// y luego pasar (get) la data al cliente como respuesta (response)
// en una dirección que es /api
app.get('/api', (resquest, response) => {
  database.find({},(err, data) => {
      if (err) {
          response.end();
          return;
      }
      response.json(data);
  });
});

// Implementar un API para que el cliente me de su Data
app.post('/api', (request, response) => {
  console.log("Tengo un request!!!!");
  const data = request.body;
  const timestamp = Date.now();
  // Añadir una etiqueta con le fecha y hora al Database
  data.timestamp = timestamp;
  // Llenar la base de datos cada vez que se haga un request
  database.insert(data);
  // De parte del servidor enviar un estado, la latitud y la longitud, mas un aviso que ya esta listo
  response.json(data);
  // response.json({
  //     status: 'Correcto',
  //     timestamp: timestamp,
  //     latitude: data.lat,
  //     longitude: data.lon,
  //     img64: data.image64
  // })
});