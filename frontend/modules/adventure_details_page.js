import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  console.log("1st finding id",search)

  let id = search.split("=")
  console.log(id)
  return id[id.length-1]


  // Place holder for functionality to work in the Stubs
  return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  const URL = `${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`;
  console.log(URL)

  try{
   
  const response = await fetch(URL);

  if(response.ok){
    const adventureDetails = await response.json();
    return adventureDetails;
  }
  else{
    throw new Error("error")
  }
  
  }
  catch{
    return null;
  }


  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  // console.log("test",adventure)

  const adventureName = document.querySelector("#adventure-name")
  const adventureSubtitle = document.querySelector("#adventure-subtitle")
  const photoGallery = document.querySelector("#photo-gallery")
  const adventureContent = document.querySelector("#adventure-content")
  


  adventureName.textContent = adventure.name;
  adventureSubtitle.textContent = adventure.subtitle;
  adventureContent.textContent = adventure.content;


  adventure.images.forEach(image=>{
    const imgContainer = document.createElement("div");

    imgContainer.innerHTML =`
    <img src=${image} class="activity-card-image">
    `;
    photoGallery.append(imgContainer);
  })

  

  // const photoGallery = document.getElementById("photo-gallery")
  // // console.log(adventure.images.length)

  // for(let i = 0 ; i < adventure.images.length ; i ++){
  //   const divElem = document.createElement("div")
  //   divElem.setAttribute("class","activity-card-image")

  //   const imgElem = document.createElement("img")
  //   imgElem.setAttribute("src",adventure.images[i])

  //   photoGallery.append(divElem).append(imgElem)
  // }
  
 







  

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  // console.log(images.length)

  const photoGallery = document.querySelector("#photo-gallery")

  photoGallery.innerHTML = `<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
 </div>`


  const mainContainer = document.querySelector(".carousel-inner")
  

 mainContainer.innerHTML = `
 <div class="carousel-item active">
      <img src=${images[0]} class="d-block w-100 activity-card-image" alt="...">
    </div>
 `;
  

 for( let i = 1 ; i < images.length ; i++ ){
    const divElem = document.createElement("div")
    divElem.setAttribute("class","carousel-item")
    divElem.innerHTML = `
    <img src=${images[i]} class="d-block w-100 activity-card-image">
    `
    mainContainer.append(divElem)
 }









}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.

  console.log("test",adventure)

  const reservationPanelAvailable = document.querySelector("#reservation-panel-available")
  const reservationPanelSoldout = document.querySelector("#reservation-panel-sold-out")

  if(adventure.available){
    reservationPanelSoldout.style.display = "none";
    reservationPanelAvailable.style.display = "block";

    const cost =document.querySelector("#reservation-person-cost")
    cost.textContent = adventure.costPerHead;
  }
  else{
    reservationPanelAvailable.style.display = "none"
    reservationPanelSoldout.style.display = "block";
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  console.log("cost",adventure,persons)
  const reservationCost = document.querySelector("#reservation-cost")

  if(persons){
    const person = parseInt(persons)
  // console.log(typeof adventure.costPerHead)
  const cost = person * adventure.costPerHead;

  const costs = cost.toString();
  
  reservationCost.textContent = costs ;
   
  }
  else{
    
   reservationCost.textContent = "0"
 
  }
  

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  console.log("captureform submit",adventure)
  
  const formElement = document.querySelector("#myForm")
  const nameElement = document.querySelector("#form-name")
  const dateElement = document.querySelector("#form-date")
  const personElement = document.querySelector("#form-person")

  console.log(formElement, nameElement, dateElement, personElement)

  formElement.addEventListener("submit", async function(e){
    e.preventDefault();
    const formData = {
      adventure:adventure.id,
      name : nameElement.value,
      date : dateElement.value,
      person : personElement.value,
    }

    const URL = `${config.backendEndpoint}/reservations/new`

    try{
      const reservationResponse = await fetch(URL,{
        method : "POST",
        headers: {
          "Content-type": "application/json",
             },
        body: JSON.stringify(formData)
      })

      if(reservationResponse.ok){
        // Alert the user with a success message and reload the page
        // window.alert("Success");
        // window.location.reload();
      }
      else{
        window.alert("failed")
        throw new Error("error")
      }

    }
    catch(error){
      console.log(error)
      return null
    }
  })

}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  console.log("banner",adventure)

  const reservedBannerElement = document.querySelector("#reserved-banner")
  if(adventure.reserved){
    reservedBannerElement.style.display = "block";
  }
  else{
    reservedBannerElement.style.display = "none";
  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
