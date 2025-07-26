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
   loadFilters();
 })
 .catch(error => console.error("Error loading filters data:", error));


//Show the filter options and assign listeners
function loadFilters()
{
 //console.log("Showing Filters...");
 const filterTab = document.getElementById("filters");
 
 //Commented out this option for now to enable the fitler options to remain in place when hiding the options
 //filterTab.innerHTML = "";
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

 
 
}

//Function to allow users to hide the filter options
function showFilters()
{
   console.log("Hiding Filters");
   const filterTab = document.getElementById("filters");
   filterTab.style.display = "block";

   const filterButtonBar = document.getElementById("controls");
  filterButtonBar.style.display = "block";
  const applyButton = document.getElementById("applyButton");
  applyButton.style.display = "block";
  const clearButton = document.getElementById("clearButton");
  clearButton.style.display = "block";
  const hideButton = document.getElementById("hideFilters");
  hideButton.style.display = "block";
}

//Function to allow users to hide the filter options
function hideFilters()
{
   console.log("Hiding Filters");
   const filterTab = document.getElementById("filters");
   filterTab.style.display = "hidden";

  const filterButtonBar = document.getElementById("controls");
  filterButtonBar.style.display = "hidden";
  const applyButton = document.getElementById("applyButton");
  applyButton.style.display = "hidden";
  const clearButton = document.getElementById("clearButton");
  clearButton.style.display = "hidden";
  const hideButton = document.getElementById("hideFilters");
  hideButton.style.display = "hidden";
}


//Applying the filters selected one by one after the apply button is pressed.
function applyFilters()
{
  console.log("Apply Filters...");
  //Create a list each time to then filter on if the filter options have been selected
  console.log("Additional Info length "+additionalInfo.length);
 
  const characterCases = additionalInfo.filter(suitcase =>
       characterFilters.length === 0 || characterFilters.some(match => suitcase.characters.includes(match))
   );

  console.log("Character Cases Length "+characterCases.length);

   //Now take the results of the character cases filter and apply the type filters
   const typeCases = characterCases.filter(suitcase =>
      typeFilters.length === 0 || typeFilters.some(match => suitcase.casetype.includes(match))
    );

   console.log("Type Cases Length "+typeCases.length);

   //Now take the results of the type filter and apply the tb ratings filters
   const tbRatingsCases = typeCases.filter(suitcase =>
     ratingsFilters.length === 0 || ratingsFilters.some(match => suitcase.tbrating.includes(match))
    );

   console.log("TB Ratings Cases Length "+typeCases.length);
 
   //Update the global filtered list
   filteredAdditionalInfo = tbRatingsCases;
   console.log("Filtered Additional Info Length "+filteredAdditionalInfo.length);

   if (filteredAdditionalInfo.length === 0)
   {
     results = document.getElementById("results");
     results.innerHTML = "";
     const noMatchMessage = document.createElement("p");
     noMatchMessage.className = "nomatch";
     noMatchMessage.textContent = "No Matches Found - reset filters";
     results.appendChild(noMatchMessage); 
   }
   else
   {
     loadFilteredResults();
   }
    
}



//Refresh the results based on the latest set of filters selected
function loadFilteredResults()
{
  console.log("Load Filtered Results...");
   results = document.getElementById("results");
  results.innerHTML = "";

 
  
  //lookup a match in the main file and then create the card and append to the results
  filteredResults = itemResults.ItemsResult.Items.filter(item =>
    filteredAdditionalInfo.length === 0 || filteredAdditionalInfo.some(match => item.ASIN.includes(match.ASIN))
  );

 
 
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
     price.textContent = "Indicative Price* "+item.Offers.Listings[0].Price.DisplayAmount;
     gearCard.appendChild(price);
  
     //Add additional information, if found
     additionalInfo.forEach(entry => {
       const asinLookup = entry.ASIN;
       
       if (asinLookup == item.ASIN)
       {
         //console.log("***Match Found***");
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
        // console.log("No Match Found");
       }
       
     });
     
     results.appendChild(gearCard);
   });
}

//Clear all filters and reload all results
function clearFilters()
{
  console.log("clear Filters...");
  document.querySelectorAll('.filter-btn.active').forEach(btn => {
        btn.classList.remove('active');
        
      });
 
        characterFilters = [];
        typeFilters = [];
        ratingsFilters = [];
        filteredAdditionalInfo = additionalInfo;
        loadFilteredResults();
}

//Return the top three results as selected by Travelbetter
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
       
       if (asinLookup == item.ASIN)
       {
         
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
         //console.log("No Match Found");
       }
       
     });
     
     results.appendChild(gearCard);
   });
 
}

//Return all results in the main items list (show all)
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
       
       if (asinLookup == item.ASIN)
       {
         
         const infoHeader = document.createElement("h2");
         infoHeader.textContent = "Additional Information";
         gearCard.appendChild(infoHeader);
         const notes = document.createElement("p");
         notes.textContent = entry.notes;
         gearCard.appendChild(notes);
       }
       else
       {
         //console.log("No Match Found");
       }
       
     });
     
     results.appendChild(gearCard);
   });
}
