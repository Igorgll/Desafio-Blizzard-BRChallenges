const modal = document.getElementById("modal");
const closeModal = document.getElementById("close");
const loginButton = document.getElementById("login_button");
const overlay = document.querySelector(".modal_overlay");
const api = "https://api-brchallenges.vercel.app/api/blizzard/games";
const banner_hero = document.querySelector(".main");
const game_icons = document.getElementById("game_icons");
const game_title = document.getElementById("title");
const game_subtitle = document.getElementById("subtitle");
const button = document.getElementById("bannerHero_button");
const game_logo_div = document.getElementById("game_logo_div");
const animation_cover = document.getElementById("animation_cover");
const play_button = document.getElementById("play_button");

const games_list = [
  {
    id: 1,
    background: `radial-gradient(72.28% 72.28% at 52.36% 25.95%, rgba(2, 2, 3, 0) 0%,
      #020203 100%
    ), url("./assets/banner-hero/games/diablo-bg.png")`,
    title: "Retorne à escuridão com o game Diablo IV",
    subtitle: "O retorno de Lilith traz uma era de escuridão e sofrimento",
    button:
      '<img src="./assets/icons/user_icon.svg" alt="user icon"> Jogar agora',
    logo: '<img src="./assets/banner-hero/games/diablo-logo.png" alt="Diablo logo">',
    animation_cover:
      'url("./assets/banner-hero/games/diablo-animation-cover.png")',
    gif: 'url("./assets/banner-hero/games/diablo-animation.gif")',
  },

  {
    id: 2,
    background: `radial-gradient(72.28% 72.28% at 52.36% 25.95%, rgba(2, 2, 3, 0) 0%,
    #020203 100%
  ), url("./assets/banner-hero/games/hearthstone-bg.png")`,
    title: "Novo pacote de expansão de Hearthstone",
    subtitle: "A Horda e a Aliança se encontraram no Vale Alterac para lutar",
    button:
      '<img src="./assets/icons/user_icon.svg" alt="user icon">Reserve agora na pré-venda',
    logo: '<img src="./assets/banner-hero/games/hearthstone-logo.png" alt="Diablo logo">',
    animation_cover:
      'url("./assets/banner-hero/games/hearthstone-animation-cover.png")',
    gif: 'url("./assets/banner-hero/games/hearthstone-animation.gif")',
  },

  {
    id: 3,
    background: `radial-gradient(72.28% 72.28% at 52.36% 25.95%, rgba(2, 2, 3, 0) 0%,
    #020203 100%
  ), url("./assets/banner-hero/games/wow-bg.png")`,
    title: "Desbrave as Terras Sombrias em Shadowlands!",
    subtitle: "O que jaz além do mundo que você conhece?",
    button:
      '<img src="./assets/icons/user_icon.svg" alt="user icon"> Reserve agora na pré-venda',
    logo: '<img src="./assets/banner-hero/games/wow-logo.png" alt="Diablo logo">',
    animation_cover:
      'url("./assets/banner-hero/games/wow-animation-cover.png")',
    gif: 'url("./assets/banner-hero/games/wow-animation_.gif")',
  },
];

// set first game as default
banner_hero.style.backgroundImage = games_list[0].background;
game_title.innerHTML = games_list[0].title;
game_subtitle.innerHTML = games_list[0].subtitle;
button.innerHTML = games_list[0].button;
game_logo_div.innerHTML = games_list[0].logo;
animation_cover.style.backgroundImage = games_list[0].animation_cover;
game_icons.children[0].firstElementChild.classList.add("active_game");

animation_cover.addEventListener("mouseenter", () => {
  play_button.style.display = "none";
  animation_cover.style.backgroundImage = games_list[0].gif;
});

animation_cover.addEventListener("mouseleave", () => {
  play_button.style.display = "flex";
  animation_cover.style.backgroundImage = games_list[0].animation_cover;
});

game_icons.addEventListener("click", (event) => {
  if (
    // checks if the click event was on a img that's inside the games list
    event.target.tagName === "IMG" &&
    event.target.parentNode.tagName === "LI"
  ) {
    const active_game = event.target;

    const listItems = game_icons.querySelectorAll("li img"); // checks if any of li img has "active_game", if so remove it and add it to the event.target
    listItems.forEach(function (img) {
      img.classList.remove("active_game");
    });

    const id = active_game.getAttribute("data-id");
    const item = games_list.find((item) => item.id === parseInt(id, 10));
    active_game.classList.add("active_game");

    banner_hero.style.backgroundImage = item.background;
    game_title.innerHTML = item.title;
    game_subtitle.innerHTML = item.subtitle;
    button.innerHTML = item.button;
    game_logo_div.innerHTML = item.logo;
    animation_cover.style.backgroundImage = item.animation_cover;

    animation_cover.addEventListener("mouseenter", () => {
      play_button.style.display = "none";
      animation_cover.style.backgroundImage = item.gif;
    });

    animation_cover.addEventListener("mouseleave", () => {
      play_button.style.display = "flex";
      animation_cover.style.backgroundImage = item.animation_cover;
    });
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

      const last_div = document.createElement('div');
      last_div.classList.add("last_figure");
      last_div.innerHTML = '<img src="../assets/logo-blizzard.svg" alt="blizzard icon"> <div id="last_figure_text"> <img src="../assets/icons/Group 5-white.svg" alt=""> <p>Ver todos jogos</p>';

      list.appendChild(last_div);
  });

// MODAL
loginButton.addEventListener("click", () => {
  modal.style.display = "block";
  overlay.style.display = "block";
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
  overlay.style.display = "none";
});

overlay.addEventListener("click", () => {
  modal.style.display = "none";
  overlay.style.display = "none";
})

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
