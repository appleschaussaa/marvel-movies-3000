/* we can grab the query string using below method */
let queryString = window.location.search;
/* URLSearchParams is used to parse the query string's parameter */
/* we are parsoing it so that we will ghet the name without any space(URL encoded) */
let urlParams = new URLSearchParams(queryString);
/* getting the name in particular */
let characterName = urlParams.get("name");
/* below line is used to display the charactername as title of this webpage */
document.title = characterName;
/* fetching character details using marvel API using below logic */
var marvelPublicKey = "404dba227267b0de961684a075bf34fd";
var marvelPrivateKey = "39adbe8bcae7bda20123e25d14346c492ffa4ca2";
window.onload = async () => {
  let timeStamp = dayjs().unix();
  let hash = md5(timeStamp + marvelPrivateKey + marvelPublicKey);
  let marvelApi =
    "https://gateway.marvel.com:443/v1/public/characters?name=" +
    characterName +
    "&apikey=404dba227267b0de961684a075bf34fd&ts=" +
    timeStamp +
    "&hash=" +
    hash;
  await fetch(marvelApi)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      result = data;
    });
  if (result && result.data && result.data.results.length > 0) {
    let characterDetails = result.data.results[0];
    let image =
      characterDetails.thumbnail.path +
      "." +
      characterDetails.thumbnail.extension;
    let characterBio = characterDetails.description;
    let characterComic = characterDetails.comics.items;
    let characterSeriesList = characterDetails.series.items;

    /* updating character title dynamically in header scetion */
    document.querySelector("#banner-text").textContent = characterName;
    /* updating character image */
    document.querySelector("#character-image").setAttribute("src", image);
    /* updating character bio */
    document.querySelector("#character-description").textContent = characterBio;

    /* using for loop to get the comic appearances since it is an array of objects */
    let characterComicAppearnce = "";
    for (let i = 0; i < characterComic.length; i++) {
      characterComicAppearnce += `<li>${characterComic[i].name}</li>`;
    }
    /* updating comic apperances as list */
    document.querySelector("#character-appearance").innerHTML =
      characterComicAppearnce;
    let characterSeries = "";
    for (let i = 0; i < characterSeriesList.length; i++) {
      characterSeries += `<li>${characterSeriesList[i].name}</li>`;
    }
    /* updating comic apperances as list */
    document.querySelector("#character-series").innerHTML = characterSeries;
  }
};