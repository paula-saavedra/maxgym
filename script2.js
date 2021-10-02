// 
$(document).ready(function()
    {
    popularListaCompleta();
    renderizarProductos();
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
const ordenar = () => {
    let seleccion = $("#miSeleccion").val().toUpperCase();
    popularListaCompleta();
    listaCompletaClases = listaCompletaClases.filter(Clase => Clase.dia ==
        seleccion);
    renderizarProductos();
}

// --> FUNCION: mostrar reservas en tabla
    $("#btn-mireserva").click(function() {
        mostrarReservas();
    });

    const mostrarReservas =()=>{
        $('#mi_modal').modal('show');
    }

    
// --> FUNCION: sumar al carrito
    // Variables globales:
    let carrito = [];
    let totalClase = 300;
    let numeroDeClases = 1;
    const valorClase = 300;

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

// CREAR CLASES DE FORMA DINAMICA + BOTON CARRITO + FUNCIONES
    //Variables globales

    let lugaresDisponibles = Clase.lugares;
    let lugaresRestantes = 0;

    let totalConDescuento = 0;

    let porcentajeDescuento = 20;
    let montoDescontar = 0;

const renderizarProductos = () => {
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
                console.log("Reservo " + numeroDeClases + " clases");
                console.log("El valor es de " + totalClase);
                
                //Calcular monto de descuento
                montoDescontar = (porcentajeDescuento * totalClase) / 100;
                console.log("El 20% es " + montoDescontar);
                //Aplicar descuento
               if (numeroDeClases >= 12) {
                    totalConDescuento = console.log("El total a abonar con su descuento es de " + totalConDescuento);
                } else if (numeroDeClases <= 11) {
                    console.log("Aún NO aplica el descuento, el valor total a abonar es de " + totalClase);
                }
                //Crear lista de reservas en modal
                $("#listaTabla").html(``);
                    for (const _clase of carrito){
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
                    };
                
                //Mostrar por consola el total de clases reservadas
                console.log(carrito);
            });
            }
        
        }

// --> FUNCION: quitar un producto de la tabla               >>>>>>>>>> NO ANDA >>>>>>>>>>
  /*  $(`#eliminar${Clase.id}`).click(function() {
        const elimProd = carrito.splice().find(v => v.id == `${Clase.id}`);
        const elimIndex = carrito.indexOf(elimProd);
        carrito.splice(elimIndex, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));
    })*/

// --> FUNCION: vaciar carrito del modal

    $("#botonVaciar").click (function () {
        vaciarCarrito();
    });

    function vaciarCarrito(){
        $("#listaTabla").html (``);
        carrito = []
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }
  
    
    
