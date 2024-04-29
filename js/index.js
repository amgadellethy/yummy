// side bar effects


const sideWidth = $(".sidebar-links").innerWidth();
// console.log($(".sidebar-links ul"))
$(".sidebar-links").css({ left: `-${sideWidth}px` });
$(".icon-content").css({ left: 0 });





//  closed when clicked open
function openSide() {
  $(".icon-content").animate({ left: `${sideWidth}px` });
  $(".sidebar-links").animate({ left: 0 }, function () {
    $(".sidebar-links ul li").slideDown(500);
  });

  $(".toggle").addClass("d-none");
  $(".close-icon").removeClass("d-none");
}

$(".toggle").on("click", openSide);



// opened when clicking close

function closeSide() {
  $(".sidebar-links ul li").slideUp(100, function () {
    $(".sidebar-links").animate({ left: `-${sideWidth}px` });
    $(".icon-content").animate({ left: 0 });
  });

  $(".toggle").removeClass("d-none");
  $(".close-icon").addClass("d-none");
}
  $(".close-icon").on("click", closeSide);


//  home page ---------------------
// HTML Element ----------------
const mainContent = document.querySelector(".main-content");
const mainContentRow = document.querySelector(".main-content-row");


async function getData() {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=`
  );

  let data = await response.json();
  // console.log(data)

  displayHomeData(data);
}


// mainContentRow.addEventListener("click", function (e) {
//   console.log(e.target)
//   let targetElement = e.target
// })




getData();
let mainTargetMeal = document.querySelector(".target-meal");





function displayHomeData(arr) {
  for (let i = 0; i < arr.meals.length; i++) {
    
    mainContentRow.innerHTML += `
    
    
    <div class="col-3" id= ${arr.meals[i].idMeal}>
      <div class="inner">
        <div class="img-holder position-relative">
          <img src="${arr.meals[i].strMealThumb} " class="w-100" alt="" />
          <div class="overlay-part">
            <h3
              class="h-100 d-flex align-items-center justify-content-start ps-2"
            >
              ${arr.meals[i].strMeal}
            </h3>
          </div>
        </div>
      </div>
    
  </div>
  `;


  }

  // pay attention===========================================
  mainContentRow.addEventListener("click", function (e) {
    let elementId = e.target.parentElement.parentElement.parentElement.parentElement.getAttribute("id");
    getDataById(elementId)
  })

  



}





  // pay attention===========================================

async function getDataById(id) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );

  let data = await response.json();
  console.log(data)

  displayDataById(data);
  
}


  // pay attention===========================================
  let targetRow = document.querySelector(".targetRow");

function displayDataById(arr) {
  mainSearchContentRow.innerHTML=""
  mainSearchContent.html("")
  mainContentRow.innerHTML = "";
  closeAllPages();

  mainTargetMeal.classList.remove("d-none");
  targetRow.innerHTML = `
  <div class="col-4">
  <div class="img-holder">
    <img src="${arr.meals[0].strMealThumb}" class="w-100" alt="" />
  </div>

  <h3 class="fw-bold">${arr.meals[0].strMeal}</h3>
</div>
<div class="col-8">
  <h3 class="instruction">Instructions</h3>
  <p class="inst-para mb-2">
  ${arr.meals[0].strInstructions}
  </p>
  <p class="fw-bold fs-3 mb-1">
    Area : <span class="fw-normal">${arr.meals[0].strArea}</span>
  </p>
  <p class="fw-bold fs-3 mb-1">
    Category : <span class="fw-normal">${arr.meals[0].strCategory}</span>
  </p>
  <p class="fs-3 mb-2">Recipes :</p>
  <ul class="recipe-container list-unstyled d-flex gap-3">
    <li>${arr.meals[0].strIngredient1} </li>
    <li>${arr.meals[0].strIngredient2 }</li>
    <li>${arr.meals[0].strIngredient3 }</li>
    <li>${arr.meals[0].strIngredient4 }</li>
    <li>${arr.meals[0].strIngredient5 }</li>
    <li>${arr.meals[0].strIngredient6 }</li>
    <li>${arr.meals[0].strIngredient7 }</li>
    <li>${arr.meals[0].strIngredient8 }</li>
    <li>${arr.meals[0].strIngredient9 }</li>
    <li>${arr.meals[0].strIngredient10 }</li>
    <li>${arr.meals[0].strIngredient11}</li>
  </ul>
  <p class="fs-3 mb-2">Tags :</p>
  <ul class="tag-container list-unstyled d-flex gap-3 mb-3">
     <li >${arr.meals[0].strTags}</li>
  </ul>

  <a href="${arr.meals[0].strSource}" target = "_blank"  class="btn btn-success">Source</a>
  <a href="${arr.meals[0].strYoutube}" target = "_blank" class="btn btn-danger">Youtube</a>
</div>
  `;
  searchByFirstInput.addClass("d-none")
  searchByNameInput.addClass("d-none")
}



// search part ----------------------
const searchByNameInput = $("#byName");
const mainSearchContent = $(".main-search-content");
const mainSearchContentRow = document.querySelector(".searchRow");
const searchLink = $("#searchLink");
const searchMeal = $(".search-meal");

searchLink.on("click", function (e) {
  closeAllPages();
  mainSearchContent.removeClass("d-none");
  mainSearchContentRow.classList.remove("d-none");
  searchMeal.removeClass("d-none");
  searchByFirstInput.removeClass("d-none")
  searchByNameInput.removeClass("d-none")

  closeSide();
});

//  search data ============================

async function searchData(searchName) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchName}`
  );
  let data = await response.json();
  displaySearchData(data);
}

