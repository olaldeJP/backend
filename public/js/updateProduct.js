const formProduct = document.querySelector("#formularioProducts");
const url = window.location.href;
const id = url.substring(url.lastIndexOf("/") + 2);
window.addEventListener("load", async (event) => {
  event.preventDefault();
  const product = await fetch(`/api/products/${id}`).then(
    async (res) => {
      return await res.json();
    },
    { method: "POST" }
  );
  const newElement = document.createElement("div");
  newElement.classList.add("box");
  const pathImg = product.payload.thumbnail[0].slice(6);
  newElement.innerHTML = `
  <h3> ${product.payload.title}</h3>
  <p> ${product.payload.description}</p>
  <img src="${pathImg}" alt="Imagen" class=imgBox>
  <h5> $ ${product.payload.price} </h5>
  <p> STOCK: ${product.payload.stock}</p>
  `;
  document.querySelector(".boxElement").appendChild(newElement);
});
formProduct.addEventListener("submit", async (event) => {
  event.preventDefault();
  const elBody = await JSONProductForm();
  const newProduct = await fetch(`/api/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(elBody),
  }).then(async (res) => {
    return await res.json();
  });
  if (newProduct.status === "success") {
    alert("PRODUCT UPDATE SUCCESS");
    window.location.reload();
  } else alert("ERROR -  " + newProduct.message);
});

async function JSONProductForm() {
  let productForm = {};
  if (formProduct.titulo.value) {
    productForm.title = formProduct.titulo.value;
  }
  if (formProduct.description.value) {
    productForm.description = formProduct.description.value;
  }
  if (formProduct.precio.value) {
    productForm.price = formProduct.precio.value;
  }
  if (formProduct.codigo.value) {
    productForm.code = formProduct.codigo.value;
  }
  if (formProduct.stock.value) {
    productForm.stock = formProduct.stock.value;
  }

  return productForm;
}

async function deleteProduct() {
  const deleteP = await fetch(`http://localhost:8080/api/products/${id}`, {
    method: "DELETE",
  })
    .then(async (res) => {
      return await res.json();
    })
    .catch((error) => {
      alert("Error Delete Producto " + error);
    });
  if (deleteP.status === "success") {
    alert("Product Deleted Success");
    window.location.href = "/home";
  }
}
