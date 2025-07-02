let itemResults = [];
  fetch('disneycases.json')
  .then(response => response.json())
  .then(data => {
    itemResults = data;
    console.log("Disney Suitcase Loaded:", itemResults);
  })
  .catch(error => console.error("Error loading item data:", error));

function getGear()
{
  console.log("Get Gear...");
  

  results = document.getElementById("results");
  const itemData = document.createElement("p");
  itemData.textContent = "Length "+itemResults.length;
  results.appendChild(itemData);
}
