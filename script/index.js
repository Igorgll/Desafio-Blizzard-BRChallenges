const modal = document.getElementById("modal");
const closeModal = document.getElementById("close");
const loginButton = document.getElementById("login_button");
const api = "https://api-brchallenges.vercel.app/api/blizzard/games";

fetch(api)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    const list = document.getElementById("games_list");

    for (const item of data) {
      const figure = document.createElement("figure");
      figure.innerHTML = `<div class="game_pics"> 
      <img src=${item.image} id="game_bg"/>
      <img src=${item.logo} id="game_logo"/>
      </div>
      <figcaption>${item.name}
      <br>
      <span>${item.category}</span>
      </figcaption>`;

      list.appendChild(figure);
    }
  });

function showModal() {
  modal.classList.add("active");
}

function hideModal() {
  modal.classList.remove("active");
}

function detectOs() {
  const userAgent = navigator.userAgent;
  const button_div = document.getElementById("download_button_div");

  if (userAgent.indexOf("Mac OS X") !== -1) {
    button_div.innerHTML =
      '<button type="button"> <img src="../assets/icons/apple_icon.svg" alt="MacOS"> Baixar para o MacOs </button>';
    return "MAC OS X";
  } else if (userAgent.indexOf("Windows") !== -1) {
    button_div.innerHTML =
      '<button type="button"> <img src="../assets/icons/windows_icon.svg" alt="Windows"> Baixar para o Windows </button>';
    return "Windows";
  } else if (userAgent.indexOf("Linux") !== -1) {
    button_div.innerHTML =
      '<button type="button"> <img src="../assets/icons/linux_icon.svg" alt="Linux"> Baixar para o Linux </button>';
    return "Linux";
  } else {
    button_div.innerHTML =
      '<button type="button"> Baixar o battle.net </button>';
    return "Unknown Operating System";
  }
}

detectOs();
