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
    { id: 4, nombre: 'Pan Molde (XL)', precio: 1500, url: 'https://santaisabel.vtexassets.com/arquivos/ids/161098/Pan-de-molde-blanco-XL-752-g.jpg?v=637469595796130000' }
];

// Funcion para almacenar productos en storage
const productosLocal = (clave, valor) => {
    localStorage.setItem(clave, valor)
}

// Guardo los productos en el storage
for (producto of productos) {
    productosLocal(producto.id, JSON.stringify(producto));
}


// Función para crear las CARDs de los productos, va a buscar la info al storage local
const crearCard = () => {
    for (let i = 1; i <= localStorage.length; i++) {
        let card = document.getElementById("cards");
        let { id, nombre, precio, url } = JSON.parse(localStorage.getItem(i));
        card.innerHTML += `<div class="card" style="width: 12rem;">
        <img src="${url}" class="card-img-top" alt="...">
        <div class="card-body text-center align-items-center">
          <h5 class="card-title">${nombre}</h5>
          <p class="card-text">${precio} CLP</p>
          <a href="#" class="btn btn-primary botonAnadir" marcador="${id}">Añadir</a>
          <a href="#" class="btn btn-danger botonEliminar" marcador="${id}">Eliminar</a>
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
    let id = e.target.getAttribute('marcador');
    carrito.push(id);
    let nombre = JSON.parse(localStorage.getItem(parseInt(id))).nombre;
    imprimirAHTML(carrito);
    Toastify({
        text: nombre + " añadido",
        duration: 1500,
        style: {
            background: "linear-gradient(to right, #00b09b, #0ba552)",
        },
    }).showToast();
}

// Función para eliminar productos del carrito
const eliminar = (e) => {
    let id = e.target.getAttribute('marcador');
    let posicion = carrito.indexOf(id.toString());
    let nombre = JSON.parse(localStorage.getItem(parseInt(id))).nombre;
    if (carrito.length >= 1) {
        Toastify({
            text: nombre + " eliminado",
            duration: 1500,
            style: {
                background: "linear-gradient(to right, #8c0022, #9c0026)",
            },
        }).showToast();
    }
    if (posicion != -1) {
        carrito.splice(posicion, 1);
    }
    imprimirAHTML(carrito);
}

// Función para dibujar el carrito, busca la info en el storage local
const imprimirAHTML = (carro) => {
    let total = 0;
    let carroCompras = document.getElementById("miCarrito");
    let carroReducido = carro.reduce(function (acc, el) {
        acc[el] = (acc[el] || 0) + 1;
        return acc;
    }, {});
    carroCompras.innerHTML = "";
    for (let ids of Object.keys(carroReducido)) {
        let { nombre, precio, url } = JSON.parse(localStorage.getItem(parseInt(ids)));
        let cantidad = carroReducido[ids];
        total += precio * carroReducido[ids];
        carroCompras.innerHTML += `<div class="card" style="width: 8rem;">
        <img src="${url}" class="card-img-top" alt="...">
        <div class="card-body text-center">
          <h5 class="card-title">${nombre}</h5>
          <p class="card-text">Cantidad: ${cantidad}</p>
        </div></div>`
    }
    valorCarrito(total);
}

// Función de costos del carrito
const valorCarrito = (total) => {
    let valorTotal = document.createElement('nav');
    total == 0 ? valorTotal.innerHTML = '<h4>Tu carrito está vacío, agrega un producto que desees comprar</h4>' : valorTotal.innerHTML = `<h4>Valor productos: ${total} CLP</h4>\n<h3>Total a pagar (IVA incluido): ${iva(total)} CLP</h3>`;
    miCarrito.appendChild(valorTotal);
}


let saludo = document.getElementById("saludo");
if (sessionStorage.getItem('nombre') != null) {
    saludo.innerHTML += " " + sessionStorage.getItem('nombre') + "!";
} else {
    let nombre = prompt("Hola, favor ingrese su nombre: ");    
    sessionStorage.setItem('nombre', nombre);
    saludo.innerHTML += " " + sessionStorage.getItem('nombre') + "!";
    
}


crearCard(productos);

