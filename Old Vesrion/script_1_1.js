// async function fetchData (){

//     const res = await fetch("./foodData.json");

//     if(res.status == 200){
//         const data = await res.json();
//         getData(data);
//     }else{
//         alert("Check Console");
//         console.log(error);
//     }

// }

// fetchData();

// function getData(data){

//     const card = document.querySelector(".hero--container");

//     let result = "";

//     data.food.forEach((ele) => {
//         result += `
//         <div class="hero--card">
//             <div class="card--img">
//                 <img src=${ele.imgUrl} class="food--img" alt="burger">
//                 <img src=${ele.veg ? "./images/veg.svg" : "./images/nonveg.svg"} class="food--indicator" alt="veg">
//             </div>
//             <div class="card--details">
//                 <div class="rating">
//                     <span>Rating - <span class="rate">${ele.rating}</span>/5</span>
//                     ${ele.isBestSeller ? `<span class="bold yellow bestseller">BestSeller</span>
//                     <span class="star bestseller"><img src="./images/star.svg" alt="star"></span>` : ``}
//                 </div>
//                 <h2 class="card--name">${ele.name}</h2>
//                 <p class="card--des">${ele.des}</p>
//                 <p class="card--price">Rs.<span>${ele.price}</span></p>
//                 <div class="buttons">
                    
//                     <button class="button--add" value=${ele.id}>Add +</button>
//                 </div>
//             </div>
//         </div>
//         <hr class="divider">
//         `
//         card.innerHTML = result;
//     })

//     let paymentData = data.food.map((ele) => {
//         return {
//             name : ele.name,
//             price : ele.price, 
//             quantity : 0,
//             id : ele.id
//         }
//     })


//     const addButton = document.querySelectorAll(".button--add");
//     addButtonPressed = e => {
//         addPayment(paymentData, e.target.value);
//     }
//     for(let addButtons of addButton){
//         addButtons.addEventListener("click", addButtonPressed)
//     }
// }

// let total = [];
// let filteredOrderList = [];

// const firstTotal = document.querySelector(".payment--total");
// const secondTotal = document.querySelector(".allTotal--price");
// const paymentVisible = document.querySelector(".payment--visible");
// const paymentMenu = document.querySelector(".proceedDropDown");
// const orderMenu = document.querySelector(".payment--container");

// let count = 0;
// let sum;


// function addPayment(paymentData, e){

//     paymentData[e].quantity++;

//     total.push(paymentData[e])

//     sum = total.map((ele) => ele.price).reduce(function(prevValue, currentValue){
//         return (prevValue + currentValue);
//     })

//     firstTotal.textContent = sum;

//     secondTotal.textContent = sum; 

//     paymentVisible.style.display = "block";

//     // removing duplicate order from the array
   
//     filteredOrderList = total.filter((item, index) => total.indexOf(item) == index);

//     orderList(filteredOrderList);
    
// }

// function removingItem(filteredOrderList, e){

    
//     console.log(total)
//     // console.log(filteredOrderList)
//     // console.log(e)

//     const index = filteredOrderList.findIndex(ele => ele.id == e);
//     //indexOfElementToBeRemovedFromList
    
//     //console.log(index)
    
//     sum -= (filteredOrderList[index].price * filteredOrderList[index].quantity);   
//     if(sum < 0){
//         sum = 0;
//     } 
//     //console.log(sum)

//     firstTotal.textContent = sum; 
//     secondTotal.textContent = sum; 

//     filteredOrderList.splice(index, 1)
//     total.splice(total.findIndex(ele => ele.id == e), 1)

//     console.log(filteredOrderList)
//     console.log(total)
//     console.log("--------------------")
    
// }

// let valueNeedToBeSubtracted = 0;

// function orderList(filteredOrderList){

//     let order = "";

//     filteredOrderList.forEach((ele) => {
        
//         order += `<div class="card">    
//         <div class="payment--heading">${ele.name}</div>
//         <div class="payment--price">${ele.price}</div>
//         <div class="payment--multi">X</div>
//         <div class="payment--quantity">${ele.quantity}</div>
//         <div class="payment--equal">=</div>
//         <div class="payment--totalPrice">${ele.price * ele.quantity}</div>
//         <button class="payment--remove" value=${ele.id}>X</button>
//         </div>
//         `
//         paymentMenu.innerHTML = order;
            
//     })

//     const removeButton = document.querySelectorAll(".payment--remove");

//     //added after
//     const crossButton = document.querySelector(".card")

//     removeButtonPressed = e =>{
//         //console.log(valueNeedToBeSubtracted)
        
//         //console.log("Button Clicked");
//         // console.log(filteredOrderList.value)
//         //console.log(e.target.value);
//         //crossButton.classList.add("none")
//         removingItem(filteredOrderList, e.target.value);
        
//     }

//     for(let buttons of removeButton){
//         buttons.addEventListener("click", removeButtonPressed);
//     }

// }

//     const dropDown = document.querySelector(".dropdown");

//     dropDown.addEventListener("click", togglePayment);

//     function togglePayment(){
//         if(paymentMenu.style.display == "none"){
//             paymentMenu.style.display = "block";
//         }else{
//             paymentMenu.style.display = "none";
//         }
//     }

//     const viewButton =  document.querySelector(".open--window ");
//     viewButton.addEventListener("click", toggleWindow);

//     function toggleWindow(){
//         if(orderMenu.style.display == "none"){
//             orderMenu.style.display = "block";
//         }
//         orderMenu.style.display = "block";
//     }












