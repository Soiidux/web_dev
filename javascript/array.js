//Problem: create an array of fruits
const fruits=["apple","banana","mango","orange","strawberry","pineapple"];

//Problem: add watermelon to the array
fruits.push("watermelon");

//Remove strawberry from the array of fruits
const index = fruits.indexOf("strawberry");
if (index>-1){
    fruits.splice(index,1);
}
else{
    console.log("Element not found.");
}

//Filter the list to only include berry like fruits
const berrylikefruits = fruits.filter((fruit) => fruit!= "apple");

//Sort the fruits in alphabetical order
const sortedfruits = fruits.sort();

//Problem: Use a for loop to print each fruit
for (let i = 0; i<fruits.length;i++){
    console.log(fruits[i]);
}

//Problem: Print each fruit without for loop
fruits.forEach((element)=>console.log(element));

//Problem: Use a loop to calculate how many fruits are berry like
let sum=0;
for (let i=0; i<fruits.length;i++){
    if(fruits[i]!="apple"){
        sum+=1
    }
}

//Problem: Use a for loop to create a new array with all fruit names in uppercase
let uppercasefruits=[];
for (let i=0;i<fruits.length;i++){
    uppercasefruits.push(fruits[i].toUpperCase());
}

//Problem: Use a for loop to find the fruit name with most characters
let mostcharacters=0;
let mostcharactersIndex;
for (let i=0; i<fruits.length;i++){
    if(fruits[i].length>mostcharacters){
        mostcharactersIndex=i;
    }
}
console.log(`The fruits with most characters is: ${fruits[mostcharactersIndex]}`);

//Problem: Use a for loop to reverse the order of fruits in the array

let reverselist=[]
for(let i=fruits.length;i>0;i--){
    reverselist.push(fruits[i-1]);
}



console.log(reverselist);