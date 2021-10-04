//Variable profesores global
let productos = [];

$(document).ready(function () {
  obtenerJsonProfesores();
  obtenerClima();
  $("#seccionProfesores").hide();
  $("#seccionProfesores").fadeIn(1500);
});

function obtenerJsonProfesores() {
  //GETJSON
  const URLJSON = "profesores.json";
  $.getJSON(URLJSON, function (respuesta, estado) {
    if (estado == "success") {
      profesores = respuesta.staff;
      console.log(profesores);
      renderizarProfesores();
    }
  });
}

function renderizarProfesores() {
  for (const profesor of profesores) {
    $("#seccionProfesores").append(`
    <div class="miscards card"  id="profesor-${profesor.id}" style="width: 18rem;">
      <img class="card-img-top cardimg" src="images/${profesor.foto}" alt="Card image cap">
      <div class="card-body" id="body-${profesor.id}" >
        <h5 class="micard-title card-title"><b>${profesor.nombre}</b> <br> ${profesor.disciplina}</h5>
        <p class="card-text">${profesor.info}</p>
        <a href="${profesor.link}" target:"_blank" class="btn btn-primary">¡SEGUIR!</a>
      </div>
    </div>
         `);
  }
}
// --> FUNCION Agregar animacion

  
  

// --> API CLIMA
const URLClima =
  "https://api.open-meteo.com/v1/forecast?latitude=-34.6118&longitude=-58.4173&current_weather=true&timezone=America/Argentina/Buenos_Aires";

//Variables
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

// --> FUNCION para mostrar el clima
function obtenerClima() {
  $.ajax(URLClima).done(function (response) {
    let hora = new Date();
    let dataTemp = response.current_weather.temperature;
    let dataWind = response.current_weather.windspeed;
    let dataCode = response.current_weather.weathercode;

    $("#sectionPronostico").append(
      `<p>
        <span>
          <b>HORA:</b> ${hora.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
        <span>
        <b>CLIMA:</b> ${codes[dataCode]}
        </span>
              <span><b>TEMPERATURA:</b> ${dataTemp}°</span>
              <span><b>VIENTO:</b> ${dataWind} km/h</span>
            </p>`
    );
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
}*/
