import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  const URL = `${config.backendEndpoint}/reservations/`
  
  try{
    const response = await fetch(URL);

    if(response.ok){
      const jsonResponse = await response.json();
      return jsonResponse;
    }
    else{
      throw new Error("error")
    }
  }
  catch(error){
    console.log("error");
    return null
  }



  // Place holder for functionality to work in the Stubs
  return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent


  console.log(reservations)
  const noReservationBanner = document.querySelector("#no-reservation-banner")
  const parentReservationTable = document.querySelector("#reservation-table-parent")

  if(reservations.length === 0){
    noReservationBanner.style.display = "block";
    parentReservationTable.style.display = "none"
  }
  else{
    noReservationBanner.style.display = "none";
    parentReservationTable.style.display = "block"
  }

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

    const reservationTable = document.querySelector("#reservation-table")
 reservations.forEach(reservation=>{

  
  const localTime = new Date(reservation.time).toLocaleString('en-IN', {dateStyle: "long", timeStyle: "medium" }).replace(' at', ',');
  const localDate = new Date(reservation.date).toLocaleDateString("en-IN");
  
  console.log(localTime)
  console.log(localDate)

  const tableRowElement = document.createElement("tr")

  tableRowElement.innerHTML=`
  
  <td>${reservation.id}</td>
  <td>${reservation.name}</td>
  <td>${reservation.adventureName}</td>
  <td>${reservation.person}</td>
  <td>${localDate}</td>
  <td>${reservation.price}</td>
  <td>${localTime}</td>
  <td id="${reservation.id}"><a class="reservation-visit-button" href="../detail/?adventure=${reservation.adventure}">Visit Adventure</a></td>


  `
  reservationTable.append(tableRowElement)

 })


}

export { fetchReservations, addReservationToTable };
