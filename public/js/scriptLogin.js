document.addEventListener("DOMContentLoaded", function() {
    // Encuentra el div por su ID
    var divParaOcultar = document.getElementById("divRegistro");
    // Oculta el div cambiando su estilo display a 'none'
    divParaOcultar.style.display = 'none';

    var boton = document.getElementById("MostrarRegistro");

    // Añade un event listener para el evento 'click'
    boton.addEventListener("click", function(event) {
        // Previene el comportamiento predeterminado del botón, en este caso, la recarga de la página
        event.preventDefault();

        // Coloca aquí la lógica que quieras ejecutar cuando se haga clic en el botón
        console.log("Clic en el botón sin recargar la página");
    });

    const radios = document.querySelectorAll('.form-group input[type="radio"]');

    radios.forEach(radio => {
        radio.addEventListener('change', (event) => {
            if(event.target.checked) {
                // Imprime el valor del botón de radio seleccionado
                console.log(event.target.value);
            }
        });
    });

  });
  

  function mostrarRegistro(){
    
    var divParaOcultar = document.getElementById("divRegistro"); 
    divParaOcultar.style.display = 'block';
  }