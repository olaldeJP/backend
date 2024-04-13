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

let ordenar = true;
let productsPag;
window.addEventListener("load", async () => {
  productsPag = await fetch(`/api/products/products/Paginate`).then(
    async (res) => {
      return await res.json();
    }
  );
  mostrarProductosPaginados(productsPag.payload.payload);
  checkearBoton();
  buttonNext.addEventListener("click", async () => {
    productsPag = await fetch(
      `/api/products/products/Paginate/?page=${productsPag.nextPage}&limit=${limit.value}`
    ).then(async (res) => {
      return await res.json();
    });
    mostrarProductosPaginados(productsPag.payload);
    checkearBoton();
  });
  buttonPrev.addEventListener("click", async () => {
    productsPag = await fetch(
      `/api/products/products/Paginate/?page=${productsPag.prevPage}&limit=${limit.value}`
    ).then(async (res) => {
      return await res.json();
    });
    mostrarProductosPaginados(productsPag.payload);
    checkearBoton();
  });
});
async function checkearBoton() {
  if (!productsPag.hasPrevPage) {
    buttonPrev.disabled = true;
  } else {
    buttonPrev.disabled = false;
  }
  if (!productsPag.hasNextPage) {
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
    <button > + </button><br>
    <button> Description </button>  
    `;
    divContainer.appendChild(newElement);
  }
}

buttonLimit.addEventListener("click", async () => {
  productsPag = await fetch(
    `/api/products/products/Paginate/?limit=${limit.value}`
  ).then(async (res) => {
    return await res.json();
  });
  mostrarProductosPaginados(productsPag.payload);
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
  mostrarProductosPaginados(productsPag.payload);
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
  mostrarProductosPaginados(productsPag.payload);
});
