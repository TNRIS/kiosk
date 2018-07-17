// refresh page every 5 min unless home card menu active
// ** app iframe does not currently recognize user activity/events
// ** if user active within iframe app, refresh will still occur every 10 min
let idleTime = 0;

const timerIncrement = () => {
  idleTime = idleTime + 1;
  if (idleTime > 4) { // 5 min
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
  'meso':'https://www.texmesonet.org/Viewer',
  'twdb-site':'https://www.twdb.texas.gov',
  'tnris':'https://tnris.org',
  'water-data':'https://waterdatafortexas.org',
  'water-data-interact':'https://www2.twdb.texas.gov/apps/waterdatainteractive/groundwaterdataviewer',
  'water-hydro':'https://waterdatafortexas.org/coastal/hydrology'
}

// 1. create iframe using app url from appObj and append to body
// 2. iterate through iframe and remove a tag attribute target=_blank to stop new tabs from opening
// 3. dynamically insert url of iframed app as text on right side of navbar
const switchToIframe = (e) => {
  // create iframe
  const url = appObj[e];
  const appWindow = document.createElement("iframe");
  appWindow.id = "window";
  appWindow.src = url;
  document.body.appendChild(appWindow);

  // iterate all anchor tags in iframe and prevent those with target=_blank / new tabs
  $("#window").on('load',function () {
  const iframe_doc = $("#window").contents().find('a');
  console.log(iframe_doc);

  iframe_doc.each(function() {
    if ($(this).attr('target') === '_blank') {
      console.log(this);
      $(this).removeAttr('target');
    };
  });
});

  // insert url text of iframed app
  const urlDiv = document.getElementById("nav-url");
  urlDiv.style.display = "block";
  const urlText = document.createTextNode(url);
  urlDiv.appendChild(urlText);

}
