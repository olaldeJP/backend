//Se envia la peticion POST con los datos del form para comprobar que exista en la base de datos, si existe, si redirecciona a / con el usuario cargado
document
  .querySelector("#formulario")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      const inputsVAlores = JSON.stringify({
        email: document.querySelector("#email").value,
      });
      const response = await fetch("/api/users/sendEmailToChange", {
        // /login para hacerlo con session

        method: "PUT",
        headers: { "Content-Type": "application/json" },
        // @ts-ignore
        body: inputsVAlores,
      });
      const res = await response.json(); // si el status es Success vuelve a / a ver los productos, sino envia una alert
      if (res.status === "success") {
        alert("Check Your Email");
        window.location.href = `/`;
      }
    } catch (error) {
      alert(error.message);
    }
  });
