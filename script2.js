// 
$(document).ready(function()
    {
    popularListaCompleta();
    renderizarProductos();
    revisarCarrito();
    mostrarTotal();
    console.log("El DOM esta listo");
    });


// --> ARRAY COMPLETO CLASES
    // Variable global:
let listaCompletaClases = [];

function popularListaCompleta() {
    listaCompletaClases.push(clase1);
    listaCompletaClases.push(clase2);
    listaCompletaClases.push(clase3);
    listaCompletaClases.push(clase4);
    listaCompletaClases.push(clase5);
    listaCompletaClases.push(clase6);
    listaCompletaClases.push(clase7);
    listaCompletaClases.push(clase8);
    listaCompletaClases.push(clase9);
    listaCompletaClases.push(clase10);
}

console.log(listaCompletaClases);

// --> FUNCION: FILTRAR CLASES POR DIA: a partir del selector muestra la clases del dia seleccionado
function ordenar() {
    let seleccion = $("#miSeleccion").val().toUpperCase();
    popularListaCompleta();
    listaCompletaClases = listaCompletaClases.filter(Clase => Clase.dia ==
        seleccion);
    renderizarProductos();
}

// --> FUNCION: mostrar reservas en tabla
    $("#btn-mireserva").click(function() {
        mostrarReservas();
        mostrarTotal();
    });

    function mostrarReservas() {
        $('#mi_modal').modal('show');
    }
    
// --> // VARIABLES GLOBALES
    let carrito = [];
    let totalClase = 300; // El precio total de las clases
    let numeroDeClases = 1; // Cantidad de clases reservadas
    const valorClase = 300; // Precio de cada clase

    let lugaresDisponibles = Clase.lugares; // Cupo de cada clases
    let lugaresRestantes = 0; // Cuantos quedan una vez que se reservan

    let porcentajeDescuento = 20; // % que se descuenta del total
    let montoDescontar = 0; // Cantidad a descontar del total 

    let totalConDescuento = totalClase - montoDescontar; // Precio total sin descuento - monto que se descuenta

// --> FUNCION: sumar al carrito
function sumarAlCarrito(){
    if (localStorage.getItem("carrito") != null) {
                    carrito = JSON.parse(localStorage.getItem("carrito"));
                    for (const _Clase of carrito) {
                        numeroDeClases = numeroDeClases + 1;
                        totalClase = valorClase * numeroDeClases;
                        console.log("El valor de las clases reservadas es de $" + totalClase);
                        }
                } else if (localStorage.getItem("carrito") == null){
                    console.log("El carrito esta vacio");
                    }
    }



// -- > FUNCION: calcular monto del descuento
    function calcularMontoDescontar(){
        montoDescontar = (porcentajeDescuento * totalClase) / 100;
        console.log("El 20% es " + montoDescontar);
    }

// --> FUNCION: aplicar descuento
    function aplicarDescuento(){
        if (numeroDeClases >= 12) {
            console.log("El total a abonar con su descuento es de " + (totalClase - montoDescontar));
        } else if (numeroDeClases <= 11) {
            console.log("Aún NO aplica el descuento, el valor total a abonar es de " + totalClase);
        }
    }


// CREAR CLASES DE FORMA DINAMICA + BOTON CARRITO + FUNCIONES
    
