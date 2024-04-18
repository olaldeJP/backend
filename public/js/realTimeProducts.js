const buttonProducts = document.querySelector("#formularioProducts");
const formProduct = document.querySelector("#formularioProducts");
buttonProducts?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const elBody = await JSONProductForm();
  elBody.type = "products";
  const response = await fetch("/api/products/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(elBody),
  })
    .then(async (res) => {
      return await res.json();
    })
    .catch((error) => {
      alert(error);
    });
  alert(response);
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
  if (formProduct.thumbnail.value) {
    productForm.thumbnail = formProduct.thumbnail.value;
  }
  if (formProduct.stock.value) {
    productForm.stock = formProduct.stock.value;
  }
  return productForm;
}
