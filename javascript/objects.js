//Problem: Create an object representing a type of tea with properties for name type and caffeine content.
const teas={
    tname: "Lemon tea",
    type:"Green",
    caffeine:"low"
}

//Access and print the name and type properties of the tea object
console.log(teas.tname);
console.log(teas["type"]);
console.log(teas.caffeine);

//Add a new property origin to the tea object
teas.origin = "Assam";

//Change the caffeine level of the tea object to medium
teas.caffeine="Medium";

//Problem:Remove the propery type from the object
delete teas.type;

//Check if the tea object has a property origin
console.log("origin" in teas);
console.log(Object.hasOwn(teas,"origin"));
console.log(teas.origin!==undefined);


//Use a for loop to print all properties of the tea object
for (key in teas){
    console.log(key+": "+teas[key]);
}