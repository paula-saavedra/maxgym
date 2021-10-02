//Variable profesores global
let productos = [];

$(document).ready(function () {
  //asincronia
  obtenerJsonProductos();
  //cambios en el DOM
  $("#sectionPronostico").css({ background: "red", color: "white" });
  //OBTENER CLIMA
  obtenerClima();
  //DEPORTES
  //obtenerCityBikes();

  obtenerDatos();
});

const obtenerJsonProductos = () => {
  //GETJSON
  const URLJSON = "profesores.json";
  $.getJSON(URLJSON, function (respuesta, estado) {
    if (estado == "success") {
      productos = respuesta.stock;
      console.log(productos);
      renderizarProfesores();
    }
  });
};

const renderizarProfesores = () => {
  for (const producto of productos) {
    $("#seccionProfesores").append(`<li class="list-group-item">
        <h3> ID: ${producto.id}</h3>
        <img src=${producto.foto} width="50" height="50">
        <p> Producto: ${producto.nombre}</p>
        <p> Precio $ ${producto.precio}</p>
        <button class='btn btn-danger' id='btn${producto.id}'>Comprar</button>
        </li>`);
    //Evento para cada boton
    $(`#btn${producto.id}`).on("click", function () {
      //agregar el objeto al carrito
      //mensaje de confirmacion
      console.log(`Compraste ${producto.nombre}`);
    });
  }
};

//API CLIMA
//para obtener un JSON con una lista de objetos que se usan generando variables que se agregan al contenedor
const URLClima =
  "https://api.open-meteo.com/v1/forecast?latitude=-34.6118&longitude=-58.4173&current_weather=true&timezone=America/Argentina/Buenos_Aires";

const codes = {
  0: "Despejado",
  1: "Mayormente despejado",
  2: "Parcialmente nublado",
  3: "Cubierto",
  51: "Llovizna ligera",
  52: "Llovizna moderada",
  53: "Llovizna intensa",
  61: "Lluvia ligera",
  53: "Lluvia moderada",
  53: "Lluvia intensa",
  80: "Tormenta ligera",
  81: "Tormenta intermedia",
  82: "Tormenta fuerte",
};

const obtenerClima = () => {
  $.ajax(URLClima).done(function (response) {
    let hora = new Date();
    let dataTemp = response.current_weather.temperature;
    let dataWind = response.current_weather.windspeed;
    let dataCode = response.current_weather.weathercode;

    $("#sectionPronostico").append(
      `<p>Hora: ${hora.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })}</p>
            <p>Clima: ${codes[dataCode]}</p>
            <p>Temperatura: ${dataTemp}°</p>
            <p>Viento: ${dataWind} km/h</p>`
    );
  });
};
//API DEPORTES

//GET
function obtenerDatos() {
    const URL = "https://api.itbook.store/1.0/new";
    $.get(URL).done(function(resultado, estado) {
        console.log("Estado que retorna la API de libros: " + estado);
        if (estado == "success") {
            let libros = resultado.books;
            libros.forEach(libro => {
                $("#libros").append("<tr><td>" + libro.title + "</td><td><img src=" + libro.image + "></td></tr>");
            });
        }
    });
}

//POST
function agregarDatos() {
    let objetoJson = {
        "userId": 1,
        "id": 617,
        "title": "Prueba",
        "body": "cualquier cosa"
    }
    const URLPOST = "https://jsonplaceholder.typicode.com/posts"

    $.post(URLPOST, objetoJson).done(function(data, estado) {
        //lo que retorna 
        console.log("Estado jsonPlace: " + estado);
        console.log("Data de retorno: " + JSON.stringify(data));
    });
}
/*
function obtenerCityBikes() {
    const URLdeportes = "http://api.citybik.es/v2/networks?fields=id,name,href";
    $.get(URLdeportes).done(function(resultado, estado) {
        console.log("Estado que retorna la API de City Bikes: " + estado);
        if (estado == "success") {
            let ciudades = resultado.stations;
            ciudades.forEach(_ciudad => {
                $("#sectionDeportes").append("<tr><td>" + ciudades.id + "</td><td>" + ciudades.name + "</td></tr>"); 
            });
        }
    });
}

*/