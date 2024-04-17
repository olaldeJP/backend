const formLogout = document.querySelector("#logOut");
const divUser = document.querySelector("#infoUser");
window.addEventListener("load", async () => {
  user = await fetch(`/api/sessions/current`).then(async (res) => {
    return await res.json();
  });
});
//Envia la peticion para borrar el res.session , y hace una redireccion a /login
formLogout?.addEventListener("click", async (event) => {
  event.preventDefault();
  try {
    const response = await fetch("/api/sessions/logout", {
      method: "DELETE",
    });

    if (response.status === 202) {
      window.location.href = "/";
    }
  } catch (error) {
    alert(error.message);
  }
});

async function verUsuarios() {
  fetch("api/users/")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((users) => {
      alert(JSON.stringify(users));
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}
