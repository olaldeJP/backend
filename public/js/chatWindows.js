const cerrarButton = document.querySelector("#buttonCerrar");
const form = document.querySelector("#formulario");
const buttonLogin = document.querySelector("#buttonSubmit");
const buttonMessage = document.querySelector("#buttonMessage");
const mensajeI = document.querySelector("#inputMensaje");
const windowsChat = document.querySelector(".windowsMessages");
const socket = io();

//Se guardara el usuario al hacer el Loggin de la ventana
let usuario;

window.addEventListener("load", async () => {
  const user = await fetch("/api/users/current");
  if (user.status === 200) {
    usuario = (await user.json()).user;
  } else {
    alert("LOGIN NECESARIO PARA INGRESAR AL CHAT");
    window.location.href = "/login";
  }
});

//Evento para enviar el mensaje con el usuario a la peticion messagePost en webRouter
buttonMessage.addEventListener("click", async () => {
  const message = inputMensaje.value;
  inputMensaje.value = "";
  if (message) {
    await fetch(`/api/messages/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: usuario.first_name,
        message: `${message}`,
      }),
    });
  }
});

//Socket para enviar los mensajes al windowsChat de chatHandlebars

socket.on("sendMessage", (messages) => {
  if (messages) {
    windowsChat.innerHTML = "";
    for (let index = 0; index < messages.length; index++) {
      const mensaje = document.createElement("p");
      mensaje.innerHTML = `${messages[index].user} :  ${messages[index].message} `;
      windowsChat.appendChild(mensaje);
    }
  }
});
