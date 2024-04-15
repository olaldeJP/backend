const boxDiv = document.querySelector("#boxProducto");
window.addEventListener("load", async () => {
  const url = window.location.href;
  const id = url.substring(url.lastIndexOf("/") + 1);
  const product = await fetch(`http://localhost:8080/api/products/${id}`).then(
    async (res) => {
      return await res.json();
    },
    { method: "POST" }
  );
  const newElement = document.createElement("div");
  newElement.classList.add("box");
  newElement.innerHTML = `
  <h3> ${product.payload.title}</h3>
  <h5> $ ${product.payload.price} </h5>
  <p>Desciption: ${product.payload.description}</p>
  <p> STOCK: ${product.payload.stock}</p>`;
  boxDiv.appendChild(newElement);
});
