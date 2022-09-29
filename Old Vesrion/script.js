async function fetchData (){

    const res = await fetch("./foodData.json");

    if(res.status == 200){
        const data = await res.json();
        getData(data);
    }else{
        alert("Check Console");
        console.log(error);
    }

}

fetchData();


let total = [];

let filteredOrderList = [];

function getData(data){

    const card = document.querySelector(".hero--container");

    let result = "";

    data.food.forEach((ele) => {
        result += `
        <div class="hero--card">
            <div class="card--img">
                <img src=${ele.imgUrl} class="food--img" alt="burger">
                <img src=${ele.veg ? "./images/veg.svg" : "./images/nonveg.svg"} class="food--indicator" alt="veg">
            </div>
            <div class="card--details">
                <div class="rating">
                    <span>Rating - <span class="rate">${ele.rating}</span>/5</span>
                    ${ele.isBestSeller ? `<span class="bold yellow bestseller">BestSeller</span>
                    <span class="star bestseller"><img src="./images/star.svg" alt="star"></span>` : ``}
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

    //<button class="button--minus" value=${ele.id}>-</button>

    let paymentData = data.food.map((ele) => {
        return {
            name : ele.name,
            price : ele.price, 
            quantity : 0,
            id : ele.id
        }
    })


    const addButton = document.querySelectorAll(".button--add");
    // const minusButton = document.querySelectorAll(".button--minus");
    //const des = document.querySelector(".card--des");
    
    addButtonPressed = e => {
        // let paymentData = data.food.map((ele) => {
        //     return {
        //         name : ele.name,
        //         price : ele.price 
        //     }
        // })
       // console.log(e.target.value);

        addPayment(paymentData, e.target.value);
    }

    // subButtonPressed = e1 => {
    //     // let paymentData = data.food.map((ele) => {
    //     //     return {
    //     //         name : ele.name,
    //     //         price : ele.price 
    //     //     }
    //     // })
    //     //console.log(e.target.value);
    //     subPayment(paymentData, e1.target.value);
    // }


    for(let addButtons of addButton){
        addButtons.addEventListener("click", addButtonPressed)
    }
    // for(let minusButtons of minusButton){
    //     minusButtons.addEventListener("click", subButtonPressed)
    // }
   
}

//let sub;

const firstTotal = document.querySelector(".payment--total");
const secondTotal = document.querySelector(".allTotal--price");
const paymentVisible = document.querySelector(".payment--visible");



const paymentMenu = document.querySelector(".proceedDropDown");

const orderMenu = document.querySelector(".payment--container");

// function subPayment(paymentData, e){

//     totalPrice.shift(paymentData[e].price);

//     if(paymentData.length >= 0){
//         sub = totalPrice.length == 0 ? 0 : totalPrice.reduce(function(prevValue, currentValue){
//             return (prevValue + currentValue);
//         })
        
//     }
    

//     console.log(sub);
//     console.log(totalPrice);
//     total.textContent = sub;

// }
let count = 0;
let sum;

let frequencyArrayForOrder = [];


function addPayment(paymentData, e){
    
    //totalPrice.push(paymentData[e].price);
    
    paymentData[e].quantity++;
    total.push(paymentData[e])
    
    // if(total[e].name != paymentData[e].name){
    //     total.push(paymentData[e]);
    // }else{
    //     count++
    // }


    
    console.log(total);
    console.log("------add--------")
    //console.log(e);
    //console.log(count);

    //console.log(totalPrice[count++].price);
    
    //frequencyArrayForOrder[e];

    //console.log(frequencyArrayForOrder);

    sum = total.map((ele) => ele.price).reduce(function(prevValue, currentValue){
        return (prevValue + currentValue);
    })
    //console.log(paymentData[e].price);
    //console.log(totalPrice);

    //console.log(sum);
    
    firstTotal.textContent = sum;
    secondTotal.textContent = sum; 
    paymentVisible.style.display = "block";
    
    
    // let sumtotal;

    // let sum = {
    //     t : 0
    // }
     
    // const total = (function(){
    //     sumtotal = sum.t + paymentData[e].price;
    //     sum.t  = sumtotal;
    //     return sum.t
    // })

    // console.log(total());

    // const total =(function(paymentData, e){
    //     let sum = 0;
    //     return function(){
    //         sum += paymentData[e].price;
    //         return sum;
    //     }
    // })();

    // console.log(total());
    //console.log(paymentData[e].price);  

    // const paymentMenu = document.querySelector(".proceedDropDown");

    //let order = "";

    // paymentData.forEach((ele) => {
    //     order += `<div class="card">    
    //     <div class="payment--heading">Excellent Burger</div>
    //     <div class="payment--price">1000</div>
    //     <div class="payment--multi">X</div>
    //     <div class="payment--quantity">5</div>
    //     <div class="payment--equal">=</div>
    //     <div class="payment--totalPrice">5000</div>
    //     <div class="payment--img"><img src="./images/remove.svg" alt="remove"></div>
    // </div>`
    // paymentMenu.innerHTML = order

    // })

    // total.forEach((ele) => {
    //     order += `<div class="card">    
    //     <div class="payment--heading">${ele.name}</div>
    //     <div class="payment--price">${ele.price}</div>
    //     <div class="payment--multi">X</div>
    //     <div class="payment--quantity">5</div>
    //     <div class="payment--equal">=</div>
    //     <div class="payment--totalPrice">5000</div>
    //     <div class="payment--img"><img src="./images/remove.svg" alt="remove"></div>
    // </div>`
    // paymentMenu.innerHTML = order

    // })

    ////////////////////
    // removing duplicate order from the array
   
    filteredOrderList = total.filter((item, index) => total.indexOf(item) == index);

    orderList(filteredOrderList);
    

    // const removeButton = document.querySelectorAll(".payment--remove");


    // removeButtonPressed = e =>{
    //     //console.log(valueNeedToBeSubtracted)
        
    //     console.log("Button Clicked")
    //     console.log(e.target.value)
    // }

    // for(let button of removeButton){
    //     button.addEventListener("click", removeButtonPressed);
    // }

    
    
}








let valueNeedToBeSubtracted = 0;

function orderList(filteredOrderList){

        let order = "";

        filteredOrderList.forEach((ele) => {
        
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


    const removeButton = document.querySelectorAll(".payment--remove");

    //added after
    const crossButton = document.querySelector(".card")

    removeButtonPressed = e =>{
        //console.log(valueNeedToBeSubtracted)
        
        //console.log("Button Clicked");
        //console.log(filteredOrderList);
        //console.log(e.target.value);
        //crossButton.classList.add("none");
        // if(filteredOrderList.length == 1){
        //     paymentMenu.style.display = "none";
        // }else{
            if(sum == 0){
                paymentMenu.style.display = "none";
                orderList([{
                    name : "-",
                    price : "0", 
                    quantity : "0",
                    id : null
                }])
            }
            removingItem(filteredOrderList, e.target.value);
        
    }
        
        
    

    for(let buttons of removeButton){
        buttons.addEventListener("click", removeButtonPressed);
    }


}

function removingItem(filteredOrderList, e){

    if(filteredOrderList.length != 0){
    //console.log(total)
    //console.log(filteredOrderList)
    //console.log(e)
    //console.log(filteredOrderList[e]);
    const index = filteredOrderList.findIndex(ele => ele.id == e);
    //indexOfElementToBeRemovedFromList
    
    //console.log(index)
    
    sum -= (filteredOrderList[index].price * filteredOrderList[index].quantity);   
    if(sum < 0){
        sum = 0;
    } 
    //console.log(sum)

    firstTotal.textContent = sum; 
    secondTotal.textContent = sum; 

    //paymentMenu.style.display = "none";
    //console.log(total[index].quantity);
    filteredOrderList[index].quantity = 0;
    ///total[index].quantity = 0;
    filteredOrderList.splice(index, 1)
    total.splice(total.findIndex(ele => ele.id == e), 1)

    // let ar2 = total.filter((item) => item.findIndex((item,index) => item(index) == e))
    // console.log(ar2);

    //total = ar2;
    
    

    //console.log(filteredOrderList)
    console.log(total)
    //console.log("--------------------")

    
    orderList(filteredOrderList);
}


}




const dropDown = document.querySelector(".dropdown");
    dropDown.addEventListener("click", togglePayment);

    function togglePayment(){
        if(paymentMenu.style.display == "none"){
            paymentMenu.style.display = "block";
        }else{
            paymentMenu.style.display = "none";
        }
    }

    const viewButton =  document.querySelector(".open--window ");
    viewButton.addEventListener("click", toggleWindow);

    function toggleWindow(){
        if(orderMenu.style.display == "none"){
            orderMenu.style.display = "block";
        }
        orderMenu.style.display = "block";
    }