searchByNameInput.on("input", function () {
  searchData(searchByNameInput.val());
});




let searchInputsContainer = document.querySelector("search-inputs-container");



function displaySearchData(arr) {
  // closeAllPages()
  // mainSearchContentRow.classList.remove("d-none");

  mainSearchContentRow.innerHTML = "";

  
 

  for (let i = 0; i < arr.meals.length; i++) {
    if (
      arr.meals[i].strMeal
        .toLowerCase()
        .includes(searchByNameInput.val().toLowerCase())
    ) {
      mainSearchContentRow.innerHTML += `
      <div class="col-3">
      <div class="inner">
        <div class="img-holder position-relative">
          <img src="${arr.meals[i].strMealThumb}" class="w-100" alt="" />
          <div class="overlay-part">
            <h3
              class="h-100 d-flex align-items-center justify-content-start ps-2"
              id = "${arr.meals[i].idMeal}"
            >
              ${arr.meals[i].strMeal}
            </h3>
          </div>
        </div>
      </div>
    </div>

      
      `;
    } else {
      mainSearchContentRow.innerHTML = "";
    }
  }
// add event listener ===================

  mainSearchContentRow.addEventListener("click", function (e) {
  // console.log(e.target.getAttribute("id"))
    getDataById(e.target.getAttribute("id"));
      

  
  
})

}

// search data by first letter ===================



let searchByFirstInput = $("#byFirst");

