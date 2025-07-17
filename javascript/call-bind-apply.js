//  CALL
/* USAGE: function.call(thisArgument, arg1,arg2,arg3.....)
JS is a single threaded langauge. We know for a function to be executed it goes to the call stack under a new execution context. 
If the given function (say , func1) calls another function (func2) which is defined outside func1, a new execution context is created 
on top of the main execution context. As a result if a call in made to func2 it will run however not in way we want it to, it will be executed 
and removed out of the call stack without inheriting func1's 'this' . Instead func2's this defaults to window(browser) / global(node.js)
in non-strict mode and undefined in strict mode.
This has been a big problem in JS. A way to fix this is using .call(). Call explicitly sets this for a function (thisArgument). 
It calls the given function with a given 'this' values and arguments provided individually (arg1,arg2,arg3)
*/

//###############################################################################################################################
function SetUserName(username){
    //complex DB calls
    this.username = username;
}

function  CreateUser(username,email,password){
    //SetUserName(username) calls the function but doesn't inherit CreateUser's 'this'.
    SetUserName.call(this,username); //correct way 
    this.email = email;
    this.password =  password;
}

const user = new CreateUser("yash","yash","123");

console.log(user);
//###############################################################################################################################






