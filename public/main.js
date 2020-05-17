function setup() {
    let lat, lon;
    // Añadir un evento asincrono que vaya llenando la data por parte del cliente
    // latitude, longitud y su nombre
    const button = document.getElementById('submit');
    button.addEventListener('click', async event => {
      const nombre = document.getElementById('nombre').value;
      // El elemento del video carga sus pixeles en un canvas;
      video.loadPixels();
      // Toma el canvas y convertirlo en una codificación base64
      const image64 = video.canvas.toDataURL();
      const data = { lat, lon, nombre, image64 };
      // Options fermite a fetch poder buscar desde una api de jsnode con un formato
      // transformado de jsnode a string de la data
      const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };
      const response = await fetch('/api', options);
      // Extraer el json de la respuesta de fetch
      const json = await response.json();
      console.log(json);
    });
    // Poner la latitud y longitud en el html
    if ('geolocation' in navigator) {
        console.log('geolocation available');
        navigator.geolocation.getCurrentPosition(async position => {
          lat = position.coords.latitude;
          lon = position.coords.longitude;
          document.getElementById('latitude').textContent = lat;
          document.getElementById('longitude').textContent = lon;
        });
    } else {
        console.log('geolocation not available');
    }

    noCanvas();
    const video = createCapture(VIDEO);
    video.size(160, 120);
  }