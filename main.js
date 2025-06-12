// Use the latest API endpoint from fawazahmed0/exchange-api
const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1";


const btn = document.querySelector("form button");
// Initialize these variables after DOM elements are loaded
let fromCurr = document.querySelector("select[name='from']");
let toCurr = document.querySelector("select[name='to']");


const msg = document.querySelector(".msg");


const dropdowns = document.querySelectorAll(".dropdown select");

for(let select of dropdowns){
    for(currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
       
        if(select.name==="from"&& currCode==="USD"){
            newOption.selected="selected";
        }
        else if(select.name==="to"&& currCode==="INR"){
            newOption.selected="selected";
        }
         select.append(newOption);

    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);

    });

}   

const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode]    ;
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
    
}


btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if (amtval === "" || amtval < 0) {  
        amtval = 1;
        amount.value = "1";
    }  
    
    // Add check to ensure currency elements exist
    if (!fromCurr || !toCurr) {
        console.error("Currency selectors not found");
        return;
    }
    console.log(fromCurr,toCurr);
    
const URL = `${BASE_URL}/currencies/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
  
    let data = await response.json();
  
    let fromCode = fromCurr.value.toLowerCase();
let toCode = toCurr.value.toLowerCase();


let rate = data[fromCode][toCode];
  console.log(rate);

    let finalAmount = amtval * rate;
    
    msg.innerText = `${amtval} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
});







