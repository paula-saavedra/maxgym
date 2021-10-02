// Agregar evento
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("formulario").addEventListener('submit', validarFormulario); 
  });

// --> FUNCION: validar formulario
  function validarFormulario(evento) {
    evento.preventDefault();
    //Validar ingresar nombre y apellido
    var nombre = document.getElementById("campoNombre").value;
    if(nombre.length == 0) {
        Swal.fire({
            icon: 'error',
            title: 'OOPS...',
            text: 'Debes ingresar tu nombre y apellido',
          })
      return;
    }
    //Validar Ingresar mail
    let mail = document.getElementById("campoMail").value;
    function validarEmail(mail) {
            // Condicion para verificar mail sacada de: https://es.stackoverflow.com/questions/142/validar-un-email-en-javascript-que-acepte-todos-los-caracteres-latinos
            if (/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(mail)){
                Swal.fire(
                    'SUSCRIPCIÓN EXITOSA',
                    'Pronto resiviras todas nuestras novedades',
                    'success'
                  )
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'OOPS...',
                    text: 'Debes ingresar tu mail',
                  });
            }
          }
    validarEmail(mail);
    this.submit();
  }
  
// --> FUNCION: guardar datos del formulario en el local storage
  // Variable
  let datosFormulario = []

  