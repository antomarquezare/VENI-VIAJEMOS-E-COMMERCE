let productos = [];
fetch("./js.productos.json")
  .then(response => response.json())
  .then(data => {
    productos = data;
    cargarProductos(producto);
  })
const contenedorTarjetas = document.getElementById("productos-container");

function crearTarjetasProductosInicio(productos){
  productos.forEach(producto => {
    const nuevosDestinos = document.createElement("div");
    nuevosDestinos.classList = "tarjeta-producto";
    nuevosDestinos.innerHTML = `
      <img src="./img/producto/${producto.id}.jpg">
      <h3>${producto.nombre}</h3>
      <p class="precio">$${producto.precio}</p>
      <button>Agregar al carrito</button>
    `
    contenedorTarjetas.appendChild(nuevosDestinos);
    nuevosDestinos.getElementsByTagName("button")[0].addEventListener("click",()=> agregarAlCarrito(producto));
  });
}


crearTarjetasProductosInicio(destinos);