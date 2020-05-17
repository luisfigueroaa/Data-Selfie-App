getData();

const selfies = [];

// Crear eventos para erdenar la data por hora o nombre

document.getElementById('time').addEventListener('click', event => {
  sortData((a, b) => b.time - a.time)
});

document.getElementById('nombre').addEventListener('click', event => {
  sortData((a, b) => {
    if (b.nombre > a.nombre) return -1;
    else return 1;
  });
});

function sortData(compare) {
  for (let item of selfies) {
    item.elt.remove();
  }
  selfies.sort(compare);
  for (let item of selfies) {
    document.body.append(item.elt);
  }
}

async function getData() {
  const response = await fetch('/api');
  const data = await response.json();

  // Para cada item de toda la data extraer su valor, transformarlo a string y
  // crear un elemento div para colocar ahi dentro el valor en string
  for (item of data) {
    const root = document.createElement('p');
    const nombre = document.createElement('div');
    const geo = document.createElement('div');
    const date = document.createElement('div');
    const clima = document.createElement('div');
    const image = document.createElement('img');
    const city = document.createElement('div');
                
    const api_key = "e7cb8757438b311ec7c9cebbd36ab7c0";
    const api_url = `http://api.openweathermap.org/data/2.5/weather?lat=${item.lat}&lon=${item.lon}&appid=${api_key}`;
    const response = await fetch(api_url);
    const json = await response.json();
    console.log(json);

    nombre.textContent = `Nombre: ${item.nombre}`;
    geo.textContent = `Coord.: ${item.lat}° , ${item.lon}°`;
    // convertir el valor generado en timestamp y transformarlo en una string mas legible
    const dateString = new Date(item.timestamp).toLocaleString();
    date.textContent = dateString;
    clima.textContent = `Clima: ${json.main.temp - 273.15}°`;
    image.src = item.image64;
    city.textContent = `Ciudad: ${json.name}`;

    // colocar dentro del root los valores de nombre, geo y date
    // que ya cree como elementos del html
    root.append(nombre, city, geo, date, clima, image);

    selfies.push({ elt: root, time: item.timestamp, nombre: item.nombre });
    document.body.append(root);
  }
  console.log(data);
}