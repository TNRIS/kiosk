// refresh page every 5 min unless active
let idleTime = 0;

const timerIncrement = () => {
  idleTime = idleTime + 1;
  if (idleTime > 10) { // 20 minutes
    window.location.reload();
  }
}

$(document).ready(function () {
  //Increment the idle time counter every second.
  const idleInterval = setInterval(timerIncrement, 1000); // 1 second

  //Zero the idle timer on mouse movement.
  $(this).mousemove(function (e) {
      idleTime = 0;
  });
  $(this).keypress(function (e) {
      idleTime = 0;
  });
});

// switch bottom navigation bar and set card menu to display:none
const switchNav = () => {
  const twdbName = document.getElementById("twdb-name");
  const backToMenu = document.getElementById("back-to-menu");
  const cardMenu = document.getElementById("card-menu");

  if (backToMenu.style.display === "none") {
    backToMenu.style.display = "block";
    twdbName.style.display = "none";
    cardMenu.style.display = "none";
  }
}

// object of app urls to be used in switchToIframe function
const appObj = {
  'flood':'https://map.texasflood.org',
  'swp':'https://2017.texasstatewaterplan.org',
  'meso':'https://www.texmesonet.org/Viewer/?',
  'twdb-site':'https://www.twdb.texas.gov',
  'tnris':'https://tnris.org',
  'water-data':'https://waterdatafortexas.org',
  'water-data-interact':'https://www2.twdb.texas.gov/apps/waterdatainteractive/groundwaterdataviewer',
  'water-hydro':'https://waterdatafortexas.org/coastal/hydrology'
}

// create iframe using app url from appObj and append to body
const switchToIframe = (e) => {
  const url = appObj[e];
  const window = document.createElement("iframe");
  window.src = url;
  document.body.appendChild(window);
}
