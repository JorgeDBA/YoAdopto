// Función que se ejecuta al cargar la pagina y hace el fetch a la base de datos 
document.addEventListener("DOMContentLoaded", function() {
fetch('/datos')
    .then(response => response.json())
    .then(data => {
        // Mostrar los datos en el elemento con id 'datos'
        alert("Cargando datos desde la BD JSON");
        document.getElementById('presentacionFirulais').innerText = data.Firulais[0].Presentacion;
        document.getElementById('ubicacionFirulais').innerText = data.Firulais[0].Ubicacion;

       document.getElementById('presentacionRocky').innerText = data.Rocky[0].Presentacion;
       document.getElementById('ubicacionRocky').innerText = data.Rocky[0].Ubicacion;

       document.getElementById('presentacionMinnie').innerText = data.Minnie[0].Presentacion;
       document.getElementById('ubicacionMinnie').innerText = data.Minnie[0].Ubicacion;
       
    })
    .catch(error => console.error('Error:', error));
});



function Selecionar_Div1() {
    // Imprime el ID del div clickeado
    console.log("Div seleccionado: 1" );
    document.getElementById("identificadorMascota").innerText="Cuidados de Firulais♥";
    document.getElementById("valorMascota").innerText="$10,00";
    document.getElementById("valorMascotaTotal").innerText="$15,99";
    document.getElementById("div1").style.backgroundColor = 'rgba(66, 107, 31, 0.62)';
    document.getElementById("div2").style.backgroundColor = '#FAFAF5'
    document.getElementById("div3").style.backgroundColor = '#FAFAF5'

    

}
function Selecionar_Div2() {
    // Imprime el ID del div clickeado
    console.log("Div seleccionado: 2" );
    document.getElementById("identificadorMascota").innerText="Cuidados de Rocky♥";
    document.getElementById("valorMascota").innerText="$12,00";
    document.getElementById("valorMascotaTotal").innerText="$17,99";
    document.getElementById("div2").style.backgroundColor = 'rgba(66, 107, 31, 0.62)';
    document.getElementById("div1").style.backgroundColor = '#FAFAF5';
    document.getElementById("div3").style.backgroundColor = '#FAFAF5';
}
function Selecionar_Div3() {
    // Imprime el ID del div clickeado
    console.log("Div seleccionado: 3" );
    document.getElementById("identificadorMascota").innerText="Cuidados de Minnie♥";
    document.getElementById("valorMascota").innerText="$17,00";
    document.getElementById("valorMascotaTotal").innerText="$22,99";
    document.getElementById("div3").style.backgroundColor = 'rgba(66, 107, 31, 0.62)';
    document.getElementById("div1").style.backgroundColor = '#FAFAF5';
    document.getElementById("div2").style.backgroundColor = '#FAFAF5';
}
  
  // Añade el event listener a cada div
  document.getElementById("div1").addEventListener("click", Selecionar_Div1);
  document.getElementById("div2").addEventListener("click", Selecionar_Div2);
  document.getElementById("div3").addEventListener("click", Selecionar_Div3);
  

 