numbers=[1,3,5,6,2,6,7];
function sum(array){
    let sum = 0;
    for(let i=0; i<array.length;i++){
        sum+=array[i];
    }
    return sum;
}

console.log(sum(numbers));