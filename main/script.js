// Version 1.1

// window.addEventListener('load', function(){

//     this.window.open("./loader/loader.html")
//     setTimeout(()=>{
//         mainFunction();
//     }, 3000, false)

// })

// // //Animation added on 01/10/2022 6.36pm
// function mainFunction(){

const menu = document.querySelector('.nav--menu')
const close = document.querySelector('.nav--close')
const nav = document.querySelector('nav')

menu.addEventListener('click', () => {
    nav.classList.add('open--nav')
})

close.addEventListener('click', () => {
    nav.classList.remove('open--nav')
})

async function fetchData (){

    const res = await fetch("../foodData.json");

    if(res.status == 200){
        const data = await res.json();
        getData(data);
    }else{
        alert("Check Console");
        console.log(error);
    }

}

fetchData();

// This array contains total number of orders
let total = [];


//This array contains the filtered orders(duplicate orders were removed)
let filteredOrderList = [];

//This function takes the data from the API
function getData(data){

    //Selecting the hero container
    const card = document.querySelector(".hero--container");

    let result = "";

    data.food.forEach((ele) => {
        result += `
        <div class="hero--card">
            <div class="card--img">
                <img src=${ele.imgUrl} class="food--img" alt="burger">
                <img src=${ele.veg ? "/../images/veg.svg" : "../images/nonveg.svg"} class="food--indicator" alt="veg">
            </div>
            <div class="card--details">
                <div class="rating">
                    <span>Rating - <span class="rate">${ele.rating}</span>/5</span>
                    ${ele.isBestSeller ? `<span class="bold yellow bestseller">BestSeller</span>
                    <span class="star bestseller"><img src="../images/star.svg" alt="star"></span>` : ``}
                </div>
                <h2 class="card--name">${ele.name}</h2>
                <p class="card--des">${ele.des}</p>
                <p class="card--price">Rs.<span>${ele.price}</span></p>
                <div class="buttons">
                    <button class="button--add" value=${ele.id}>Add +</button>
                </div>
            </div>
        </div>
        <hr class="divider">
        `
        card.innerHTML = result;
    })

    let paymentData = data.food.map((ele) => {
        return {
            name : ele.name,
            price : ele.price,
            quantity : 0,
            id : ele.id
        }
    })

    //This will add the event listener in all the buttons 
    const addButton = document.querySelectorAll(".button--add");
    addButtonPressed = e => {
        addPayment(paymentData, e.target.value);
    }

    for(let addButtons of addButton){
        addButtons.addEventListener("click", addButtonPressed)
    }
}

// The view order window's total
const firstTotal = document.querySelector(".order--total");

//The payment window;s total
const secondTotal = document.querySelector(".allTotal--price");

//Selecting the view order window
const orderVisible = document.querySelector(".order--visible");

//Parent class of card(which contains the orders) 
const paymentMenu = document.querySelector(".proceedDropDown");

//This selected class contains the dropdown button, proceedDropDown, , card and proceedPayment container. 
//View order - .open--window will toggle the orderList(blue button with V) 
const orderMenu = document.querySelector(".payment--container");


let count = 0;

let sum;

function sumOfOrders(arr){
    sum = arr.map((ele) => ele.price).reduce(function(prevValue, currentValue){
        return (prevValue + currentValue);
    })
}

function addPayment(paymentData, e){

    //The orders will on be visible after adding the order and then will remain there thereafter
    orderVisible.style.display = "block";
    dropDown.disabled = false;

    //incremented the quantity by one every time the given
    //order is added in the array
    paymentData[e].quantity += 1;

    //adding the particular order in the array
    total.push(paymentData[e])

    //Calculating the total sum of the orders

    sumOfOrders(total);

    // sum = total.map((ele) => ele.price).reduce(function(prevValue, currentValue){
    //     return (prevValue + currentValue);
    // })

    //Updating the sum in the DOM
    firstTotal.textContent = sum;
    secondTotal.textContent = sum;

    //Removing duplicate order from the array
    filteredOrderList = total.filter((item, index) => total.indexOf(item) == index);

    //Sending the updated data(with no duplicates) to the orderList function which will show the data in card with parent class by the name of proceedDropDown
    orderList(filteredOrderList);

    // console.log(filteredOrderList);
    console.log(total);
}


const viewButton =  document.querySelector(".open--window ");
viewButton.addEventListener("click", toggleWindow);

function toggleWindow(){
    if(orderMenu.style.display == "none"){
        orderMenu.style.display = "block";
    }
    orderMenu.style.display = "block";
}


//This function will display the all the orders that generated by clicking the Add button(open--window)
function orderList(arr){

        let order = "";

        arr.forEach((ele) => {
        
        //This DOM will display the orders
        order += `<div class="card">
        <div class="payment--heading">${ele.name}</div>
        <div class="payment--price">${ele.price}</div>
        <div class="payment--multi">X</div>
        <div class="payment--quantity">${ele.quantity}</div>
        <div class="payment--equal">=</div>
        <div class="payment--totalPrice">${ele.price * ele.quantity}</div>
        <button class="payment--remove" value=${ele.id}>X</button>
        </div>
        `
        paymentMenu.innerHTML = order;

    })

    //payment--remove class is in the card DOM defined above
    //This button will the reference of the button that is clicked
    const removeButton = document.querySelectorAll(".payment--remove");

    removeButtonPressed = e =>{

        //following function will change the calculate and display the total value in both order window and payment window 
        removingItem(filteredOrderList, e.target.value);

        //following function will remove the order from the orderList as well as will calculate the total after removing the element too.
        removeItemFromTotal(total, e.target.value);

    }

    for(let buttons of removeButton){
        buttons.addEventListener("click", removeButtonPressed);
    }

}

function removeItemFromTotal(total, e){

    // Removing all orders whose id is equal to the value of the event generated by the clicked button in total array  
    for(let i=total.length; i--;){
        if(total[i].id == e){
            total[i].quantity = 0;
            total.splice(i, 1);
        }
    }

}

function removingItem(filteredOrderList, e){

    // Finding the index of the order whose id is equal to the value of the event generated by the clicked button
    let indexInFilter = filteredOrderList.findIndex(order => order.id == e);

    if(sum >= 0 && indexInFilter > -1){
    
        //Updating the sum by subtracting the updated sum(which is calculated by multiplying it's price with its quantity)
        let updatedSum = filteredOrderList[indexInFilter].price * filteredOrderList[indexInFilter].quantity;

        sum -= updatedSum;

        //Updating the DOM
        firstTotal.textContent = sum;
        secondTotal.textContent = sum;

        //Removing the clicked item from the array
        filteredOrderList.splice(indexInFilter, 1);
        
        //Sending the data to render the DOM after removing
        //the particular item
        orderList(filteredOrderList); 
    }else{

        //else the below
        paymentMenu.style.display = "none";
        dropDown.disabled = true;
    }
}

//This button toggle the V-Button  
const dropDown = document.querySelector(".dropdown");
dropDown.addEventListener("click", togglePayment);

function togglePayment(){
    if(paymentMenu.style.display == "none"){
        paymentMenu.style.display = "block";
    }else{
        paymentMenu.style.display = "none";
    }
}

//}












