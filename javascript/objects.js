//Problem: Create an object representing a type of tea with properties for name type and caffeine content.
const tea={
    tname: "Lemon tea",
    type:"Green",
    caffeine:"low"
}

//Access and print the name and type properties of the tea object
console.log(tea.tname);
console.log(tea["type"]);
console.log(tea.caffeine);

//Add a new property origin to the tea object
tea.origin = "Assam";

//Change the caffeine level of the tea object to medium
tea.caffeine="Medium";

//Problem:Remove the propery type from the object
delete tea.type;

//Check if the tea object has a property origin
console.log("origin" in tea);
console.log(Object.hasOwn(tea,"origin"));
console.log(tea.origin!==undefined);


//Use a for loop to print all properties of the tea object
for (key in tea){
    console.log(key+": "+tea[key]);
}

//Create a nested object representing different types of tea and their properties
const teas={
    greentea:{
        tname:"Green Tea",
        caffeine:"low"
    },
    blacktea:{
        tname:"Black Tea",
        caffeine:"High"
    }
}

//Create a copy of tea object
//Add a custom method describe to the tea object that returns a discription string.
//Merge two objects representing different teas into one.