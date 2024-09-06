function agregarAlCarrito(producto){
  Toastify({
    text: "This is a toast",
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "left", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function(){} // Callback after click
  }).showToast();
  const memoria = JSON.parse(localStorage.getItem("destinos"));
  console.log(memoria);
  if(!memoria){
    const nuevoProducto = getNuevoProductoParaMemoria(producto);
    localStorage.setItem("destinos",JSON.stringify([nuevoProducto]));

  } else {
    const indiceProducto = memoria.findIndex(destino => destino.id === producto.id);
    console.log(indiceProducto)
    const nuevaMemoria = memoria;
    if(indiceProducto === -1){
      nuevaMemoria.push(getNuevoProductoParaMemoria(producto));
    } else {
      nuevaMemoria[indiceProducto].cantidad ++;
      cantidadProductoFinal = nuevaMemoria[indiceProducto].cantidad;
    }
    localStorage.setItem("destinos",JSON.stringify(nuevaMemoria));
    actualizarNumeroCarrito();
    return cantidadProductoFinal;
  }
}
function restarAlCarrito(producto){
  let memoria = JSON.parse(localStorage.getItem("destinos"));
  let cantidadProductoFinal = 0;
  const indiceProducto = memoria.findIndex(destino => destino.id === producto.id);
  let nuevaMemoria = memoria;
  nuevaMemoria[indiceProducto].cantidad--;
  cantidadProductoFinal = nuevaMemoria[indiceProducto].cantidad;

  if(cantidadProductoFinal === 0){
    nuevaMemoria.splice(indiceProducto,1)
  };
    localStorage.setItem("destinos",JSON.stringify(nuevaMemoria));
    actualizarNumeroCarrito();
    return cantidadProductoFinal;
}

function getNuevoProductoParaMemoria(producto){
  const nuevoProducto = producto;
  nuevoProducto.cantidad = 1;
  return nuevoProducto;
}

function actualizarNumeroCarrito(){
  let cuenta = 0;
  const memoria = JSON.parse(localStorage.getItem("destinos"));
  if(memoria && memoria.length >0){
    cuenta = memoria.reduce((acum, current) => acum+current.cantidad,0)
    return cuentaCarritoElement.innerText = cuenta;
  }
  cuentaCarritoElement.innerText = 0;
  }

function reiniciarCarrito(){
  localStorage.removeItem("destinos");
  actualizarNumeroCarrito();
}