const formReg = document.querySelector("#formRegister");
const enviarR = document.querySelector("#enviarRegistro");

formReg?.addEventListener("submit", async (event) => {
  event.preventDefault();
  //Se envia la peticion POST con la informacion del formulario y se redirige al home con el res.session['usser] {first_name , last_name. isAdmin}
  const response = await fetch("api/users/create", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    // @ts-ignore
    body: new URLSearchParams(new FormData(formReg)),
  });
  if (response.status == 201) {
    // el satatus esta bien redirecciona a /
    alert("User Create");
    window.location.href = `/`;
  }
});
async function createAccount() {
  const dataUser = await getInfoForm();
  const response = await fetch("api/users/create", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    // @ts-ignore
    body: new URLSearchParams(new FormData(nuevo)),
  });
  if (response.status == 201) {
    // el satatus esta bien redirecciona a /
    alert("User Create");
    window.location.href = `/`;
  }
}

async function getInfoForm() {
  return {
    email: document.querySelector("#emailUser").value,
    password: document.querySelector("#passwordUser").value,
    first_name: document.querySelector("#nameUser").value,
    second_name: document.querySelector("#secondName").value,
    age: document.querySelector("#age").value,
  };
}
