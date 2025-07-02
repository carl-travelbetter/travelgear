function getGear()
{
  console.log("Get Gear...");
  let itemResults = [];
  fetch('disneycases.json')
  .then(response => response.json())
  .then(data => {
    itemResults = data;
    console.log("Disney Suitcase Loaded:", itemResults);
  })
  .catch(error => console.error("Error loading item data:", error));

  results = document.getElementById("results");
  const itemData = document.createElement("p");
  itemData.textContent = "Hello World";
  results.appendChild(itemData);
}
