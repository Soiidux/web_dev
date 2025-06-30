const arr =[1,2,3,4,5,6];

//Error: .forEach function does not exist on arr varible
//.forEach calls a function for every element 

if(!Array.prototype.myforEach){ //In reality it will be *forEach* and not *myforEach*, but it has been done so for learning purposes.
    Array.prototype.myforEach = function(callbackFn){
        const originalArr=this; 
        for (let i =0; i<originalArr.length;i++){
            callbackFn(originalArr[i],i,originalArr);
        }
    }
}

function myFn(Arr_element,i,Arr){
    console.log(`At index ${i}, ${Arr_element} is present`);
}

// arr.myforEach(myFn);
 
////////////////////////////////////////////////////////////////////////////////////
//Error: .map function does not exist on arr variable
//.map maps the elements to a new array on the basis of a provided mapping function
if(!Array.prototype.mymap){
    Array.prototype.mymap=function(mappingFn){
        const originalArr=this;
        const newArr=[];
        for(let i=0;i<originalArr.length;i++){
            newArr.push(mappingFn(originalArr[i],i));
        }
        return newArr;
    }
}

function mymappingFn(Arr_element,i,Arr){
    return Arr_element*2;
}

// console.log(arr.mymap(mymappingFn));


/////////////////////////////////////////////////////////////////////////////////////

//Error: .filter function does not exist on arr variable
//.filter returns a new array consisting of elements for which the filterFn returns true
if(!Array.prototype.myfilter){
    Array.prototype.myfilter = function(filterFn){
        const originalArr=this;
        const newArr=[];
        for(let i=0;i<originalArr.length;i++){
            if(filterFn(originalArr[i],i)){
                newArr.push(originalArr[i]);
            }
        }
        return newArr;
    }
}

function myfilterFn(Arr_element,i,Arr){
    if(Arr_element%2===0){
        return true;
    }
}

console.log(arr.myfilter(myfilterFn));