let topThreeResults = [];
 fetch('topthree.json')
  .then(response => response.json())
  .then(data => {
    topThreeResults = data;
    console.log("Top Three Results Loaded:", topThreeResults);
    loadTopThreeResults();
  })
  .catch(error => console.error("Error loading item data:", error));

let itemResults = [];
  fetch('disneycases.json')
  .then(response => response.json())
  .then(data => {
    itemResults = data;
    console.log("Disney Suitcase Loaded:", itemResults);
  })
  .catch(error => console.error("Error loading item data:", error));

let additionalInfo = [];
 fetch('gearextras.json')
  .then(response => response.json())
  .then(data => {
    additionalInfo = data;
    console.log("Additional Gear Data Loaded:", additionalInfo);
  })
 .catch(error => console.error("Error loading additional information file:", error));

let filters = [];
fetch('filters.json')
 .then (response => response.json())
 .then(data => {
   filters = data;
   console.log("Filters Loaded...", filters);
 })
 .catch(error => console.error("Error loading filters data:", error));

//Onload function to display the top three items
/*document.addEventListener("DOMContentLoaded", () => {
  console.log("On load function...");
  loadTopThreeResults();

});*/

function showFilters()
{
 console.log("Showing Filters...");
 const filterTab = document.getElementById("filters");
 filterTab.innerHTML = "";
 const filterTitle = document.createElement("h2");
 filterTitle.textContent = "Search Filters";
 filterTab.appendChild(filterTitle);
 filters.forEach(filter => {
  console.log("Filter "+filter.label);
  const filterButton = document.createElement("button");
    filterButton.className = "filter-btn";
    filterButton.setAttribute("data-tag", filter.label);
    filterButton.innerHTML = `${filter.icon} ${filter.label}`;

   //Make the button do something when clicked
  filterButton.addEventListener("click", () => {
      filterButton.classList.toggle("active");
    
     // activeTags = Array.from(document.querySelectorAll('.tag-btn.active'))
       // .map(btn => btn.dataset.tag);
    console.log(filter.label+" Filter Selected"); 
      
   });

  
  filterTab.appendChild(filterButton);
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
