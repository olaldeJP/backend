const boxDiv = document.querySelector("#boxProducto");
window.addEventListener("load", async () => {
  const url = window.location.href;
  const id = url.substring(url.lastIndexOf("/") + 1);
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
  <img src="${pathImg}" alt="Imagen" class="imgBox">
  <h5> $ ${product.payload.price} </h5>
  <p> STOCK: ${product.payload.stock}</p>`;
  boxDiv.appendChild(newElement);
});
