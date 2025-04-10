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

//Areglo de los productos
let datos = new Array();

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
        costoTotal += (precio * Number(txtNumber.value));
        totalProductos += Number(txtNumber.value);

        let row = ` <tr>
                        <td>${cont}</td>
                        <td>${txtName.value}</td>
                        <td>${txtNumber.value}</td>
                        <td>${precio}</td>
                    </tr>`;              

        cuerpoTabla.insertAdjacentHTML("beforeend", row);

        contadorProductos.innerText = cont;
        productosTotal.innerText = totalProductos;
        precioTotal.innerText = "$ " + costoTotal.toFixed(2);

        //Se declaran en un objeto un elemento
        let elemento =  {
            "cont" : cont,
            "nombre" : txtName.value,
            "cantidad" : txtNumber.value,
            "precio" : precio
        };

        //Se agregan los objetos dentro del array
        datos.push(elemento);

        //Se agrega al localStorage
        localStorage.setItem("datos", JSON.stringify(datos));


        //Se declaran en un objeto un elemento
        let resumen =   {
                    "cont" : cont,
                    "totalProductos" : totalProductos,
                    "costoTotal" : costoTotal
                }

        //Se agrega al localStorage
        localStorage.setItem("resumen", JSON.stringify(resumen));  

        //Limpia los campos
        txtName.value = "";
        txtNumber.value = "";

        //Manda directo al campo de txtName
        txtName.focus();

    }//if isValid

});