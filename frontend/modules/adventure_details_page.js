import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const urlParams=new URLSearchParams(search)
  const adventureId=urlParams.get('adventure')
  return adventureId;
  // Place holder for functionality to work in the Stubs

}
//Implementation of fetch call with a paramterized input based on adventure ID
 async function fetchAdventureDetails(adventureId) {
//   // TODO: MODULE_ADVENTURE_DETAILS
//   // 1. Fetch the details of the adventure by making an API call
//     //extract JSON from the http response
//     // do something with myJson

//   // Place holder for functionality to work in the Stubs
  
try {
  const result = await fetch(
    config.backendEndpoint + `/adventures/detail/?adventure=${adventureId}`
  );
  const data = await result.json();
  return data;
} catch (e) {
  return null;
}
  //extract JSON from the http response
  // do something with myJson
}


  // Place holder for functionality to work in the Stubs

//Implementation of fetch call with a paramterized input based on adventure ID


  // Place holder for functionality to work in the Stubs
  
//Implementation of fetch call with a paramterized input based on adventure ID
//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM

  document.getElementById("adventure-name").innerHTML = adventure.name;
  document.getElementById("adventure-subtitle").innerHTML = adventure.subtitle;

  adventure.images.forEach((image, imageIndex) => {
   
    let carouselItemElem = document.createElement("div");
    // let activeClass = imageIndex === 0 ? ' active' : '';
    carouselItemElem.className = `carousel-item${imageIndex === 0 ? ' active' : '' }`;

    carouselItemElem.innerHTML = `<img src=${image} class="activity-card-image" />`
    document.getElementById("photo-gallery").append(carouselItemElem);
  });

  document.getElementById("adventure-content").innerHTML = adventure.content;




}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
document.getElementById("photo-gallery").innerHTML =`
  <div id="carouselExampleIndicators" class="carousel slide">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner"  id="carousel-inners">  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`

images.forEach((image, imageIndex) => {
   
  let carouselItemElem = document.createElement("div");
  // let activeClass = imageIndex === 0 ? ' active' : '';
  carouselItemElem.className = `carousel-item${imageIndex === 0 ? ' active' : '' }`;

  carouselItemElem.innerHTML = `<img src=${image} class="activity-card-image" />`
  document.getElementById("carousel-inners").append(carouselItemElem);
});



}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.

if(adventure.available) {
  document.getElementById("reservation-panel-available").style.display="block";
  document.getElementById("reservation-panel-sold-out").style.display="none";
  document.getElementById("reservation-person-cost").innerHTML=adventure.costPerHead;
}else{
  document.getElementById("reservation-panel-sold-out").style.display="block";
  document.getElementById("reservation-panel-available").style.display="none";
  
}

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field

    document.getElementById("reservation-cost").innerHTML=
    persons*adventure.costPerHead;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".


  const form = document.getElementById("myForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let data = {
      name: form.elements.name.value,
      date: form.elements.date.value,
      person: form.elements.person.value,
      adventure: adventure.id
    };
    send_data(data)
    .then(data =>{
      alert("Success!");
      location.reload();
    })
    .catch(e =>{
      alert("Failed!");
    });
  });
  const send_data = postobj => fetch(config.backendEndpoint + `/reservations/new`, {
        method: "POST",
        body: JSON.stringify(postobj),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
}
//CRIO_SOLUTION_END_MODULE_ADVENTURE_DETAILS



//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  //CRIO_SOLUTION_START_MODULE_ADVENTURE_DETAILS
  if(adventure.reserved){
  document.getElementById("reserved-banner").style.display="block";
}else{
  document.getElementById("reserved-banner").style.display="none";
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
