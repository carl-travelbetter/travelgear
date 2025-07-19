//Active filters
let activeFilters = [];
let activeCharacterFilters = [];

//Filtered List
let filteredResults = [];

//Load my favourite top three results ready for display
let topThreeResults = [];
 fetch('topthree.json')
  .then(response => response.json())
  .then(data => {
    topThreeResults = data;
    console.log("Top Three Results Loaded:", topThreeResults);
    loadTopThreeResults();
  })
  .catch(error => console.error("Error loading item data:", error));

//Full set of Amazon results for the items
let itemResults = [];
  fetch('disneycases.json')
  .then(response => response.json())
  .then(data => {
    itemResults = data;
    console.log("Disney Suitcase Loaded:", itemResults);
  })
  .catch(error => console.error("Error loading item data:", error));

//Additional, TB added information for each suitcase
let additionalInfo = [];
 fetch('gearextras.json')
  .then(response => response.json())
  .then(data => {
    additionalInfo = data;
    console.log("Additional Gear Data Loaded:", additionalInfo);
  })
 .catch(error => console.error("Error loading additional information file:", error));

//Filters to enable search options for the user
let filters = [];
fetch('filters.json')
 .then (response => response.json())
 .then(data => {
   filters = data;
   console.log("Filters Loaded...", filters);
 })
 .catch(error => console.error("Error loading filters data:", error));

let characterFilters = [];
fetch('characterfilters.json')
 .then (response => response.json())
 .then(data => {
  characterFilters = data;
  console.log("Character Filters Loaded...", characterFilters);
 })
 .catch(error => console.error("Error loading character filters:",error));

let priceFilters = [];
fetch('pricefilters.json')
.then(response => response.json())
.then(data => {
 priceFilters = data;
 console.log("Price Filters Loaded...",priceFilters);
})
.catch(error => console.error("Error loading price filters:",error));

let casetypeFilters = [];
fetch('casetype.json')
.then(response => response.json())
.then(data => {
 casetypeFilters = data;
 console.log("Case Type Filters Loaded...",casetypeFilters);
})
.catch(error => console.error("Error loading type filters:",error));


//Show the filter options and assign listeners
function showFilters()
{
 //console.log("Showing Filters...");
 const filterTab = document.getElementById("filters");
 filterTab.innerHTML = "";
 const filterTitle = document.createElement("h2");
 filterTitle.textContent = "Search Options";
 filterTab.appendChild(filterTitle);
 
 //Price Filters
 const priceOptions = document.createElement("div");
 const priceOptionsHeader = document.createElement("h3");
 priceOptionsHeader.textContent = "Price - Up to";
 priceOptions.appendChild(priceOptionsHeader);

 //Character Filters
 const characterOptions = document.createElement("div");
 const characterOptionsHeader = document.createElement("h3");
 characterOptionsHeader.textContent = "Characters";
 characterOptions.appendChild(characterOptionsHeader);

 //console.log("Character Filter Length "+characterFilters.length);
 /*
 characterFilters.forEach(filter => {
  //console.log("Character Filters..."+filter.id);
  const filterButton = document.createElement("button");
    filterButton.className = "filter-btn";
    filterButton.setAttribute("data-label", filter.id);
    filterButton.innerHTML = `${filter.label}`;

   //Make the button do something when clicked
  filterButton.addEventListener("click", () => {
      filterButton.classList.toggle("active");
    
     activeCharacterFilters = Array.from(document.querySelectorAll('.filter-btn.active'))
        .map(btn => btn.dataset.label);
    //console.log(filter.id+" Filter Selected"); 
    console.log("Number of character filters selected "+activeCharacterFilters.length);
    filterResults();
 });
  characterOptions.appendChild(filterButton);
 });*/

  
 
 //Type Filters
 const typeFilters = document.createElement("div");
 const typeFiltersHeader = document.createElement("h3");
 typeFiltersHeader.textContent = "Type of suitcase";
 typeFilters.appendChild(typeFiltersHeader);


 //load the character filter buttons
 filters.characters.forEach(filter => {
  console.log("Filter "+filter.label);
  const filterButton = document.createElement("button");
    filterButton.className = "filter-btn";
    filterButton.setAttribute("data-label", filter.id);
    filterButton.innerHTML = `${filter.label}`;

   //Make the button do something when clicked
  filterButton.addEventListener("click", () => {
      filterButton.classList.toggle("active");
    
     activeFilters = Array.from(document.querySelectorAll('.filter-btn.active'))
        .map(btn => btn.dataset.label);
    console.log(filter.label+" Filter Selected"); 
    console.log("Filter list "+activeFilters.length);
      
   });

  /*
  if (filter.type == "price")
  {
   priceOptions.appendChild(filterButton);
  }
  if (filter.type == "character")
  {
   //characterOptions.appendChild(filterButton);
  }
  if (filter.type == "material")
  {
   materialFilters.appendChild(filterButton);
  }*/
   characterOptions.appendChild(filterButton);
  
  //filterTab.appendChild(filterButton);
 });
 
// filterTab.appendChild(priceOptions);
 filterTab.appendChild(characterOptions);
// filterTab.appendChild(materialFilters);

 const applyButton = document.getElementById("applyButton");
 applyButton.style.display = "block";
 const clearButton = document.getElementById("clearButton");
 clearButton.style.display = "block";
 
}

