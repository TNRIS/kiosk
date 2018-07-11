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

const switchToIframe = (e) => {
  const url = appObj[e];
  const window = document.createElement("iframe");
  window.src = url;
  document.body.appendChild(window);
}
