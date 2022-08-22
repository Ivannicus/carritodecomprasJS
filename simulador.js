// Variables Globales para acumular la compra y su monto
let total = 0;
let carrito = [];

// Función flecha para calcular el IVA (en Chile es el 19%)
const iva = (a) => a * 1.19;

// Defino lista de productos de la página
const productos = [
    { id: 1, nombre: 'Coca - Cola (3L)', precio: 2000, url: 'http://tortasadomicilio.cl/web/productos/catalogo/coca-3lts-600x600.jpg' },
    { id: 2, nombre: 'Leche (1L)', precio: 850, url: 'https://jumbo.vtexassets.com/arquivos/ids/410381/Leche-entera-sin-lactosa-1-L.jpg?v=637469373544400000' },
    { id: 3, nombre: 'Manjar (500g)', precio: 500, url: 'https://jumbo.vtexassets.com/arquivos/ids/420987/Manjar-El-Manjar-500-g.jpg?v=637510058457630000' },
    { id: 4, nombre: 'Pan de Molde (XL)', precio: 1500, url: 'https://santaisabel.vtexassets.com/arquivos/ids/161098/Pan-de-molde-blanco-XL-752-g.jpg?v=637469595796130000' }
];

// Función para crear las CARDs de los productos
const crearCard = productos => {
    let i = 0;
    for (let producto of productos) {
        let card = document.getElementById("cards");
        card.innerHTML += `<div class="card" style="width: 12rem;">
        <img src="${producto.url}" class="card-img-top" alt="...">
        <div class="card-body text-center align-items-center">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text">${producto.precio} CLP</p>
          <a href="#" class="btn btn-primary botonAnadir" marcador="${producto.id}">Añadir</a>
          <a href="#" class="btn btn-danger botonEliminar" marcador="${producto.id}">Eliminar</a>
        </div></div>`;
    }
    let boton = document.getElementsByClassName('botonAnadir');
    for (let i = 0; i < productos.length; i++) {
        boton[i].addEventListener('click', anadir);
    }
    let boton2 = document.getElementsByClassName('botonEliminar');
    for (let i = 0; i < productos.length; i++) {
        boton2[i].addEventListener('click', eliminar);
    }
    valorCarrito(total);
}


// Función para añadir productos al carrito
const anadir = (e) => {
    carrito.push(e.target.getAttribute('marcador'));
    imprimirAHTML(carrito);
}

// Función para eliminar productos del carrito
const eliminar = (e) => {
    let marcador = e.target.getAttribute('marcador').toString();
    let posicion = carrito.indexOf(marcador);
    if (posicion != -1) {
        carrito.splice(posicion, 1);
    }
    imprimirAHTML(carrito);

}

// Función para dibujar el carrito
const imprimirAHTML = (carro) => {
    let total = 0;
    let carroCompras = document.getElementById("miCarrito");
    let carroReducido = carro.reduce(function (acc, el) {
        acc[el] = (acc[el] || 0) + 1;
        return acc;
    }, {});
    carroCompras.innerHTML = "";
    for (let ids of Object.keys(carroReducido)) {
        let nombreProducto = productos.find(e => e.id === parseInt(ids)).nombre;
        let precioProducto = productos.find(e => e.id === parseInt(ids)).precio;
        let fotoProducto = productos.find(e => e.id === parseInt(ids)).url;
        let cantidad = carroReducido[ids];
        total += precioProducto * carroReducido[ids];
        carroCompras.innerHTML += `<div class="card" style="width: 8rem;">
        <img src="${fotoProducto}" class="card-img-top" alt="...">
        <div class="card-body text-center">
          <h5 class="card-title">${nombreProducto}</h5>
          <p class="card-text">Cantidad: ${cantidad}</p>
        </div></div>`
    }
    valorCarrito(total);
}

// Función de costos del carrito
const valorCarrito = (total) => {
    let valorTotal = document.createElement('nav');
    if (total == 0) {
        valorTotal.innerHTML = '<h4>Tu carrito está vacío, agrega un producto que desees comprar</h4>'
    } else {
        valorTotal.innerHTML = `<h4>Valor productos: ${total} CLP</h4>\n<h3>Total a pagar (IVA incluido): ${iva(total)} CLP</h3>`
    }
    miCarrito.appendChild(valorTotal);
}

let saludo = document.getElementById("saludo");
nombre = prompt("Hola, favor ingrese su nombre: ");
saludo.innerHTML += " " + nombre + "!";
crearCard(productos);

