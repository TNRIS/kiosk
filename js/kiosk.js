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

const appArray = [
  {id:'flood', url:'https://map.texasflood.org'},
  {id:'swp', url:'https://2017.texasstatewaterplan.org'},
  {id:'meso', url:'http://texmesonet.org'},
  {id:'twdb-site', url:'http://www.twdb.texas.gov'},
  {id:'tnris', url:'https://tnris.org'},
  {id:'water-data', url:'https://waterdatafortexas.org'}
]

const appObj = {
  'flood':'https://map.texasflood.org',
  'swp':'https://2017.texasstatewaterplan.org',
  'meso':'http://texmesonet.org',
  'twdb-site':'http://www.twdb.texas.gov',
  'tnris':'https://tnris.org',
  'water-data':'https://waterdatafortexas.org'
}

const switchToIframe = (e) => {
  console.log(e);

  const url = appObj[e];
  console.log(url);

  const window = document.createElement("iframe");
  window.src = url;
  document.body.appendChild(window);
}
