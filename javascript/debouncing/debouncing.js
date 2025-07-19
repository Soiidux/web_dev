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
async function getData(){
    try {
        const response = await fetch("https://api.freeapi.app/api/v1/public/randomproducts");
        const rawdata = await response.json();
        const productDiscription = rawdata.data.data;
        const productNames = productDiscription.map((element,index) => element.title);
        return productNames;
    }
    catch(error) {
        console.log(`Error: ${error}`);
    }
    finally{
        console.log("All done");
    }
}
