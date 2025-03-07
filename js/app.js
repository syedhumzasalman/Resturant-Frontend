


  let disheslist = JSON.parse(localStorage.getItem("dishes")) || [];
  let resturantlist = JSON.parse(localStorage.getItem("resturants")) || [];
  let cardCarousel = document.getElementById("cardCarousel");
  
  if (resturantlist.length > 0) {
    cardCarousel.innerHTML = resturantlist.map(restaurant => `
      <div class="col-md-4 mt-5">
        <div class="card restaurant-card animate__animated animate__fadeInUp">
          <div class="card-overlay"></div>
          <img src="${restaurant.logo}" class="card-img-top" alt="Restaurant Image">
          <div class="card-body">
            <h5 class="card-title">${restaurant.name}</h5>
            <p class="card-text">${restaurant.description || "No description available."}</p>
            <button  onclick="getRestaurantDishes(${restaurant.id}, disheslist)" class="btn btn-light view-btn">🍽 View Dishes</button>
          </div>
        </div>
      </div>
    `).join("");
  } else {
    cardCarousel.innerHTML = "<p class='text-center text-muted'>No restaurants found</p>";
  }
  
  function getRestaurantDishes(restaurantId, disheslist) {
  
    let restaurantDishes = disheslist.filter(dish => dish.dselector == restaurantId);
    let dishescard = document.getElementById("dishescard");
  
    // console.log("Dishes List: ", disheslist);
    // console.log("Filtering for Restaurant ID: ", restaurantId);
    // console.log("Filtered Dishes: ", restaurantDishes);
  
    if (restaurantDishes.length === 0) {
      Swal.fire({
        title: "Oops!",
        text: "No dishes available for this restaurant.",
        icon: "error",
        confirmButtonText: "Go Back",
        confirmButtonColor: "#ff6b6b",
        backdrop: `
          rgba(255,0,0,0.4)
          url("https://i.gifer.com/7VE.gif")
          left top
          no-repeat
        `
      })
    
      return "";
    }
    
  
    carouselSection.style.display = "none";
    dishescard.style.display = "block";

    dishescard.innerHTML = `
      <button class="btn btn-secondary mb-3" onclick="goBack()">⬅ Back</button>
      <div class="row">
        ${restaurantDishes.map(dish => `
          <div class="col-md-4">
            <div class="card p-2 shadow">
              <img src="${dish.dlogo}" class="card-img-top" style="height: 150px; object-fit: cover;">
              <div class="card-body">
                <h5>${dish.dname}</h5>
                <p>${dish.ddescription}</p>
                <p><strong>Price:</strong> $${dish.dprice}</p>
              </div>
            </div>
          </div>
        `).join("")}
      </div>
    `;
}

// Function to go back
function goBack() {
    document.getElementById("carouselSection").style.display = "block"; // Carousel wapas show
    document.getElementById("dishescard").style.display = "none"; // Dishes hide
}