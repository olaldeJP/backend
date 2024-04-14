const usserName = "unUsuario";
const ordenDeProduct = document.querySelector("#ordenar");
const botonBuscar = document.querySelector("#botonBuscar");
const botonDesc = document.querySelectorAll("#botonDescripcon");
const divContainer = document.querySelector("#containerProducts");
const buttonAddProduct = document.querySelector("#addProduct");
const limit = document.querySelector("#limit");
const inpB = document.querySelector("#inputBuscador");
const buttonLimit = document.querySelector("#limitButton");
const buttonNext = document.querySelector("#aNext");
const buttonPrev = document.querySelector("#aPrev");
const buttonTerminarCompra = document.querySelector("#terminarCompra");
const botonesProductos = document.querySelectorAll("#botonProducto");
let ordenar = true;
let cartUser = "";
let productsPag;
window.addEventListener("load", async () => {
  const user = await fetch(`/api/sessions/current`).then(async (res) => {
    return await res.json();
  });
  if (user.status === "success") {
    cartUser = user.payload.carts;
  }
  productsPag = await fetch(`/api/products/products/Paginate`).then(
    async (res) => {
      return await res.json();
    }
  );
  await mostrarProductosPaginados(productsPag.payload.payload);
  await checkearBoton();
  buttonNext.addEventListener("click", async () => {
    productsPag = await fetch(
      `/api/products/products/Paginate/?page=${productsPag.payload.nextPage}&limit=${limit.value}`
    ).then(async (res) => {
      return await res.json();
    });
    await mostrarProductosPaginados(productsPag.payload.payload);
    await checkearBoton();
  });
  buttonPrev.addEventListener("click", async () => {
    productsPag = await fetch(
      `/api/products/products/Paginate/?page=${productsPag.payload.prevPage}&limit=${limit.value}`
    ).then(async (res) => {
      return await res.json();
    });
    await mostrarProductosPaginados(productsPag.payload.payload);
    await checkearBoton();
  });
});
async function checkearBoton() {
  if (!productsPag.payload.hasPrevPage) {
    buttonPrev.disabled = true;
  } else {
    buttonPrev.disabled = false;
  }
  if (!productsPag.payload.hasNextPage) {
    buttonNext.disabled = true;
  } else {
    buttonNext.disabled = false;
  }
}
async function mostrarProductosPaginados(payload) {
  divContainer.innerHTML = "";
  for (let index = 0; index < payload.length; index++) {
    const newElement = document.createElement("div");
    newElement.classList.add("box");
    newElement.innerHTML = `<p>title: ${payload[index].title}</p>
    <p>description: ${payload[index].description}</p>
    <p>price:${payload[index].price} </p>
    <p> STOCK: ${payload[index].stock}</p>
    <button> Ver Descripcion </button> <br> `;
    divContainer.appendChild(newElement);
    if (!(cartUser === "")) {
      newElement.insertAdjacentHTML(
        "beforeend",
        `<button name="${payload[index]._id}" id="botonProducto">Agregar Al Carrito</button><br><br>`
      );
    }
  }
  if (!(cartUser === "")) {
    document.querySelectorAll("#botonProducto").forEach((boton) => {
      // Agregar event listener a cada botón
      boton.addEventListener("click", async function () {
        const addProducToCartt = await fetch(
          `/api/carts/${cartUser}/product/${this.name}`
        );
      });
    });
  }
}

buttonLimit.addEventListener("click", async () => {
  productsPag = await fetch(
    `/api/products/products/Paginate/?limit=${limit.value}`
  ).then(async (res) => {
    return await res.json();
  });
  mostrarProductosPaginados(productsPag.payload.payload);
  checkearBoton();
});

ordenDeProduct.addEventListener("change", async (e) => {
  e.preventDefault();
  ordenar = document.querySelector("#ordenar").value;
  productsPag = await fetch(
    `/api/products/products/Paginate/?limit=${limit.value}&sort=${ordenar}`
  ).then(async (res) => {
    return await res.json();
  });
  mostrarProductosPaginados(productsPag.payload.payload);
  checkearBoton();
});
botonBuscar.addEventListener("click", async (e) => {
  e.preventDefault();
  const valor = inpB.value;
  let productsPag = await fetch(
    `/api/products/products/Paginate/?title=${valor}`
  ).then(async (res) => {
    return await res.json();
  });
  mostrarProductosPaginados(productsPag.payload.payload);
});