//Function to apply the selected filter and refine the results. 
function filterResults()
{
  console.log("Filtering Results...");
  //Use the filter array to go through the extra info and find the matching ASIN numbers,
  //Take that list of ASIN numbers and create the relevant cards from the travelgear data
  
   let count = 0;
   activeCharacterFilters.forEach(item => {
    count++;
    console.log("Active Character Filter.."+item+" count"+count);
   });
 
   const matchingCases = additionalInfo.filter(suitcase =>
    activeCharacterFilters.length === 0 || activeCharacterFilters.every(match => suitcase.characters.includes(match))
  );

  
   let matchLength = matchingCases.length;
   console.log("Matching Cases Length..."+matchLength);
   if (matchLength > 0)
   {
     loadFilteredResults(matchingCases);
   }
   else
   {
     results = document.getElementById("results");
     results.innerHTML = "";
     const noMatchMessage = document.createElement("p");
     noMatchMessage.textContent = "No Matches Found";
     results.appendChild(noMatchMessage);
   }
 
 /*
  if (matchingCases.length === 0) {
    container.innerHTML = "<p>No routes match your selected needs.</p>";
    return;
  }*/
   
 
}

function loadFilteredResults(matchingCases)
{
  console.log("Load Filtered Results...");
   results = document.getElementById("results");
  results.innerHTML = "";

  matchingCases.forEach(match => {
   console.log("Matching Case ASIN = "+match.ASIN);
  });
 
  let arrayCheck = Array.isArray(itemResults.ItemsResult.Items);
  console.log("Array Check on Item Results items = "+arrayCheck);
 
  //lookup a match in the main file and then create the card and append to the results
  filteredResults = itemResults.ItemsResult.Items.filter(item =>
    matchingCases.length === 0 || matchingCases.some(match => item.ASIN.includes(match.ASIN))
  );

 console.log("Size of filtered results array = "+filteredResults.length);
 
  filteredResults.forEach(item => {
    const gearCard = document.createElement("div");
     gearCard.className = "gearCard";
    const asin = document.createElement("p");
    asin.className = "product-info";
    asin.textContent = item.ASIN;
    gearCard.appendChild(asin);
    const itemImage = document.createElement("img");
    itemImage.className = "product-image"; 
       itemImage.src = item.Images.Primary.Large.URL;
       gearCard.appendChild(itemImage);
    const buyItLink = document.createElement("a");
     //buyItLink.className = "product-info";
     buyItLink.href = item.DetailPageURL;
     buyItLink.target = "_blank";
     //buyItLink.textContent = "Buy It Now";
     const buyItButton = document.createElement("button");
     buyItButton.className = "buyit-button";
     buyItButton.textContent = "Buy It Now";
     buyItLink.appendChild(buyItButton);
     gearCard.appendChild(buyItLink);
     const price = document.createElement("p");
     price.className = "product-info";
     price.textContent = "Price "+item.Offers.Listings[0].Price.DisplayAmount;
     gearCard.appendChild(price);
  
     //Add additional information, if found
     additionalInfo.forEach(entry => {
       const asinLookup = entry.ASIN;
       console.log("Additional ASIN Lookup "+asinLookup);
       if (asinLookup == item.ASIN)
       {
         console.log("***Match Found***");
         const infoHeader = document.createElement("h2");
         infoHeader.textContent = "Additional Information";
         infoHeader.className = "product-info";
         gearCard.appendChild(infoHeader);
         const notes = document.createElement("p");
         notes.className = "product-info";
         notes.textContent = entry.notes;
         gearCard.appendChild(notes);
       }
       else
       {
         console.log("No Match Found");
       }
       
     });
     
     results.appendChild(gearCard);
   });
}

