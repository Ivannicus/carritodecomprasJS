// Variables Globales para acumular la compra y su monto
let total = 0;
let carrito = [];
let buscador = document.querySelector('#buscador');
let botonBuscar = document.querySelector('#botonBuscar');

// Función flecha para calcular el IVA (en Chile es el 19%)
const iva = (a) => a * 1.19;

// Buscador en la página

const card = document.getElementById("cards");

// Función que recibe la información de los proudctos desde un JSON y las almacena en local storage, además de crear las CARDs
const crearCard = () => {
    let contador = 0;
    card.innerHTML = '';
    fetch('./productos.json')
        .then((res) => res.json())
        .then((data) => {
            data.forEach((producto) => {
                
                let id = producto.id;
                let nombre = producto.nombre;
                let precio = producto.precio;
                let url = producto.url;
                const objeto = { id: id, nombre: nombre, precio: precio, url: url }
                localStorage.setItem(id, JSON.stringify(objeto))
            })
        })

    const textoBuscado = buscador.value.toLowerCase();
    for (let i = 1; i < localStorage.length + 1; i++) {
        let { id, nombre, precio, url } = JSON.parse(localStorage.getItem(i));
        let minus = nombre.toLowerCase();
        if (minus.indexOf(textoBuscado) !== -1) {
            contador ++;
            card.innerHTML += `<div class="card" style="width: 12rem;">
            <img src="${url}" class="card-img-top" alt="...">
            <div class="card-body text-center align-items-center">
              <h5 class="card-title">${nombre}</h5>
              <p class="card-text">${precio} CLP</p>
              <a href="#" class="btn btn-primary botonAnadir" marcador="${id}">Añadir</a>
              <a href="#" class="btn btn-danger botonEliminar" marcador="${id}">Eliminar</a>
            </div></div>`;
        }
    }
    if (card.innerHTML === '') {
        card.innerHTML += `<h2>Producto no encontrado 😅</h2>`
    }

    let boton = document.getElementsByClassName('botonAnadir');
    for (let i = 0; i < contador; i++) {
        console.log(boton[i]);
        boton[i].addEventListener('click', anadir);
    }
    let boton2 = document.getElementsByClassName('botonEliminar');
    for (let i = 0; i < contador; i++) {
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
    if (carrito.length >= 1 && posicion != -1) {
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
let valorTotal = document.createElement('nav');
const valorCarrito = (total) => {
    
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

// Buscador en la página
// const buscador = document.querySelector('#buscador');
// const botonBuscar = document.querySelector('#botonBuscar');

// const buscar = () => {
//     let card = document.getElementById("cards");
//     card.innerHTML = ``
//     const textoBuscado = buscador.value.toLowerCase();
//     console.log(textoBuscado);
//     for (let i = 1; i < localStorage.length + 1; i++) {
//         console.log(JSON.parse(localStorage.getItem(i)));
//         let { id, nombre, precio, url } = JSON.parse(localStorage.getItem(i));
//         let minus = nombre.toLowerCase();
//         console.log(nombre);
//         if (minus.indexOf(textoBuscado) !== -1) {
//             card.innerHTML += `<div class="card" style="width: 12rem;">
//         <img src="${url}" class="card-img-top" alt="...">
//         <div class="card-body text-center align-items-center">
//           <h5 class="card-title">${nombre}</h5>
//           <p class="card-text">${precio} CLP</p>
//           <a href="#" class="btn btn-primary botonAnadir" marcador="${id}">Añadir</a>
//           <a href="#" class="btn btn-danger botonEliminar" marcador="${id}">Eliminar</a>
//         </div></div>`;
//         }
//     }
//     if (card.innerHTML === ''){
//         card.innerHTML += `<h2>Producto no encontrado 😅</h2>`
//     }
// }
botonBuscar.addEventListener('click', crearCard);
buscador.addEventListener('keyup', crearCard);

crearCard();

