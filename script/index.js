const modal = document.getElementById("modal");
const closeModal = document.getElementById("close");
const loginButton = document.getElementById("login_button");
const api = "https://api-brchallenges.vercel.app/api/blizzard/games";
const banner_hero = document.querySelector(".main");
const game_icons = document.getElementById("game_icons");
const game_title = document.getElementById("title");
const game_subtitle = document.getElementById("subtitle");

const games_list = [
  {
    id: 1,
    background: `radial-gradient(72.28% 72.28% at 52.36% 25.95%, rgba(2, 2, 3, 0) 0%,
      #020203 100%
    ), url("./assets/banner-hero/games/diablo-bg.png")`,
    title: "Retorne à escuridão com o game Diablo IV",
    subtitle: "O retorno de Lilith traz uma era de escuridão e sofrimento",
  },

  {
    id: 2,
    background: `radial-gradient(72.28% 72.28% at 52.36% 25.95%, rgba(2, 2, 3, 0) 0%,
    #020203 100%
  ), url("./assets/banner-hero/games/hearthstone-bg.png")`,
    title: "Novo pacote de expansão de Hearthstone",
    subtitle: "A Horda e a Aliança se encontraram no Vale Alterac para lutar",
  },

  {
    id: 3,
    background: `radial-gradient(72.28% 72.28% at 52.36% 25.95%, rgba(2, 2, 3, 0) 0%,
    #020203 100%
  ), url("./assets/banner-hero/games/wow-bg.png")`,
    title: "Desbrave as Terras Sombrias em Shadowlands!",
    subtitle: "O que jaz além do mundo que você conhece?",
  },
];

// set first game as default
banner_hero.style.backgroundImage = games_list[0].background;
game_title.innerHTML = games_list[0].title;
game_subtitle.innerHTML = games_list[0].subtitle;

const first_game = game_icons.firstElementChild;
const first_game_img = first_game.querySelector("img");
first_game_img.style.filter = "grayscale(0)";
console.log(first_game_img);

game_icons.addEventListener("click", (event) => {
  if (
    // checks if the click event was on a img that's inside the games list
    event.target.tagName === "IMG" &&
    event.target.parentNode.tagName === "LI"
  ) {
    const active_game = event.target;
    const id = active_game.getAttribute("data-id");
    const item = games_list.find((item) => item.id === parseInt(id, 10));

    banner_hero.style.backgroundImage = item.background;

    game_title.innerHTML = item.title;
    game_subtitle.innerHTML = item.subtitle;
  }
});

fetch(api)
  .then((response) => response.json())
  .then((data) => {
    const list = document.getElementById("games_list");

    for (const item of data) {
      // iterate over all games from api and display it using innerHTML
      const figure = document.createElement("figure");
      figure.innerHTML = `<div class="game_pics"> 
      <img src=${item.image} loading="lazy" id="game_bg"/>
      <img src=${item.logo} loading="lazy" id="game_logo"/>
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
  // detects the user os and change the download button accordingly
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
