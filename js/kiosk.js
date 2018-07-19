// refresh page every 10 min unless home card menu active
// ** app iframe does not currently recognize user activity/events
// ** if user active within iframe app, refresh will still occur every 10 min
let idleTime = 0;
// let iframe_body = $("#window").contents().find('body')[0];

const timerIncrement = () => {
  idleTime = idleTime + 1;
  if (idleTime > 9) { // 10 min
    window.location.reload(true);
  }
}

$(document).ready(function () {
  // console.log("document loaded.")
  // increment the idle time counter every second
  const idleInterval = setInterval(timerIncrement, 60000); // 1 min

  // $(document).on('click', function () {
  //   // console.log(window.self);
  //   let frame = $("#window").contents();
  //   let iframe = document.getElementByTagName('iframe');
  //   // let frame = $("#window").contents().find('body')[0];
  //   // let frameChildren = frame.childNodes;
  //   // $("#window").contents().find('body')[0];
  //   if (window != top) {
  //     console.log(frame);
  //   }
  // });

  // zero the idle timer on mouse movement
  $(this).mousemove(function (e) {
    idleTime = 0;
  });

  $(this).keypress(function (e) {
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

// switch bottom navigation bar and set card menu to display:none
const switchNav = () => {

  const navDiv = document.getElementById("twdb-name");
  const cardMenu = document.getElementById("card-menu");
  // const backLink = document.createElement("span");

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
  navLink.appendChild(homeText);
  navDiv.appendChild(navLink);

}

// object of app urls to be used in switchToIframe function
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

// 1. create iframe using app url from appObj and append to body
// 2. iterate through iframe and remove a tag attribute target=_blank to stop new tabs from opening
// 3. on click run function again to catch dynamically created react content or similar
// 4. dynamically insert url of iframed app as text on right side of navbar
const switchToIframe = (e) => {
  // 1. create iframe using app url from appObj and append to body
  const url = urlObj[e];
  const urlText = textObj[e];
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
        if ($(this).attr('target')) {
          $(this).removeAttr('target');
        };
      });
    });
  });

  // 4. dynamically insert simplified url of iframed app as text on right side of navbar
  const urlDiv = document.getElementById("nav-url");
  const urlTextNode = document.createTextNode(urlText);
  urlDiv.style.display = "block";
  urlDiv.appendChild(urlTextNode);

}
