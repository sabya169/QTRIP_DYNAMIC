
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it

  console.log("1st in getCityFromUrl",search)


  // at location URL is present
  // location.search always returns query i.e. value after + sign
  let  query = search.split("=")
  // console.log(query)
  // console.log(query[query.length-1])
  const city = query[query.length-1]
  // console.log(city)

  return city
  
 

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data

  
  const url = `${config.backendEndpoint}/adventures?city=${city}`
  // console.log(url)

  try{
    const response = await (await fetch(url)).json();
  console.log("4th sending backend adventure data",response)
  return response;
  }
  catch{
    return null;
  }


}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM

  console.log("16th it will display the sorted cards")
  
  const dataElement = document.querySelector("#data");

  // set the innerHTML of the dataElement to empty
  dataElement.innerHTML = "";

  // loop through each of the adventures and add all of then to DOM
  adventures.forEach((adventure) => {
    // create a colElement which acts as a bootstrap column
    const colElement = document.createElement("div");

    // set the class attribute on the col element
    colElement.setAttribute("class", "col-md-6 col-lg-3 mt-3");

    // cardHTML that need to inserted in bootstrap column
    const cardHTML = `
    <div class='activity-card'>
        <div class='category-banner'>${adventure.category}</div>
        <a id="${adventure.id}" href="detail/?adventure=${adventure.id}">
            <img src=${adventure.image} >
            <div class='activity-card-text p-3 d-flex flex-column justify-content-between'>
                <div class='d-flex justify-content-between'>
                    <h4 class='fs-6 w-75'>${adventure.name}</h4>
                    <span>₹${adventure.costPerHead}</span>
                </div>
                <div class='d-flex justify-content-between'>
                    <h4 class='fs-6'>Duration</h4>
                    <span>${adventure.duration} hours</span>
                </div>
            </div>
        </a>
    </div>
  `;

    // set the innerHTML of colElement to cardHTML
    colElement.innerHTML = cardHTML;

    // append the calElement to dataElement
    dataElement.append(colElement);
  });

}


//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  const filteredList =list.filter(listItem=>{
    return listItem.duration >= low && listItem.duration <= high;
  });

  console.log("12th return the sorted card")
  return filteredList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list


  console.log("7th getting data of category",list , categoryList)

  const filteredList = list.filter(listItem =>{
    return categoryList.includes(listItem.category)
  })
  console.log('8th returning filtered by category list',filteredList)
  return filteredList;
  

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  
  // console.log("filterFunction",filters,list,filters.category)

// when u select some catagory, it will store in filters.catagoty
// let respFromCatFun;

if(filters.category.length !== 0){
  console.log("6th sending category data to filterByCategory",list,filters.category)

  list = filterByCategory(list,filters.category)

  console.log("9th save the getting filtered list from filteredByCategory",list)
  
  // addAdventureToDOM(list)
}

// console.log("test-duration",filters)

console.log("10th now the modified(if modified) list coming from filteredByCategory send to filterByDuration block")

if(filters.duration){
  console.log("when u select some duration",filters.duration)
  // console.log(typeof filters.duration)
  const [low, high] = filters.duration.split("-")

    console.log("11th sending the data to filterByDuration",list,low,high)
  list = filterByDuration(list,low,high)
  // addAdventureToDOM(list)
  console.log("13th save the sorted card data in list")
}

console.log("14th now return the sorted/filtered card data, if not selected anything in category and duration then return the list as it is",list)
return list





  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage

  console.log("save filters to local storage",filters)
  window.localStorage.setItem("filters", JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  console.log("get filters from local storage")
  return JSON.parse(window.localStorage.getItem("filters"));
  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  console.log("pill function",filters)

  const pillItems = document.querySelector("#category-list")
  // pillItems.innerHTML = "";

  // console.log(pillItems)

  filters.category.forEach(items=>{
    const pElem = document.createElement("p")
    pElem.setAttribute("class","category-filter")
    pElem.innerHTML = `
    <span>${items}</span>
    `;
    pillItems.append(pElem)

  })
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
