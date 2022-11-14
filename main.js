class Burger {
    constructor(id, nombre, precio, img) {
        this.id = id;
        this.nombre = nombre; 
        this.precio = precio;
        this.img = img;
        this.cantidad = 1; 
    }
}

const baconesa = new Burger(1, "Baconesa", 900, "fotos/baconesa.jpg");
const crispy = new Burger(2, "Crispy", 800, "fotos/crispy.jpg");
const libra = new Burger(3, "Libra", 750, "fotos/libra.jpg");
const oklahoma = new Burger(4, "Oklahoma", 950, "fotos/oklahoma.jpg"); 

const burgers = [baconesa, crispy, libra, oklahoma]; 

let carrito = [];
 
if(localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
}

const contenedorBurgers = document.getElementById("contenedorBurgers");
 
const mostrarBurgers = () => {
    burgers.forEach((burger) => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
            <div class="card">
                <img src="${burger.img}" class="card-img-top imgBurgers" alt="${burger.nombre}">
                <div class="card-body">
                <h5 class="card-title"> ${burger.nombre} </h5>
                <p class="card-text"> ${burger.precio} </p>
                <button class="btn colorBoton" id="boton${burger.id}"> Agregar al Carrito </button>
                </div>
            </div>
        `
        contenedorBurgers.appendChild(card);
 
        const boton = document.getElementById(`boton${burger.id}`);
        boton.addEventListener("click", () => {
            agregarAlCarrito(burger.id)
        })
    })
}
 
const agregarAlCarrito = (id) => {
    const burger = burgers.find((burger) => burger.id === id);
    const burgerEnCarrito = carrito.find((burger) => burger.id === id);
    if(burgerEnCarrito){
        burgerEnCarrito.cantidad++;
    }else {
        carrito.push(burger);
    
        localStorage.setItem("carrito",JSON.stringify(carrito));
    }
    calcularTotal();
}

mostrarBurgers();
 
const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", () => {
    mostrarCarrito();
});
 
const mostrarCarrito = () => {
    contenedorCarrito.innerHTML="";
    carrito.forEach((burger) => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
            <div class="card">
                <img src="${burger.img}" class="card-img-top imgBurger" alt="${burger.nombre}">
                <div class="card-body">
                <h5 class="card-title"> ${burger.nombre} </h5>
                <p class="card-text"> ${burger.precio} </p>
                <p class="card-text"> ${burger.cantidad} </p>
                <button class="btn colorBoton" id="eliminar${burger.id}"> Eliminar Burger </button>
                </div>
            </div>
        `
        contenedorCarrito.appendChild(card);
 
        const boton = document.getElementById(`eliminar${burger.id}`);
        boton.addEventListener("click", () => {
            eliminarDelCarrito(burger.id);
        })
    })
    calcularTotal();
}

const eliminarDelCarrito = (id) => {
    const burger = carrito.find((burger) => burger.id === id);
    const indice = carrito.indexOf(burger);
    carrito.splice(indice, 1);
    mostrarCarrito();

    localStorage.setItem("carrito", JSON.stringify(carrito));
}

const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", () => {
    eliminarTodoElCarrito();
})
 
const eliminarTodoElCarrito = () => {
    carrito = [];
    mostrarCarrito();
 
    localStorage.clear();
}

const total = document.getElementById("total");

const calcularTotal = () => {
    let totalCompra = 0; 
    carrito.forEach((burger) => {
        totalCompra += burger.precio * burger.cantidad;
    })
    total.innerHTML = ` Final: $${totalCompra}`;
}
