// Defino lista de productos de la página
const productos = [
    { id: 1, nombre: 'Coca - Cola (2L)', precio: 1000 },
    { id: 2, nombre: 'Leche (1L)', precio: 850 },
    { id: 3, nombre: 'Manjar (500g)', precio: 500 },
    { id: 4, nombre: 'Pan de Molde (XL)', precio: 1500 }
];

// Variables Globales para acumular la compra y su monto
let total = 0;
let carrito = [];

// Función flecha para calcular el IVA (en Chile es el 19%)
const iva = (a) => a * 1.19;

// Funcion para eliminar productos del carrito y continuar o cortar el ciclo de compra
function modificarCarrito(respuesta, carrito) {
    // El cliente quiere comprar otro producto 
    if (respuesta == 1) {
        return true;

        // El cliente quiere eliminar un producto
    } else if (respuesta == 2) {
        while (carrito.length > 0) {
            let contador = 1;
            let lista = "";
            let respuesta = 0;
            for (let i of carrito) {
                lista += contador + ". " + i + "\n";
                contador++;
            }
            respuesta = parseInt(prompt("Esta es su lista de productos:\n" + lista + "Favor ingrese el número del producto a eliminar, si no desea eliminar producto presione cualquier otra tecla: "))
            if (respuesta <= carrito.length) {
                alert("Usted eliminó " + carrito[respuesta - 1]);
                total -= productos.find(productos => (" " + productos.nombre) == carrito[respuesta - 1]).precio;
                carrito.splice(respuesta - 1, 1);
            } else {
                return true;
            }
        }
        if (carrito.length == 0) {
            alert("No tiene productos que eliminar");
            return true;
        }

        // El cliente no quiere comprar más, cortamos el ciclo retornando false
    } else {
        return false;
    }
}

// Función principal del programa
function carritoDeCompras(nombre) {
    // Defino las variables total y productos para ir acumulando la compra (tanto el nombre como el costo)
    let eleccion = 0;
    let verificador = true;
    let display = '';
    for (let i of productos) {
        display += i.id + '. ' + i.nombre + ' - precio: ' + i.precio + '\n';
    }
    // Ciclo while me permite repetir el proceso hasta que el cliente no quiera comprar más
    alert('¡Hola ' + nombre + '! Bienvenido al bazar Ivannicus')
    while (verificador) {
        eleccion = parseInt(prompt(('A continuación encontrarás la lista de productos:\n\n' + display + '\nPara añadir un producto, ingrese el número correspondiente, si desea finalizar su compra ingrese cualquier otra tecla: ')))

        if (productos.find(productos => productos.id == eleccion) == undefined) {
            verificador = false;
        } else {
            total += productos[eleccion - 1].precio;
            carrito.push(" " + productos[eleccion - 1].nombre);
            alert(nombre + " usted añadió " + productos[eleccion - 1].nombre + "\n\nAhora su carro de compras tiene: " + carrito + "\n\nSu total es: " + total + " CLP");
            verificador = modificarCarrito(parseInt(prompt("Ingrese:\n1. Si desea añadir algo más\n2. Si desea eliminar un producto\nCualquier tecla si desea finalizar la compra")), carrito);
        }
    }

    imprimirAHTML(carrito, total, nombre);
    if (carrito.length > 0) {
        return ("Gracias por comprar con nosotros.\n\nUsted compro: " + carrito + "\n\nTotal bruto: " + total + " CLP\nTotal + IVA: " + iva(total).toFixed(2) + " CLP")
    } else {
        return ("En esta ocasión decidió no comprar nada, ¡No importa, lo esperamos cuando quiera!")
    }
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


nombre = prompt("Hola, favor ingrese su nombre: ");
alert(carritoDeCompras(nombre));