document
  .querySelector("#formularioDos")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      const newPassword = JSON.stringify({
        password: document.querySelector("#newPassword").value,
      });
      const path = window.location.pathname;
      const token = path.slice(8);
      const response = await fetch(`/api/users/changePassword/${token}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        // @ts-ignore
        body: newPassword,
      }).then(async (res) => {
        return await res.json();
      });
      if (response.status === "success") {
        alert("Password Update Success");
        window.location.href = `/`;
      }
    } catch (error) {
      alert(error.message);
    }
  });
