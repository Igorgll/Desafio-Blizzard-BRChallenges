const modal = document.getElementById("modal");
const closeModal = document.getElementById("close");
const loginButton = document.getElementById("login_button");

function showModal() {
  modal.classList.add("active");
}

function hideModal() {
  modal.classList.remove("active");
}
