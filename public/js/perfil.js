const formLogout = document.querySelector("form");

//Envia la peticion para borrar el res.session , y hace una redireccion a /login
formLogout?.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    const response = await fetch("/api/sessions/logout", {
      method: "DELETE",
    });
    if (response.status === 200) {
      window.location.href = "/login";
    }
  } catch (error) {
    alert(error.message);
  }
});
