//Lets make a function that returns a custom promise
function wait(seconds){
    return new Promise((resolve,reject)=>{         
        setTimeout(()=> resolve(),seconds*1000);
    })
}

wait(10)
.then(()=>console.log("All done after 10s"))
.catch(()=>console.log("Rejected after 10s"))
.finally(()=>console.log("This runs everytime"))