// ye function Background ke video ke lie he
document.body.innerHTML += `
<video autoplay loop muted src="videos/backgroundvideo.mp4" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            object-fit: cover;
            z-index: -1;
        ""></video>`;

let adminEmail = localStorage.setItem("Email",JSON.stringify("ResturantAdmin@gmail.com"));
let adminPassword = localStorage.setItem("Password", JSON.stringify("admin123"));


// Admin ke Login Karne ke lie ye Function Banaya he 
function getIn() {
  let signinEmail = document.getElementById("signinEmail");
  let signinPassword = document.getElementById("signinPassword");

  let adminEmail = JSON.parse(localStorage.getItem("Email"));
  let adminPassword = JSON.parse(localStorage.getItem("Password"));

  if (signinEmail.value === "" || signinPassword.value === "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Enter Email or Password",
    });
    return;
  }

  // console.log(adminEmail);
  // console.log(signinEmail.value);
  // console.log(adminPassword);
  // console.log(signinPassword.value);

  if (signinEmail.value == adminEmail && signinPassword.value == adminPassword) {
    window.location.href = "AdminPanel.html";
    // console.log("mil gye");
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Invalid email or password!",
    });
  }
}

// ye function Password field ko Show kar raha he 
function showPassword() {
    let changeIcon = document.getElementById("changeIcon");
    let signinPassword = document.getElementById("signinPassword");

    // console.log(signinPassword);
    
    if (signinPassword.type === "password") {
        signinPassword.type = "text";
        changeIcon.innerHTML = `<ion-icon name="lock-open-outline"></ion-icon>`; 
    } else {
        signinPassword.type = "password";
        changeIcon.innerHTML = `<ion-icon name="lock-closed"></ion-icon>`; 
    }
}

// Enter Key ke dab ne se getin Function call hu ga 
document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        // console.log("Enter dab raha he");
        event.preventDefault();
        getIn()
    }
    return
});


let contentArea = document.getElementById("contentArea");




function addResturant(){
  let logo = document.getElementById("Resturantlogo");
  let name = document.getElementById("ResturantName");
  let description = document.getElementById("ResturantDescription");
  let address = document.getElementById("ResturantAddress");
  let number = document.getElementById("ResturantNumber");
  
  let resturantlist = JSON.parse(localStorage.getItem("resturants")) || [];

if (
  !logo.files.length ||
  !name.value ||
  !description.value ||
  !address.value ||
  !number.value
) {
  Swal.fire({
    icon: "warning",
    title: "Missing Fields",
    text: "Please fill all the fields before submitting!",
  });
  return; 
}

let isDuplicate = resturantlist.some(
  (resturant) => resturant.name.toLowerCase() === name.value.trim().toLowerCase()
);

if (isDuplicate) {
  Swal.fire({
    icon: "error",
    title: "Duplicate Name",
    text: "This restaurant name already exists! Please use a different name.",
  });
  return; 
}

  let resturantobj = {};

  resturantobj.logo = URL.createObjectURL(logo.files[0]);
  resturantobj.name = name.value;
  resturantobj.description = description.value;
  resturantobj.address = address.value;
  resturantobj.number = number.value;
  resturantobj.id = new Date().getTime()

  resturantlist.push(resturantobj);

  localStorage.setItem("resturants", JSON.stringify(resturantlist))

  name.value = "";
  description.value = "";
  address.value = "";
  number.value = "";
  logo.value = "";
}

