import { setLocalStorage } from "./utils.mjs";

//Form

document.getElementById("msgForm").addEventListener("submit", function (e) {
  e.preventDefault();
  //formdata

  const firstName = document.getElementById("fname").value;
  const lastName = document.getElementById("Lname").value;
  const email = document.getElementById("email").value;
  const msg = document.getElementById("message").value;

  const formData = {
    name: firstName + " " + lastName,
    email: email,
    message: msg,
  };

  setLocalStorage("formData", formData);

  window.location.href = "form.html";
});