async function searchDataByFirst(firstChar) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstChar}`
  );
  let data = await response.json();
  displaySearchDataByFirst(data);
}

searchByFirstInput.on("input", function () {
  searchDataByFirst(searchByFirstInput.val());
});

function displaySearchDataByFirst(arr) {
  mainSearchContentRow.innerHTML = "";
  for (let i = 0; i < arr.meals.length; i++) {
    if (
      arr.meals[i].strMeal
        .toLowerCase()
        .includes(searchByFirstInput.val().toLowerCase())
    ) {
      console.log(arr.meals[i].strMeal)
      mainSearchContentRow.innerHTML += `
      <div class="col-3" >
      <div class="inner">
        <div class="img-holder position-relative">
          <img src="${arr.meals[i].strMealThumb}" class="w-100" alt="" />
          <div class="overlay-part">
            <h3
              class="h-100 d-flex align-items-center justify-content-start ps-2"
              data-set = ${arr.meals[i].idMeal}
            >
              ${arr.meals[i].strMeal}
            </h3>
          </div>
        </div>
      </div>
    </div>

      
      `;

    } else {
      mainSearchContentRow.innerHTML = "";
    }
  }
  // add event listener
  mainSearchContentRow.addEventListener("click", function (e) {
    getDataById(e.target.getAttribute("data-set"));
  })

}





// categories ==================================
const category = $("#category");
const categoryPage = $(".category-page");
const categoryRow = document.querySelector(".categoryRow");
// console.log(categoryPage , categoryRow)

category.on("click", function () {
  closeAllPages();
  categoryPage.removeClass("d-none");
  closeSide();
  searchByFirstInput.addClass("d-none")
  searchByNameInput.addClass("d-none")

  getCategoryData();
});

async function getCategoryData() {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  let data = await response.json();
  displayCategories(data);
}

function displayCategories(arr) {
  for (let i = 0; i < arr.categories.length; i++) {
    categoryRow.innerHTML += `
    <div class="col-3">
          <div class="inner">
            <div class="img-holder position-relative" data-category = ${arr.categories[i].strCategory}>
              <img src="${
                arr.categories[i].strCategoryThumb
              }" class="w-100" alt="" />
              <div class="overlay-part py-2 text-center" >
                <h3 class="text-center" data-category = ${arr.categories[i].strCategory}>${arr.categories[i].strCategory}</h3>
                <p class="" data-category = ${arr.categories[i].strCategory}>
                  ${arr.categories[i].strCategoryDescription
                    .split(" ")
                    .slice(0, 20)
                    .join(" ")}
                </p>
              </div>
            </div>
          </div>
        </div>
    
    `;
  }
  // add event listener ===================

  categoryRow.addEventListener("click", function (e) {
    getDataByFilter(e.target.getAttribute("data-category"));
        
  
    
    
  })
}

async function getDataByFilter(f) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${f}`
  );

  let data = await response.json();
  console.log(data)

  displayDataByFilter(data , categoryRow);
  
}

function displayDataByFilter(arr , row) {
  row.innerHTML = "";
  for (let i = 0; i < arr.meals.length; i++) {
    
    row.innerHTML += `
    
    
    <div class="col-3" id= ${arr.meals[i].idMeal}>
      <div class="inner">
        <div class="img-holder position-relative">
          <img src="${arr.meals[i].strMealThumb} " class="w-100" alt="" />
          <div class="overlay-part">
            <h3
              class="h-100 d-flex align-items-center justify-content-start ps-2"
            >
              ${arr.meals[i].strMeal}
            </h3>
          </div>
        </div>
      </div>
    
  </div>
  `;


  }

  // pay attention===========================================
  row.addEventListener("click", function (e) {
    let elementId = e.target.parentElement.parentElement.parentElement.parentElement.getAttribute("id");
    getDataById(elementId)
  })

  



}

















//  area page -------------------------------------------------

const areaLink = $("#area");
const areaPage = $(".area-page");
const areaRow = document.querySelector(".areaRow");


areaLink.on("click", function () {
  closeAllPages();
  areaPage.removeClass("d-none");
  closeSide();
  searchByFirstInput.addClass("d-none")
  searchByNameInput.addClass("d-none")

  getAreaData();
});

async function getAreaData() {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  let data = await response.json();
  displayArea(data);
}

function displayArea(arr) {
  for (let i = 0; i < arr.meals.length; i++) {
    areaRow.innerHTML += `
    <div class="col-3">
              <div class="inner text-white text-center area-inner" data-area = ${arr.meals[i].strArea}>
                <i class="fa-solid fa-house-laptop " data-area = ${arr.meals[i].strArea}></i>
                <h3 class="fs-3" data-area = ${arr.meals[i].strArea} >${arr.meals[i].strArea}</h3>
              </div>
            </div>
    
    `;
  }

  // add event listener===================
  areaRow.addEventListener("click", function (e) {
    getDataByFilterArea(e.target.getAttribute("data-area"));
        
  
    
    
  })
}



