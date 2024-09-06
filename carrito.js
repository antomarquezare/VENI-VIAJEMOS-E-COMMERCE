const contenedorTarjetas = document.getElementById("carrito-container");
const cantidadElement = document.getElementById("cantidad");
const precioElement = document.getElementById("precio");
const carritoVacioElement = document.getElementById("carrito-vacio");
const totalesElement = document.getElementById("totales");

function crearTarjetasProductosCarrito() {
  contenedorTarjetas.innerHTML = "";
  const productos = JSON.parse(localStorage.getItem("destinos"));

  if (productos && productos.length > 0) {
    productos.forEach((producto) => {
      const nuevosDestinos = document.createElement("div");
      nuevosDestinos.classList = "tarjeta-producto";
      nuevosDestinos.innerHTML = `
      <img src="./img/productos/${producto.id}.jpg" alt="Destino 1">
      <h3>${producto.nombre}</h3>
      <span>$${producto.precio}</span>
      <div>
        <button>-</button>
        <span class="cantidad">${producto.cantidad}</span>
        <button>+</button>
      </div>
    `;
      contenedorTarjetas.appendChild(nuevosDestinos);
      nuevosDestinos
        .getElementsByTagName("button")[0]
        .addEventListener("click", (e) => {
          const cantidadElement = e.target.parentElement.getElementByClassName("cantidad")[0];
          cantidadElement.innerText = restarAlCarrito(producto);
          crearTarjetasProductosCarrito();
          actualizarTotales();
        });
      nuevosDestinos
        .getElementsByTagName("button")[1]
        .addEventListener("click", (e) => {
          const cantidadElement = e.target.parentElement.getElementByClassName("cantidad")[0];
          cantidadElement.innerText = agregarAlCarrito(producto);
          actualizarTotales();
        });
    });
  }
revisarMensajeVacio();
actualizarTotales();
actualizarNumeroCarrito();
}
crearTarjetasProductosInicio();

function actualizarTotales() {
  const productos = JSON.parse(localStorage.getItem("destinos"));
  let cantidad = 0;
  let precio = 0;
  if(productos && productos.length> 0){
    productos.forEach((producto) => {
      cantidad += producto.cantidad;
      precio += producto.precio * producto.cantidad;

    });
  }
    cantidadElement.innerText = cantidad;
    precioElement.innerText = precio;
    if(precio ===0) {
      reiniciarCarrito();
      revisarMensajeVacio();
  }
}
document.getElementById("reiniciar").addEventListener("click", () => {
    contenedorTarjetas.innerHTML = "";
    reiniciarCarrito();
    revisarMensajeVacio();
});

function revisarMensajeVacio(){
  const productos = JSON.parse(localStorage.getItem("destinos"));
  carritoVacioElement.classList.toggle("escondido", productos);
  totalesContainer.classList.toggle("escondido",!productos);
}