const buttonProducts = document.querySelector("#formularioProducts");
const formProduct = document.querySelector("#formularioProducts");
buttonProducts?.addEventListener("submit", async (event) => {
  const formData = new FormData();
  await JSONProductForm(formData);

  // Agregar archivo
  const fileInput = document.querySelector("#thumbnail");
  if (fileInput.files.length > 0) {
    formData.append("files", fileInput.files[0]); // Asume que solo se subirá un archivo
  }

  // Enviar datos
  try {
    const response = await fetch("/api/products/", {
      method: "POST",
      body: formData,
    }).then(async (res) => {
      return await res.json();
    });

    if (response.status === "success") {
      alert("Created Product Success");
      window.location.href = "/home";
    } else {
      alert(response.message);
    }
  } catch (error) {
    alert(error.message);
  }
});
async function JSONProductForm(formData) {
  formData.append("type", "products");
  formData.append("title", document.querySelector("#titulo").value);
  formData.append("description", document.querySelector("#description").value);
  formData.append("price", document.querySelector("#precio").value);
  formData.append("stock", document.querySelector("#stock").value);
  formData.append("code", document.querySelector("#codigo").value);
}