function clearFilters()
{
  console.log("clear Filters...");
  document.querySelectorAll('.filter-btn.active').forEach(btn => {
        btn.classList.remove('active');
        activeFilters = [];
      });
}


function loadTopThreeResults()
{
  console.log("Load Top Three Results...");
   results = document.getElementById("results");
  results.innerHTML = "";

  topThreeResults.ItemsResult.Items.forEach(item => {
    const gearCard = document.createElement("div");
     gearCard.className = "gearCard";
    const asin = document.createElement("p");
    asin.className = "product-info";
    asin.textContent = item.ASIN;
    gearCard.appendChild(asin);
    const itemImage = document.createElement("img");
    itemImage.className = "product-image"; 
       itemImage.src = item.Images.Primary.Large.URL;
       gearCard.appendChild(itemImage);
    const buyItLink = document.createElement("a");
     //buyItLink.className = "product-info";
     buyItLink.href = item.DetailPageURL;
     buyItLink.target = "_blank";
     //buyItLink.textContent = "Buy It Now";
     const buyItButton = document.createElement("button");
     buyItButton.className = "buyit-button";
     buyItButton.textContent = "Buy It Now";
     buyItLink.appendChild(buyItButton);
     gearCard.appendChild(buyItLink);
     const price = document.createElement("p");
     price.className = "product-info";
     price.textContent = "Price "+item.Offers.Listings[0].Price.DisplayAmount;
     gearCard.appendChild(price);
  
     //Add additional information, if found
     additionalInfo.forEach(entry => {
       const asinLookup = entry.ASIN;
       console.log("Additional ASIN Lookup "+asinLookup);
       if (asinLookup == item.ASIN)
       {
         console.log("***Match Found***");
         const infoHeader = document.createElement("h2");
         infoHeader.textContent = "Additional Information";
         infoHeader.className = "product-info";
         gearCard.appendChild(infoHeader);
         const notes = document.createElement("p");
         notes.className = "product-info";
         notes.textContent = entry.notes;
         gearCard.appendChild(notes);
       }
       else
       {
         console.log("No Match Found");
       }
       
     });
     
     results.appendChild(gearCard);
   });
 
}


function getGear()
{
  console.log("Get Gear...");
  

  results = document.getElementById("results");
  results.innerHTML = "";
  const itemData = document.createElement("p");
 

   itemResults.ItemsResult.Items.forEach(item => {
    const gearCard = document.createElement("div");
     gearCard.className = "gearCard";
    const asin = document.createElement("p");
    asin.textContent = item.ASIN;
     gearCard.appendChild(asin);
   const itemImage = document.createElement("img");
    itemImage.className = "product-image"; 
       itemImage.src = item.Images.Primary.Large.URL;
       gearCard.appendChild(itemImage);
   const buyItLink = document.createElement("a");
     buyItLink.href = item.DetailPageURL;
     buyItLink.target = "_blank";
     const buyItButton = document.createElement("button");
     buyItButton.className = "buyit-button";
     buyItButton.textContent = "Buy It Now";
     buyItLink.appendChild(buyItButton);
     gearCard.appendChild(buyItLink);
     const price = document.createElement("p");
     price.textContent = item.Offers.Listings[0].Price.DisplayAmount;
     gearCard.appendChild(price);
  
     //Add additional information, if found
     additionalInfo.forEach(entry => {
       const asinLookup = entry.ASIN;
       console.log("Additional ASIN Lookup "+asinLookup);
       if (asinLookup == item.ASIN)
       {
         console.log("***Match Found***");
         const infoHeader = document.createElement("h2");
         infoHeader.textContent = "Additional Information";
         gearCard.appendChild(infoHeader);
         const notes = document.createElement("p");
         notes.textContent = entry.notes;
         gearCard.appendChild(notes);
       }
       else
       {
         console.log("No Match Found");
       }
       
     });
     
     results.appendChild(gearCard);
   });
}
