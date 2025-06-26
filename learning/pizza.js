let numberofGuests = 4;

let pizzaSize;
// small <= 2
// medium <= 5
//large

if (numberofGuests<=2){
    pizzaSize="small";
}
else if(numberofGuests<=5){
    pizzaSize="medium";
}
else{
    pizzaSize="large";
}
console.log(pizzaSize);
