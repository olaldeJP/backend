async function createAccount() {
  try {
    const dataUser = await getInfoForm();
    const data = JSON.stringify(dataUser);
    const response = await fetch("api/users/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // @ts-ignore
      body: data,
    });
    if (response.status == 201) {
      // el satatus esta bien redirecciona a /
      alert("User Created Success");
      window.location.href = `/`;
    }
  } catch (error) {
    alert("Error to create account");
  }
}
async function getInfoForm() {
  return {
    email: document.querySelector("#emailUser").value,
    password: document.querySelector("#passwordUser").value,
    first_name: document.querySelector("#nameUser").value,
    last_name: document.querySelector("#secondName").value,
    age: document.querySelector("#age").value,
  };
}