async function getDataByFilterArea(f) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${f}`
  );

  let data = await response.json();
  console.log(data)

  displayDataByFilter(data , areaRow);
  
}
































//  ingredients ======================================
const ingredientsLink = $("#ingredients");
const ingredientsPage = $(".ingredients-page");
const ingredientsRow = document.querySelector(".ingredientsRow");

ingredientsLink.on("click", function () {
  closeAllPages();
  ingredientsPage.removeClass("d-none");
  closeSide();
  searchByFirstInput.addClass("d-none")
  searchByNameInput.addClass("d-none")

  getIngredientsData();
});

async function getIngredientsData() {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  let data = await response.json();
  displayIngredients(data);
}

function displayIngredients(arr) {
  for (let i = 0; i < 20; i++) {
    ingredientsRow.innerHTML += `
    <div class="col-3">
              <div class="inner text-white text-center">
                <i class="fa-solid fa-drumstick-bite" data-ingredient= ${arr.meals[i].strIngredient}></i>
                <h3 class="fs-3" data-ingredient= ${arr.meals[i].strIngredient}>${arr.meals[i].strIngredient}</h3>
                <p data-ingredient= ${arr.meals[i].strIngredient}>${arr.meals[i].strDescription
                  .split(" ")
                  .slice(0, 20)
                  .join(" ")}</p>
              </div>
            </div>
    
    `;
  }
  ingredientsRow.addEventListener("click", function (e) {
    getDataByFilterIngredient(e.target.getAttribute("data-ingredient"));
    
  })

}

async function getDataByFilterIngredient(f) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${f}`
  );

  let data = await response.json();
  console.log(data)

  displayDataByFilter(data , ingredientsRow);
  
}

// contact us ======================================
const contactPage = document.querySelector(".contact-page");
const contactLink = document.querySelector("#contact");
const myName = document.querySelector("#Name");
const myMail = document.querySelector("#Mail");
const myPhone = document.querySelector("#Phone");
const myAge = document.querySelector("#Age");
const myPassword = document.querySelector("#Password");
const myRepassword = document.querySelector("#Repassword");
// console.log(myName , myMail , myPhone,myAge , myPassword,myRepassword  )

contactLink.addEventListener("click", function (e) {
  // mainContent.classList.add("d-none");
  // contactPage.classList.remove("d-none");
  closeAllPages();
  searchByFirstInput.addClass("d-none")
  searchByNameInput.addClass("d-none")
  contactPage.classList.remove("d-none")

  closeSide();
  // console.log(e.target)
});

//  regular expression for form
const nameRg = /^[a-z0-9_-]{3,15}$/gi;
const mailRg = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gi;
const phoneRg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/gi;

const passwordRg =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/gi;

function validationInputs(regex, Element) {
  if (regex.test(Element.value)) {
    Element.nextElementSibling.classList.add("d-none");

    return true;
  } else {
    Element.nextElementSibling.classList.remove("d-none");
    return false;
  }
}
myName.addEventListener("input", function () {
  validationInputs(nameRg, myName);
});
myMail.addEventListener("input", function () {
  validationInputs(mailRg, myMail);
});

myPhone.addEventListener("input", function () {
  validationInputs(phoneRg, myPhone);
});

myPassword.addEventListener("input", function () {
  validationInputs(passwordRg, myPassword);
});

function validateAge() {
  if (100 > myAge.value > 0) {
    myAge.nextElementSibling.classList.add("d-none");

    return true;
  } else {
    myAge.nextElementSibling.classList.remove("d-none");
    return false;
  }
}

myAge.addEventListener("input", function () {
  validateAge();
});

function confirmPassword() {
  if (myRepassword.value === myPassword.value) {
    myRepassword.nextElementSibling.classList.add("d-none");

    submitBtn.removeAttribute("disabled");
    return true;
  } else {
    myRepassword.nextElementSibling.classList.remove("d-none");
    return false;
  }
}

myRepassword.addEventListener("input", function () {
  confirmPassword();
});

const submitBtn = document.querySelector(".submit_button");
console.log(submitBtn);

const inputs = $("input");
const labels = $("label");









function closeAllPages() {
  mainContent.classList.add("d-none");
  mainSearchContentRow.classList.add("d-none");
  categoryPage.addClass("d-none");
  areaPage.addClass("d-none");
  ingredientsPage.addClass("d-none");
  contactPage.classList.add("d-none");
  mainTargetMeal.classList.add("d-none");


  
}







jQuery(function () {
  $(".loading").fadeOut(2000, function () {
    $("body").css({ overflow: "auto" });
  })

})