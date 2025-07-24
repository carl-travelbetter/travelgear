//Active filters
let activeFilters = [];
let characterFilters = [];
let priceFilters = [];
let typeFilters = [];
let ratingsFilters = [];

//Filtered List
let filteredResults = [];

//filteres additional information
let filteredAdditionalInfo = [];

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
    filteredAdditionalInfo = additionalInfo;
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



//Show the filter options and assign listeners
function showFilters()
{
 //console.log("Showing Filters...");
 const filterTab = document.getElementById("filters");
 filterTab.innerHTML = "";
 const filterTitle = document.createElement("h2");
 filterTitle.textContent = "Search Options";
 filterTab.appendChild(filterTitle);
 
 //tb rating Filters
 const tbRatings = document.createElement("div");
 const tbRatingsHeader = document.createElement("h3");
 tbRatingsHeader.textContent = "Travelbetter Rating";
 tbRatings.appendChild(tbRatingsHeader);

 //Character Filters
 const characterOptions = document.createElement("div");
 const characterOptionsHeader = document.createElement("h3");
 characterOptionsHeader.textContent = "Characters";
 characterOptions.appendChild(characterOptionsHeader);

 //Type Filters
 const typeOptions = document.createElement("div");
 const typeOptionsHeader = document.createElement("h3");
 typeOptionsHeader.textContent = "Type";
 typeOptions.appendChild(typeOptionsHeader);
 

 //load the character filter buttons
 filters.filters.characters.forEach(filter => {
  
  const filterButton = document.createElement("button");
    filterButton.className = "filter-btn";
    filterButton.setAttribute("data-label", filter.id);
    filterButton.innerHTML = `${filter.label}`;

   //Make the button do something when clicked
  filterButton.addEventListener("click", () => {
      filterButton.classList.toggle("active");
    
     characterFilters = Array.from(document.querySelectorAll('.filter-btn.active'))
        .map(btn => btn.dataset.label);

    //Removed any filter calls to use the apply button
    //filterResults(characterFilters, "characters");
    // filterByCharacter(); 
   });  
  //Add character button to the character filters.
  characterOptions.appendChild(filterButton);  
 });

 //load the type filter buttons
 filters.filters.type.forEach(filter => {
  
  const filterButton = document.createElement("button");
    filterButton.className = "filter-btn";
    filterButton.setAttribute("data-label", filter.id);
    filterButton.innerHTML = `${filter.label}`;

   //Make the button do something when clicked
  filterButton.addEventListener("click", () => {
      filterButton.classList.toggle("active");
    
     typeFilters = Array.from(document.querySelectorAll('.filter-btn.active'))
        .map(btn => btn.dataset.label);
    
   });  
  //Add character button to the character filters.
  typeOptions.appendChild(filterButton);  
 });

 //Load the TB ratings buttons
 filters.filters.tbrating.forEach(filter => {
    const filterButton = document.createElement("button");
    filterButton.className = "filter-btn";
    filterButton.setAttribute("data-label", filter.id);
    filterButton.innerHTML = `${filter.label}`;

   //Make the button do something when clicked
  filterButton.addEventListener("click", () => {
      filterButton.classList.toggle("active");
    
     ratingsFilters = Array.from(document.querySelectorAll('.filter-btn.active'))
        .map(btn => btn.dataset.label);
    
   });  
  //Add character button to the character filters.
  tbRatings.appendChild(filterButton);  
 });
 
 filterTab.appendChild(characterOptions);
 filterTab.appendChild(typeOptions);
 filterTab.appendChild(tbRatings);
 // filterTab.appendChild(materialFilters);

 const applyButton = document.getElementById("applyButton");
 applyButton.style.display = "block";
 const clearButton = document.getElementById("clearButton");
 clearButton.style.display = "block";
 
}


//Applying the filters selected one by one after the apply button is pressed.
function applyFilters()
{
  console.log("Apply Filters...");
  //Create a list each time to then filter on if the filter options have been selected

  const characterCases = additionalInfo.filter(suitcase =>
       characterFilters.length === 0 || characterFilters.some(match => suitcase.characters.includes(match))
   );

   //Now take the results of the character cases filter and apply the type filters
   const typeCases = characterCases.filter(suitcase =>
      typeFilters.length === 0 || typeFilters.some(match => suitcase.casetype.includes(match))
    );

   //Now take the results of the type filter and apply the tb ratings filters
   const tbRatingsCases = typeCases.filter(suitcase =>
     ratingsFilters.length === 0 || ratingsFilters.some(match => suitcase.tbrating.includes(match))
    );
 
   //Update the global filtered list
   filteredAdditionalInfo = tbRatingCases;
   loadFilteredResults() 
}




function loadFilteredResults()
{
  console.log("Load Filtered Results...");
   results = document.getElementById("results");
  results.innerHTML = "";

  filteredAdditionalInfo.forEach(match => {
   console.log("Matching Case ASIN = "+match.ASIN);
  });
  
  //lookup a match in the main file and then create the card and append to the results
  filteredResults = itemResults.ItemsResult.Items.filter(item =>
    filteredAdditionalInfo.length === 0 || filteredAdditionalInfo.some(match => item.ASIN.includes(match.ASIN))
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
        filteredAdditionalInfo = additionalInfo;
        loadTopThreeResults();
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
