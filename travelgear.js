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
 

   itemResults.ItemsResult.Items.forEach(item => {
    const gearCard = document.createElement("div");
     gearCard.className = "gearCard";
    const asin = document.createElement("p");
    asin.textContent = item.ASIN;
     gearCard.appendChild(asin);
   const itemImage = document.createElement("img");
       itemImage.src = item.Images.Primary.Large.URL;
       gearCard.appendChild(itemImage);
  //   const buyItLink = document.createElement("a");
  //   buyItLink.href = item.DetailPageURL;
   //  buyItLink.textContent = "Buy It Now";
  //   gearCard.appendChild(buyItLink);
     results.appendChild(gearCard);
   });
}
