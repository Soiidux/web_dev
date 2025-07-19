//Debouncing in JS  :    Debouncing is a technique to make sure a function only runs after a certain amount of time
//                       has passed without the event happening again. If the event keeps happening repeatedly—like 
//                       typing or resizing—the function won’t run until the activity stops for the specified time.

//Real life comparision     :Suppose a girl is asking her mother for a chocolate but the mother puts a condition that she has 
//for easy understanding    :to remain quiet for 5 minutes after which she will get the chocolate. Every time the girl requests 
//                           her for the same before the 5 min timer finishes, she breaks the rules and now she has to stay quiet
//                           for another 5 minutes. 


// Real life use    : For example, when a user is typing in a search box, instead of calling the search function on every key press,
//                    debouncing will only call it once the user has paused typing for, say, 300 milliseconds, it prevents unnecessary
//                    function calls and improves performance by waiting until a rapid event such as keystroke or button clicks have 
//                    stopped for a set period of and then runs the function just once.
//                    It is used in search bars with live suggestions, window resize events, auto save forms, button click prevention 
//                    and scroll events.

function debounce(fn, delay){
    let timerId;
    return function(...args){
        clearTimeout(timerId);
        timerId = setTimeout(()=>{
            fn(...args);
        },delay);
    }
}


// function getData(obj){
//     let productdisc = obj.data.data;
//     let productnames = [];
//     productdisc.forEach((element, index) => productnames[index] = productdisc[index].title );
//     return productnames;
// }
// fetch("https://api.freeapi.app/api/v1/public/randomproducts?")
//     .then((response)=>response.json())
//     .then(getData)


// The above code returns an array of product names called productnames using fetch, a better way to do this is as below:
// async function getData(){
//     try {
//         const response = await fetch("https://api.freeapi.app/api/v1/public/randomproducts");
//         const rawdata = await response.json();
//         const productDiscription = rawdata.data.data;
//         const productNames = productDiscription.map((element,index) => element.title);
//         return productNames;
//     }
//     catch(error) {
//         console.log(`Error: ${error}`);
//     }
//     finally{
//         console.log("All done");
//     }
// }




// I COMMENTED THE API CALLS OUT BECAUSE I WOULD BE USING HARDCODED DATASET AS THE ONE FETCHED USING THE API IS VERY SMALL

function getSimilarProducts(query){
    let processedQuery = query.trim().toLowerCase();
    if (!processedQuery){
        return [];
    }
    else{
        const results = allProducts.filter(product =>product.toLowerCase().includes(processedQuery));
        return results.slice(0,10);
    }
}

function displaySuggestions(matches){
    const suggestionList = document.getElementById("suggestions");
    suggestionList.innerHTML = "";

    if(matches.length === 0){
        const li = document.createElement("li");
        li.textContent = "No matches found";
        suggestionList.appendChild(li);
    }
    else{
        matches.forEach((suggestion,index) => {
            const li = document.createElement("li");
            li.textContent = matches[index];
            suggestionList.appendChild(li);
        });
    }
}

// let allProducts = [];

const allProducts = [
    "Apple iPhone 14",
    "Samsung Galaxy S23",
    "Sony WH-1000XM4 Headphones",
    "Apple MacBook Pro",
    "OnePlus Nord CE",
    "Canon EOS M50 Camera",
    "Dell XPS 13 Laptop",
    "Nike Running Shoes",
    "Adidas UltraBoost",
    "Apple Watch Series 8",
    "iPad Pro 12.9-inch",
    "Lenovo ThinkPad X1",
    "HP Pavilion Gaming",
    "JBL Flip 5 Speaker",
    "Bose QuietComfort Earbuds",
    "LG OLED TV 55-inch",
    "Google Pixel 7",
    "Sony Bravia TV",
    "Fitbit Charge 5",
    "Xiaomi Mi Band 7",
    "Kindle Paperwhite",
    "Huawei MateBook D15",
    "Oppo Reno8 Pro",
    "Motorola Edge 40",
    "Asus ROG Phone 6",
    "TCL Smart Air Conditioner",
    "Amazon Echo Dot (4th Gen)",
    "Philips Hue Smart Bulb",
    "Boat Rockerz 450",
    "Vivo Y76s 5G",
    "Realme Narzo 50A",
    "Panasonic Lumix G7",
    "Samsung Galaxy Tab S8",
    "Sony Alpha A7 III",
    "Garmin Forerunner 245",
    "Microsoft Surface Pro 8",
    "Puma Sports Backpack"
  ];
  
document.addEventListener("DOMContentLoaded",function(){
    // allProducts = await getData();
    const input = document.getElementById("searchInput");
    const debouncedSearch = debounce(function(){
        const query = input.value;
        const matches = getSimilarProducts(query);
        displaySuggestions(matches);
    },500);


    input.addEventListener("keyup",debouncedSearch);
});