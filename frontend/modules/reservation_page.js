import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them

  try {
    let res = await fetch(`${config.backendEndpoint}/reservations`);
    let data = await res.json();
    console.log(data);
    return data
  } catch (err) {
    return null;
  }
  
}

  // Place holder for functionality to work in the Stubs
  // Place holder for functionality to work in the Stubs
//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  //Conditionally render the no-reservation-banner and reservation-table-parent
  if(reservations.length === 0){
    document.getElementById("no-reservation-banner").style.display = "block";
    document.getElementById("reservation-table-parent").style.display = "none";
  }
  else{
    document.getElementById("no-reservation-banner").style.display = "none";
    document.getElementById("reservation-table-parent").style.display = "block";
  }
  let thead = document.getElementById("reservation-table")
  reservations.forEach(item => {
    let dateinput = new Date(item.date);
    let date = dateinput.toLocaleDateString("en-IN");
    let day = new Date(item.time);
    let booking_date = day.toLocaleString("en-IN",{
    day: "numeric",
    year: "numeric",
    month: "long",
    });
    let booking_time = day.toLocaleString("en-IN",{
      hour: "numeric",
      minute:"numeric",
      second:"numeric",
      });
      thead.innerHTML += `
      <tr>
        <td><b>${item.id}</b></td>
        <td>${item.name}</td>
        <td>${item.adventureName}</td>
        <td>${item.person}</td>
        <td>${date}</td>
        <td>${item.price}</td>
        <td>${booking_date}, ${booking_time}</td>
        <td><button class="reservation-visit-button" id=${item.id} style=border:none><a href="../detail/?adventure=${item.adventure}">View Adventure</a></button></td>
      </tr>
      `;
    });  
}
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
export { fetchReservations, addReservationToTable };
