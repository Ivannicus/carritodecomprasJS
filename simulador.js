// Defino lista de productos de la página
const productos = [
    { id: 1, nombre: 'Coca - Cola (3L)', precio: 2000, url: 'http://tortasadomicilio.cl/web/productos/catalogo/coca-3lts-600x600.jpg' },
    { id: 2, nombre: 'Leche (1L)', precio: 850, url: 'https://jumbo.vtexassets.com/arquivos/ids/410381/Leche-entera-sin-lactosa-1-L.jpg?v=637469373544400000' },
    { id: 3, nombre: 'Manjar (500g)', precio: 500, url: 'https://jumbo.vtexassets.com/arquivos/ids/420987/Manjar-El-Manjar-500-g.jpg?v=637510058457630000' },
    { id: 4, nombre: 'Pan de Molde (XL)', precio: 1500, url: 'https://santaisabel.vtexassets.com/arquivos/ids/161098/Pan-de-molde-blanco-XL-752-g.jpg?v=637469595796130000' }
];

const crearCard = productos => {
    for (let producto of productos) {
        let card = document.getElementById("cards");
        card.innerHTML += `<div class="card" style="width: 18rem;">
        <img src="${producto.url}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text">${producto.precio}</p>
          <a href="#" class="btn btn-primary" id="botonCoca">Añadir</a>
        </div>
      </div>`
    }
}

// Variables Globales para acumular la compra y su monto
let total = 0;
let carrito = [];

// Función flecha para calcular el IVA (en Chile es el 19%)
const iva = (a) => a * 1.19;

// Funcion para eliminar productos del carrito y continuar o cortar el ciclo de compra
function modificarCarrito(respuesta, carrito) {
    total -= productos.find(productos => (" " + productos.nombre) == carrito[respuesta - 1]).precio;
    carrito.splice(respuesta - 1, 1);
}


// Función principal del programa
function carritoDeCompras(nombre) {
    // Defino las variables total y productos para ir acumulando la compra (tanto el nombre como el costo)
    let eleccion = 2;

    total += productos[eleccion - 1].precio;
    carrito.push(" " + productos[eleccion - 1].nombre);


    imprimirAHTML(carrito, total, nombre);
}

const imprimirAHTML = (carrito, total, nombre) => {
    let saludo = document.getElementById("saludo");
    saludo.innerHTML += " " + nombre + "!";
    let lista = document.getElementById("carrito");
    let costo = document.getElementById("compra");
    let mensaje = document.getElementById("mensaje");

    if (carrito.length > 0) {
        mensaje.innerHTML = "<h2>Usted adquirió los siguientes productos: </h2>";
        for (let producto of carrito) {
            let li = document.createElement("li");
            li.innerHTML = producto;
            lista.appendChild(li);
        }

        let valorConIva = iva(total).toFixed(2);
        costo.innerHTML = `<h4> Valor de los productos: ${total} </h4> <h3> Valor a pagar (IVA incluído): ${valorConIva} </h3>`;
    } else {
        let persona = nombre;
        costo.innerHTML = `<h3> En esta ocasión no compró nada 😪, lo esperamos la próxima vez ${persona} </h3>`;
    }
}

crearCard(productos);
nombre = prompt("Hola, favor ingrese su nombre: ");
alert(carritoDeCompras(nombre));