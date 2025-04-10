const txtName = document.getElementById("Name");
const txtNumber = document.getElementById("Number");
const btnAgregar = document.getElementById("btnAgregar");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
const alertValidaciones = document.getElementById("alertValidaciones");
const tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);
const contadorProductos = document.getElementById("contadorProductos");
const productosTotal = document.getElementById("productosTotal");
const precioTotal = document.getElementById("precioTotal");

//Contador para la primera columna de la tabla
let cont = 0;

let costoTotal = 0;
let totalProductos = 0;

function validarCantidad() {

    //Validar la longitud del campo txtNumber
    if (txtNumber.value.trim().length <= 0) {
        return false;
    } //length <= 0

    //Validar si es numero o no
    if (isNaN(txtNumber.value)) {
        return false;
    }

    //Validar si es menor a 0 o no
    if (Number(txtNumber.value) <= 0) {
        return false;
    }

    return true;
} //ValidarCantidad

//Funcion para generar precio aleatorio
function getPrecio() {
    return Math.round((Math.random() * 10000)) / 100;
}//getPrecio


btnAgregar.addEventListener("click", function (event) {

    event.preventDefault();

    //Bandera, al ser true permite agregar los datos a la tabla
    let isValid = true;


    //Reiniciar a campos vacios
    txtName.style.border = "";
    txtNumber.style.border = "";
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";


    txtName.value = txtName.value.trim();
    txtNumber.value = txtNumber.value.trim();

    if (txtName.value.length < 3) {
        txtName.style.border = "solid medium red";
        alertValidacionesTexto.innerHTML = "<strong>El nombre del producto no es correcto.</strong>";
        alertValidaciones.style.display = "block";
        isValid = false;
    }// lenght < 3

    if (!validarCantidad()) {
        txtNumber.style.border = "solid medium red";
        alertValidacionesTexto.innerHTML += "</br><strong>La cantidad no es correcto.</strong>";
        alertValidaciones.style.display = "block";
        isValid = false;
    }// Validar cantidad

    //Si paso las validaciones
    if (isValid) {
        cont++;

        let precio = getPrecio();

        let row = ` <tr>
                        <td>${cont}</td>
                        <td>${txtName.value}</td>
                        <td>${txtNumber.value}</td>
                        <td>${precio}</td>
                    </tr>`;

        cuerpoTabla.insertAdjacentHTML("beforeend", row);

        contadorProductos.innerText = cont;

        costoTotal += (precio * Number(txtNumber.value));
        productosTotal.innerText = totalProductos;

        totalProductos += Number(txtNumber.value);
        precioTotal.innerText = "$ " + costoTotal.toFixed(2);

        //Limpia los campos
        txtName.value = "";
        txtNumber.value = "";

        //Manda directo al campo de txtName
        txtName.focus();

    }//if isValid

});