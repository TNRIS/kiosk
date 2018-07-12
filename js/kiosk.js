// refresh page every 10 min unless home card menu active
// ** app iframe does not currently recognize user activity/events
// ** if user active within iframe app, refresh will still occur every 10 min
let idleTime = 0;

const timerIncrement = () => {
  idleTime = idleTime + 1;
  if (idleTime > 9) { // 10 min
    window.location.reload(true);
  }
}

$(document).ready(function () {
  //Increment the idle time counter every second
  const idleInterval = setInterval(timerIncrement, 60000); // 1 min
  //Zero the idle timer on mouse movement
  $(this).mousemove(function (e) {
      idleTime = 0;
  });
  $(this).keypress(function (e) {
      idleTime = 0;
  });
});

// switch bottom navigation bar and set card menu to display:none
const switchNav = () => {
  const backToMenu = document.getElementById("back-to-menu");
  const cardMenu = document.getElementById("card-menu");
  const navLink = document.getElementById("nav-link");
  const navText = document.createTextNode(" Back to Menu");

  // remove card menu to make room for app iframe
  cardMenu.style.display = "none";
  // insert home index.html link for back nav option
  navLink.setAttribute("href", "index.html");
  // insert text on navbar for back nav option
  navLink.appendChild(navText);
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
