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
            price : ele.price 
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
let totalPrice = [];
//let sub;

const firstTotal = document.querySelector(".payment--total");
const secondTotal = document.querySelector(".allTotal--price");
const paymentVisible = document.querySelector(".payment--visible");

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

function addPayment(paymentData, e){

    //totalPrice.push(paymentData[e].price);
    totalPrice.push(paymentData[e].price);

    let sum = totalPrice.reduce(function(prevValue, currentValue){
        return (prevValue + currentValue);
    })
    //console.log(paymentData[e].price);
    //console.log(totalPrice);

    console.log(sum);
    console.log(totalPrice);
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
}

const paymentMenu = document.querySelector(".payment--container");



const viewButton =  document.querySelector(".open--window ");
viewButton.addEventListener("click", toggleWindow);


function toggleWindow(){
    if(paymentMenu.style.display == "none"){
        paymentMenu.style.display = "block";
    }
    paymentMenu.style.display = "block";
}