const express = require('express');
const app = express();
app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
// Para poder leer la información del request en formato Json
// Poner una propiedad a json es opcional
app.use(express.json({ limit: '1mb' }));

// Implementar un API para que el cliente me pida Data
app.post('/api', (request, response) => {
    console.log("Tengo un request!!!!");
    console.log(request.body);
    const data = request.body;
    response.json({
        status: 'Terminado',
        latitude: data.lat,
        longitude: data.lng
    })
});