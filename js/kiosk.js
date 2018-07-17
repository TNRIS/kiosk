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
  const navDiv = document.getElementById("twdb-name");
  const cardMenu = document.getElementById("card-menu");
  const backLink = document.createElement("a");
  const backText = document.createTextNode(" Back");
  const backImage = document.createElement("img");

  // remove card menu for app iframe
  cardMenu.style.display = "none";
  // insert href link for back nav option & class for text style
  backLink.setAttribute("href", "javascript:history.back()");
  backLink.setAttribute("class", "navbar-brand nav-text");
  // set back image attributes
  backImage.setAttribute("src", "/css/img/back.png");
  backImage.setAttribute("class", "back-image");
  // append back nav elemnts to div
  backLink.appendChild(backImage);
  backLink.appendChild(backText);
  navDiv.appendChild(backLink);
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
// 3. on click run function again to catch dynamically created react content or similar
// 4. dynamically insert url of iframed app as text on right side of navbar
const switchToIframe = (e) => {
  // 1. create iframe using app url from appObj and append to body
  const url = appObj[e];
  const appWindow = document.createElement("iframe");

  appWindow.id = "window";
  appWindow.src = url;
  document.body.appendChild(appWindow);

  // 2. iterate through iframe and remove a tag attribute target=_blank to stop new tabs from opening
  $("#window").on('load',function () {
    let iframe_doc = $("#window").contents().find('a');

    iframe_doc.each(function() {
      if ($(this).attr('target') === '_blank') {
        $(this).removeAttr('target');
      };
    });

    // 3. on click run function again to catch dynamically created react content or similar
    let iframe_body = $("#window").contents().find('body')[0];

    $(iframe_body).on('click', function () {
      let iframe_doc = $("#window").contents().find('a');
      iframe_doc.each(function() {
        if ($(this).attr('target') === '_blank') {
          $(this).removeAttr('target');
        };
      });
    });
  });

  // 4. dynamically insert url of iframed app as text on right side of navbar
  const urlDiv = document.getElementById("nav-url");
  const urlText = document.createTextNode(appWindow.src);
  urlDiv.style.display = "block";
  urlDiv.appendChild(urlText);

}
