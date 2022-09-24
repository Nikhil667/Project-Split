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
    console.log(data.food[4].price);
}