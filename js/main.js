let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let total = document.getElementById("total");
let discount = document.getElementById("discount");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let update = document.getElementById("update");
let deleteBtn = document.getElementById("delete");
let themeChanger = document.querySelector(".theme-changer");
let proData;
let tmp;
let mood = "create";


///local storage

if (localStorage.product != null) {
 proData = JSON.parse(localStorage.product);
} else {
 proData = [];
}

////get total

function getTotal() {
 if (price.value != "" && taxes.value != "" && ads.value != "") {
  let result = +price.value + +ads.value + +taxes.value - +discount.value;

  total.innerHTML = result;
  total.style.background = "#8abdff";
 } else {
  total.innerHTML = "total:";
  total.style.background = "white";
  total.style.color = "black";
 }
}


//// create product
submit.onclick = function () {
 let newPro = {
  title: title.value.toLowerCase(),
  price: price.value,
  taxes: taxes.value,
  ads: ads.value,
  discount: discount.value,
  total: total.innerHTML,
  count: count.value,
  category: category.value.toLowerCase(),
 };

if (title.value != "" 
&& price.value != "" 
&& category.value != ""
&& newPro.count < 100 
 ){

if (mood === "create") {

  if (newPro.count > 1) {

   for (let i = 0; i < newPro.count; i++) {
    proData.push(newPro);
   }
  } else {
   proData.push(newPro);
  }

 } else {

  proData[tmp] = newPro;
  mood = "create";
  submit.innerHTML = "create";
  count.style.display = "block"

 }
  clearData();
 }
 

 localStorage.setItem("product", JSON.stringify(proData));

 showData();
};


/////clear data
function clearData() {
 title.value = "";
 price.value = "";
 taxes.value = "";
 ads.value = "";
 discount.value = "";
 total.innerHTML = "total:";
 count.value = "";
 category.value = "";
}

///show data

function showData() {

 getTotal();
 let table = "";
 for (let i = 0; i < proData.length; i++) {
  table += `
  <tr>
              <td>${i+1}</td>
              <td>${proData[i].title}</td>
              <td>${proData[i].price}</td>
              <td>${proData[i].taxes}</td>
              <td>${proData[i].ads}</td>
              <td>${proData[i].discount}</td>
              <td>${proData[i].total}</td>
              <td>${proData[i].category}</td>
             
              <td><button class="btn" onClick="updateData(${i})" id="update"> update</button></td>
              <td><button class="btn" onClick="deleteData(${i})" id="deleteBtn">delete</button></td>
            </tr>
  `;
 }
 document.getElementById("tbody").innerHTML = table;
}
///delete data
function deleteData(i) {
 proData.splice(i, 1);
 localStorage.product = JSON.stringify(proData);
 showData();
}
///update data
function updateData(i) {

 title.value = proData[i].title;
 price.value = proData[i].price;
 taxes.value = proData[i].taxes;
 ads.value = proData[i].ads;
 discount.value = proData[i].discount;
 category.value = proData[i].category;
 getTotal();
 count.style.display = "none";
 submit.innerHTML = "update";
 mood = "update";
 tmp = i;
 scroll({
  top: 0,
  behavior: "smooth"
 })

}

/////search////

let searchMode = "title";
///search mode
function getSrchMode(id) {

 let search = document.getElementById("search");
 if (id === "searchTitle") {
  searchMode = "title"
  search.placeholder = "search by title"
 } else {
  searchMode = "category"
  search.placeholder = "search by category"
 }
 search.focus()
 search.value = "";
 showData()
}
///search function
function searchData(value) {
 table = "";

 for (let i = 0; i < proData.length; i++) {

  if (searchMode === "title") {

   if (proData[i].title.includes(value.toLowerCase())) {

    table += `
  <tr>
              <td>${i}</td>
              <td>${proData[i].title}</td>
              <td>${proData[i].price}</td>
              <td>${proData[i].taxes}</td>
              <td>${proData[i].ads}</td>
              <td>${proData[i].discount}</td>
              <td>${proData[i].total}</td>
              <td>${proData[i].category}</td>
             
              <td><button class="btn" onClick="updateData(${i})" id="update"> update</button></td>
              <td><button class="btn" onClick="deleteData(${i})" id="deleteBtn">delete</button></td>
            </tr>
  `;
   }


  } else {

   if (proData[i].category.includes(value.toLowerCase())) {

    table += `
  <tr>
              <td>${i}</td>
              <td>${proData[i].title}</td>
              <td>${proData[i].price}</td>
              <td>${proData[i].taxes}</td>
              <td>${proData[i].ads}</td>
              <td>${proData[i].discount}</td>
              <td>${proData[i].total}</td>
              <td>${proData[i].category}</td>
             
              <td><button class="btn" onClick="updateData(${i})" id="update"> update</button></td>
              <td><button class="btn" onClick="deleteData(${i})" id="deleteBtn">delete</button></td>
            </tr>
  `;

   }

  }
 }
 document.getElementById("tbody").innerHTML = table;
}

showData();

//change theme
themeChanger.addEventListener("click" , ()=>{

document.body.classList.toggle("dark-theme-var")

})