import config from "../conf/index.js";

async function init() {
  console.log("starting from init()")
  // console.log("https://43.204.62.129:8082/cities")
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  console.log("got data from fetchCities",cities)
  

  

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
    console.log("in fetchCities")
    const url = `${config.backendEndpoint}/cities`;
  const res = await fetch(url)
  console.log(res)
  return res.json()
  
  }
  catch{
    return null;
  }

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  const ref = document.getElementById("data")
  const advtag = "pages/adventures/?city="+`${id}`
  // console.log(advtag)
  const anchorElem = document.createElement("a")
  anchorElem.setAttribute("href",advtag)
  anchorElem.setAttribute("id",id)
  
  const divElem1 = document.createElement("div")
  divElem1.setAttribute("class", "col-lg-3 col-md-6")
  
  const divElem = document.createElement("div")
  divElem.classList.add("tile")

  const divElem2 = document.createElement("div")
  divElem2.classList.add("tile-text")

  

  const cityElem = document.createElement("h3")
  cityElem.textContent = city.toUpperCase()
  const descriptionElem = document.createElement("p")
  descriptionElem.textContent = description.toUpperCase()
  const imgElem = document.createElement("img")
  imgElem.setAttribute("src",image)

  divElem2.append(cityElem,descriptionElem)
  divElem.append(imgElem,divElem2)
  anchorElem.append(divElem)
  divElem1.append(anchorElem)
  ref.append(divElem1)

 
  




}

export { init, fetchCities, addCityToDOM };