function addDishes(){
  let dlogo = document.getElementById("dishelogo");
  let dname = document.getElementById("disheName");
  let ddescription = document.getElementById("disheDescription");
  let dprice = document.getElementById("dishePrice");
  let dselector = document.getElementById("restaurantSelect");
  
  let disheslist = JSON.parse(localStorage.getItem("dishes")) || [];

if (
  !dlogo.files.length ||
  !dname.value ||
  !ddescription.value ||
  !dprice.value ||
  !dselector.value
) {
  Swal.fire({
    icon: "warning",
    title: "Missing Fields",
    text: "Please fill all the fields before submitting!",
  });
  return; 
}

let isDuplicate = disheslist.some(
  (dishes) => 
    dishes.dname.toLowerCase() === dname.value.trim().toLowerCase() &&
    dishes.dselector === dselector.value
);

if (isDuplicate) {
  Swal.fire({
    icon: "error",
    title: "Duplicate Name",
    text: "This Dishe name already exists! Please use a different name.",
  });
  return; 
}

let dishesobj = {};

dishesobj.dlogo = URL.createObjectURL(dlogo.files[0]);
dishesobj.dname = dname.value;
dishesobj.ddescription = ddescription.value;
dishesobj.dprice = dprice.value;
dishesobj.dselector = dselector.value;

disheslist.push(dishesobj);

localStorage.setItem("dishes", JSON.stringify(disheslist))

dname.value = "";
ddescription.value = "";
dprice.value = "";
dselector.value = "";
dlogo.value = "";
}



function resturant(){
     
  contentArea.innerHTML = 
  `<h1 class="text-center mytext">ADD RESTURANTS</h1>
  <div class="home-section d-flex justify-content-center align-items-center gap-5">
      <img class="animate__animated animate__bounceInDown" src="https://cdn.pixabay.com/animation/2022/08/15/08/47/08-47-41-296_512.gif" alt="Chef-Picture">
      <div class="Resturantclass animate__animated animate__bounceIn">
      
            <input type="file" placeholder="" id="Resturantlogo" required>
            <input type="text" placeholder="Resturant Name" id="ResturantName" required>
            <input type="text" placeholder="Description" id="ResturantDescription" required>
            <input type="text" placeholder="Address" id="ResturantAddress" required>
            <input type="number" placeholder="Contact Number" id="ResturantNumber" required>

        <button onclick="addResturant()" class="resturant-button">Add Resturant</button>
    </div>
  </div>`


}



function dishes(){
     
  contentArea.innerHTML = 
  `<h1 class="text-center mytext">ADD DISHES</h1>
  <div class="home-section d-flex justify-content-center align-items-center gap-5">
  <div class="Resturantclass animate__animated animate__bounceIn">
  
  <input type="file" placeholder="" id="dishelogo" required>
   <input type="text" placeholder="Dishe Name" id="disheName" required>
   <input type="text" placeholder="Description" id="disheDescription" required>
   <input type="number" placeholder="Price" id="dishePrice" required>
    <select class="dropdown" id="restaurantSelect">
        <option value="">Select Restaurant</option>
    </select>

<button onclick="addDishes()" class="resturant-button">Add Dishe</button>
  </div>
  <img class="animate__animated animate__bounceIn" src="https://i.pinimg.com/originals/34/98/31/349831461d6d6e5ad16e348d0baa2f23.gif" alt="Chef-Picture">
  </div>`


 let restaurantSelect = document.getElementById("restaurantSelect");
//  console.log(restaurantSelect); 

 let resturantlist = JSON.parse(localStorage.getItem("resturants")) || [];
 for (let i = 0; i < resturantlist.length; i++) {
   restaurantSelect.innerHTML += `<option value="${resturantlist[i].id}">${resturantlist[i].name}</option>`;
 }
}



function Dashboard() {
  
  contentArea.innerHTML = `<h1 class="text-center mytext">LIST OF RESTURANT AND DISHES</h1>`
}





function OnlineDelivery(){

    Swal.fire({
      title: "🚧 Under Maintenance 🚧",
      text: "We are currently working on the Online Delivery section. Please check back in a while.",
      icon: "warning",
      confirmButtonText: "OK",
      allowOutsideClick: false,
      allowEscapeKey: false
    });
}

function customers(){

  Swal.fire({
    title: "🚧 Under Maintenance 🚧",
    text: "We are currently working on the customers section. Please check back in a while.",
    icon: "warning",
    confirmButtonText: "OK",
    allowOutsideClick: false,
    allowEscapeKey: false
  });
}