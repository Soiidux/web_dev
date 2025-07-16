// //Lets make a function that returns a custom promise
// function wait(seconds){
//     return new Promise((resolve,reject)=>{         
//         setTimeout(()=> resolve(),seconds*1000);
//     })
// }

// wait(10)
// .then(()=>console.log("All done after 10s"))
// .catch(()=>console.log("Rejected after 10s"))
// .finally(()=>console.log("This runs everytime"))

//Whenever a promise object is made it needs an executor function
//Executor function has 2 methods, resolve and reject
//When resolve is called, promise is fullfilled and .then() functions run
//When reject is called, promise gets rejected and .catch() functions run
//Finally runs every time

class MyPromise {
    constructor(executorFn){
        this._state = "pending";
        this._successCallbacks = [];
        this._errorCallbacks = [];
        this._finallyCallbacks = [];
        this._value=undefined;
        this._error = undefined;
        executorFn(this.resolverFn.bind(this),this.rejectorFn.bind(this));
    }

    resolverFn(value){
        this._state = "fulfilled";
        this._value=value;
        this._successCallbacks.forEach((callbackFn)=>callbackFn(value));
        this._finallyCallbacks.forEach((callbackFn)=>callbackFn());
    }
    
    rejectorFn(error){
        this._state = "rejected";
        this._error = error;
        this._errorCallbacks.forEach((callbackFn)=>callbackFn(error));
        this._finallyCallbacks.forEach((callbackFn)=>callbackFn());
    }


    then(callbackFn){
        if(this._state === "fulfilled"){
            callbackFn(this._value);
            return this;
        }
        this._successCallbacks.push(callbackFn);
        return this;
    }

    catch(callbackFn){
        if(this._state === "rejected"){
            callbackFn(this._error);
            return this;
        }
        this._errorCallbacks.push(callbackFn);
        return this;
    }

    finally(callbackFn){
        if(this._state !== "pending"){
            this._finallyCallbacks.push(callbackFn);
            return this;
        } 
    }
    

}

// Lets put the promise that we made 
function wait(seconds){
    return new MyPromise((resolve,reject)=>{         
        setTimeout(()=> resolve("Resolved"),seconds*1000);
    })
}

wait(5)
.then((message)=>console.log("All done after 5s",message))
.catch(()=>console.log("Rejected after 5s"))
.finally(()=>console.log("Finally, this runs"))