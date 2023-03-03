import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const URLParams=new URLSearchParams(search)
  const cityname=URLParams.get("city")
  return cityname;

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
 try {
    const result = await fetch(
      config.backendEndpoint + `/adventures?city=${city}`
    );
    const data = await result.json();
    return data;
  } catch (e) {
    return null;
  }

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
//   // 1. Populate the Adventure Cards and insert those details into the DOM
adventures.forEach((adv) => {
  let divColEle = document.createElement('div');
  divColEle.className = 'col-6 col-lg-3 mb-3';
  divColEle.innerHTML = `
  <a href="detail/?adventure=${adv.id}" id="${adv.id}"> 
    <div class="card">
      <img src="${adv.image}" class="activity-card img"/>
      <div class="category-banner">${adv.category}</div>
      <div class="card-body d-md-flex justify-content-between">
        <h5>${adv.name}</h5>
        <p>₹${adv.costPerHead}</p>
      </div>
      <div class="card-body d-md-flex justify-content-between"> 
        <h5>Duration</h5>
        <p>${adv.duration} Hours</p>
      </div>
    </div>
  </a>`;

  let divRowEle = document.getElementById('data');
  divRowEle.append(divColEle);
});
 
// 1. Populate the Adventure Cards and insert those details into the DOM
// 1. Populate the Adventure Cards and insert those details into the DOM


}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list

  const filteredList = list.filter(    (key) => key.duration > low && key.duration <= high
  );

  return filteredList;

}





//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  const filteredList = list.filter(adventure => categoryList.includes(adventure.category))

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
  console.log(filters);
  let filteredList = [];
  if (filters["duration"].length > 0 && filters["category"].length > 0) {
    let choice = filters["duration"].split("-");
    filteredList = filterByDuration(
      list,
      parseInt(choice[0]),
      parseInt(choice[1])
    );
    filteredList = filterByCategory(filteredList, filters["category"]);
  }

  // 2. Filter by duration only
  else if (filters["duration"].length > 0) {
    let choice = filters["duration"].split("-");
    filteredList = filterByDuration(
      list,
      parseInt(choice[0]),
      parseInt(choice[1])
    );
  }

  // 1. Filter by category only
  else if (filters["category"].length > 0) {
    filteredList = filterByCategory(list, filters["category"]);
  }
  else {
    filteredList = list;
  }
  // Place holder for functionality to work in the Stubs
  return filteredList;



  // Place holder for functionality to work in the Stubs

  // Place holder for functionality to work in the Stubs
  return list;

}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS

  // 1. Store the filters as a String to localStora
  localStorage.setItem("filters",JSON.stringify(filters))


  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS

  // 1. Get the filters from localStorage and return String read as an obje
 //localStorage.getItem(JSON.stringify(filter));
 return JSON.parse(localStorage.getItem("filters"))


  // 1. Get the filters from localStorage and return String read as an object


  // Place holder for functionality to work in the Stubs

}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  document.getElementById("category-list").textContent = "";
  filters.category.forEach((c) => {
    let newChild = document.createElement('option')
    newChild.innerText = c
    newChild.setAttribute('value', c)
    document.getElementById("category-list").appendChild(newChild)
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
