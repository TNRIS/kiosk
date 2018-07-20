// REFRESH MAIN MENU PAGE EVERY 10 MIN UNLESS USER ACTIVE
let idleTime = 0;

const timerIncrement = () => {
  idleTime = idleTime + 1;
  if (idleTime > 2) { // 10 min
    window.location.reload(true);
  }
}

$(document).ready(function () {
  // increment the idle time counter every second
  const idleInterval = setInterval(timerIncrement, 1000); // 1 min

  // zero the idle timer on activity at main menu
  $(this).mousemove(function (e) {
    idleTime = 0;
  });

  $(this).keypress(function (e) {
    idleTime = 0;
  });

  $(this).click(function (e) {
    idleTime = 0;
  });
});

// BACK BUTTON FUNCTION COMMENTED OUT - WORK IN PROGRESS
// const goBack = () => {
//   let iframeWindow = document.getElementById("window");
//   console.log(iframeWindow.contentWindow.location.href);
//   window.history.back();
//   // iframeWindow.contentWindow.history.back();
//   iframeWindow = document.getElementById("window");
//   console.log(iframeWindow.src);
//   console.log(iframeWindow.contentWindow.location.href);
  // if (iframeWindow.contentWindow.location.href === "https://tnris.org/") {
  //   console.log("tnris.org");
  // }
  // if (iframeWindow) {
  //   iframeWindow.contentWindow.history.back();
  //   console.log(iframeWindow.contentWindow.location.href);
  // }
  // else {
  //   window.history.back();
  // }
// }

// SWITCH BOTTOM NAV BAR AND SET CARD MENU TO DISPLAY = NONE
const switchNav = () => {

  const navDiv = document.getElementById("twdb-name");
  const cardMenu = document.getElementById("card-menu");
  // const backLink = document.createElement("span");

  const homeSpan = document.createElement("span");
  const homeText = document.createTextNode(" Back to Home");
  // const backArrow = document.createElement("i");
  const home = document.getElementById("home");
  // const brandImage = document.getElementById("brand-image");
  const navLink = document.getElementById("nav-link");

  // replace twdb logo with home button
  // brandImage.parentNode.removeChild(brandImage);
  navLink.setAttribute("href", "/");
  // home.setAttribute("class", "fa fa-2x fa-home");
  $(home).removeClass("fa-disabled");

  // remove card menu for app iframe
  cardMenu.style.display = "none";

  // insert dummy href link for back nav option, class for text style, & goBack function
  // backLink.setAttribute("onclick", "goBack()");
  // backLink.setAttribute("href", "#");
  // backLink.setAttribute("class", "navbar-brand nav-text");
  // homeText.setAttribute("class", "nav-text");

  // set back arrow class attribute for fa
  // backArrow.setAttribute("class", "fa fa-2x fa-angle-double-left");

  // append back nav elemnts to div
  navLink.appendChild(home);
  // backLink.appendChild(backArrow);
  homeSpan.appendChild(homeText);
  navLink.appendChild(homeSpan);
  navDiv.appendChild(navLink);

}

// APP URLS FOR SWITCHTOIFRAME FUNCTION
const urlObj = {
  'flood':'https://map.texasflood.org',
  'swp':'https://2017.texasstatewaterplan.org',
  'meso':'https://www.texmesonet.org/Viewer',
  'twdb-site':'https://www.twdb.texas.gov',
  'tnris':'https://tnris.org',
  'water-data':'https://waterdatafortexas.org',
  'water-data-interact':'https://www2.twdb.texas.gov/apps/waterdatainteractive/groundwaterdataviewer',
  'water-hydro':'https://waterdatafortexas.org/coastal/hydrology'
}
// SIMPLIFIED URLS FOR NAVBAR - USED FOR APP REFERENCE
const textObj = {
  'flood':'map.texasflood.org',
  'swp':'texasstatewaterplan.org',
  'meso':'www.texmesonet.org',
  'twdb-site':'www.twdb.texas.gov',
  'tnris':'tnris.org',
  'water-data':'waterdatafortexas.org',
  'water-data-interact':'www2.twdb.texas.gov/apps/waterdatainteractive',
  'water-hydro':'waterdatafortexas.org'
}

// 1. CREATE IFRAME USING URLOBJ AND APPEND TO BODY
// 2. SEARCH IFRAME AND REMOVE <A> ATTRIBUTE TARGET TO PREVENT NEW TABS FROM OPENING
// 3. ON CLICK RUN FUNCTION AGAIN TO CATCH DYNAMICALLY CREATED REACT.JS CONTENT OR SIMILAR
// 4. DYNAMICALLY INSERT URL OF IFRAMED APP AS TEXT/LABEL ON RIGHT SIDE OF NAVBAR
const switchToIframe = (e) => {
  // 1.
  const url = urlObj[e];
  const urlText = textObj[e];
  const appWindow = document.createElement("iframe");

  appWindow.id = "window";
  appWindow.src = url;
  document.body.appendChild(appWindow);

  // 2.
  $("#window").on('load',function () {
    let iframe_doc = $("#window").contents().find('a');
    iframe_doc.each(function() {
      if ($(this).attr('target')) {
        $(this).removeAttr('target');
      };
    });

    // 3.
    let iframe_body = $("#window").contents().find('body')[0];
    $(iframe_body).on('click', function () {
      idleTime = 0; // reset idleTime to zero when user clicks in app iframe
      iframe_doc.each(function() {
        if ($(this).attr('target')) {
          $(this).removeAttr('target');
        };
      });
    });
  });

  // 4.
  const urlDiv = document.getElementById("nav-url");
  const urlTextNode = document.createTextNode(urlText);
  urlDiv.style.display = "block";
  urlDiv.appendChild(urlTextNode);

}
