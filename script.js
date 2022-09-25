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
                    <button class="button--minus" value=${ele.id}>-</button>
                    <button class="button--add" value=${ele.id}>Add +</button>
                </div>
            </div>
        </div>
        <hr class="divider">
        `
        card.innerHTML = result;
    })


    const button = document.querySelectorAll(".button--add");
    const des = document.querySelector(".card--des");
    
    buttonPressed = e => {
        let paymentData = data.food.map((ele) => {
            return {
                name : ele.name,
                price : ele.price 
            }
        })
        // console.log(e.target.value);
        paymentWindow(paymentData, e.target.value);
    }
    for(let buttons of button){
        buttons.addEventListener("click", buttonPressed)
    }
   
}
let totalPrice = [];
function paymentWindow(paymentData, e){

    const total = document.querySelector(".payment--total");

    //totalPrice.push(paymentData[e].price);
    totalPrice.push(paymentData[e].price);
    let sum = totalPrice.reduce(function(prevValue, currentValue){
        return (prevValue + currentValue);
    })
    //console.log(paymentData[e].price);
    //console.log(totalPrice);
    console.log(sum);

    total.textContent = sum;

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