function renderizarProductos(){
    document.querySelectorAll(".contenedorDeClase").forEach(el => el.remove());

    for (const Clase of listaCompletaClases) {
        let contenedor = document.createElement("div");
        contenedor.classList.add("contenedorDeClase");
        //--> PLANTILLA LITERAL para mostrar las clases
        contenedor.innerHTML = `<img src="images/${Clase.imagen}.png">
                            <h3> ${Clase.disciplina}</h3>
                            <h6>  Días: ${Clase.dia}</h6>
                            <h6>  Horario: ${Clase.horario}</h6> 
                            <h6>  Lugares: ${Clase.lugares}</h6>
                            <button id=btn${Clase.id} class="mi-btn btn btn-danger addToCart">RESERVAR</button>`;
        cursosDestacados.appendChild(contenedor);
        //--> EVENTO para cada boton
        $(`#btn${Clase.id}`).on("click", function() {
                //Sumar clases al numero de clases
                sumarAlCarrito();
                //Sumar al carrito
                carrito.push(Clase);
                //Informar clase reservada
                console.log(`Reservaste ${Clase.disciplina}`);
                //Guardar en local storage
                localStorage.setItem("carrito", JSON.stringify(carrito));
                //Informar que fue reservada al usuario
                Swal.fire(
                    '¡CLASE RESERVADA!',
                    'Reservaste ' + Clase.disciplina + ' ' + Clase.dia + ' a las ' + Clase.horario,
                    'success'
                );
                //Descontar lugares    
                if (lugaresDisponibles != 0) {
                    lugaresRestantes = Clase.lugares - 1;
                    console.log("Su lugar fue reservado, quedan " + lugaresRestantes + " lugares restantes");
                 }
                //Mostrar info por consola
                console.log("El valor es de " + totalClase);
                //Calcular monto de descuento
                calcularMontoDescontar();
                //Aplicar descuento
                aplicarDescuento();
                //Crear lista de reservas en modal
                $("#listaTabla").append(
                    `<table class="table table-striped table-hover">
                        <tbody>
                            <tr class="d-flex justify-content-between align-items-bottom">
                                <td class="table text-start fs-5 fw-bold">${Clase.disciplina}</td>
                                <td class="table text-center fs-4 fw-bold"><b>${Clase.dia}</b></td>
                                <td class="table text-center fs-4 fw-bold"><b>${Clase.horario}</b></td>
                                <td class="table text-center">
                                    <button  class="btn btn-dark type="submit" id="eliminar${Clase.id}">X</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    `);
                //Mostrar por consola el total de clases reservadas
                console.log(carrito);
                //Mostrar en el modal
               
                // Mostrar total si hay clases al recargar la pagina
                
            //CIERRE
            });
            }
        
        }
// --> FUNCION: quitar un producto de la tabla               >>>>>>>>>> NO ANDA >>>>>>>>>>
   $(`#eliminar${Clase.id}`).click(function() {
        const eliminarClase = carrito.splice().find(v => v.id == `${Clase.id}`);
        const eliminarIndex = carrito.indexOf(eliminarClase);
        carrito.splice(eliminarIndex, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        //mostrarTotal();
    })

// --> FUNCION: vaciar carrito del modal

    $("#botonVaciar").click (function () {
        vaciarCarrito();
    });

    function vaciarCarrito(){
        $("#listaTabla").html (``);
        $("#resultadoTabla").html (``);
        
        carrito = []
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }
  
// --> FUNCION: si hay reservas las muestro en el modal
    //Variable
   let carrito2 = JSON.parse(localStorage.getItem('carrito'));

    function revisarCarrito(){
        if(carrito2){
            carrito2.forEach(Clase=>{
                $("#listaTabla").append(
                    `<table class="table table-striped table-hover">
                        <tbody>
                            <tr class="d-flex justify-content-between align-items-bottom">
                                <td class="table text-center fs-5 fw-bold">${Clase.disciplina}</td>
                                <td class="table text-center fs-4 fw-bold"><b>${Clase.dia}</b></td>
                                <td class="table text-center fs-4 fw-bold"><b>${Clase.horario} Hs.</b></td>
                                <td class="table text-center">
                                    <button  class="btn btn-dark type="submit" id="eliminar${Clase.id}">X</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>`
                );
            })
        } 
    }
        
// --> FUNCION: mostrar total en el modal
function mostrarTotal(){
    if(localStorage.getItem("carrito") != null){
        if (numeroDeClases >= 12) {
            $("#resultadoTabla").empty().append("<h2>El total a abonar con su descuento es de <b>$" + totalConDescuento + "</b>.</h2>");
        } else if (numeroDeClases <= 11){
            $("#resultadoTabla").empty().append("<h2> Aún NO aplica el descuento, el valor total a abonar es de $" + totalClase + ".</h2>");
        }/* else if (carrito.length === 0 ){
            $("#resultadoTabla") = html (``);
        }*/
    } 
}


    
