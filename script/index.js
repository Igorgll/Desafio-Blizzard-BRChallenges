const modal = document.getElementById("modal");
const closeModal = document.getElementById("close");
const loginButton = document.getElementById("login_button");

loginButton.onclick = function () {
  modal.style.display = "block";
  modal.classList.toggle("active");
};

closeModal.onclick = function () {
  modal.classList.remove("active");
  modal.style.display = "none";
};
