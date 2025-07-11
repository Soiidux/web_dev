//Proxy such that user is able to make only VALID changes to data

let person = {
    fname: "Yash",
    lname: "Nagpal",
    age: 18
}

let personProxy = new Proxy(person, {
    get(target, prop) {
        if (prop in target){
            return Reflect.get(target,prop);
        }
        else{
            return "Invalid propery";
        }
    },
    set(target,prop,value){
        if(!(prop in target)){
            throw new Error(`${prop} does not exist`);
        }
        switch(prop){
            case 'fname':
            case 'lname':
                if(typeof value !== 'string' ){
                    throw new Error(`${prop} must be a string`);
                }
            break;
            case 'age':
                if(typeof value!== 'number') throw new Error(`${prop} must be a number`)
                if(value<=0) throw new Error(`${prop} must be greater than 0`);
            break;
            
            
        }
        Reflect.set(target,prop,value);
        }
})

// console.log(personProxy.age);
// console.log(personProxy.password);
// personProxy.age=-10;
// personProxy.age="abc";
// personProxy.fname=1;


//Proxy such that the user is not able to change anything, but is able to view anything except password

let person2 = {
    username: "Yash Nagpal",
    age: 18,
    password: "123"
}

let person2Proxy = new Proxy(person2,{
    get(target,prop){
        if(prop in target){
            switch(prop){
                case 'password':
                    return "Access Denied: Cannot access the password of a user."
                    break;
                default:
                    return Reflect.get(target,prop); 
            }
        }
        else{
            throw new Error(`${prop} does not exist`);
        }
    },

    set(target,prop,value){
        throw new Error(`Cannot modify properties: ${prop} cannot be modified`);
    }
})

// console.log(person2Proxy.username);
// console.log(person2Proxy.age);     
// console.log(person2Proxy.password); 
// person2Proxy.age = 25;    


//basic implementation for negative indexing in an array
arr=[1,2,3,4,5];

let arrProxy = new Proxy(arr,{
    get(target,prop){
        if(prop<0){
            return target[target.length+ Number(prop)];

        }
        else{
            return Reflect.get(target,prop);
        }
    },
    set(target,prop,value){
        if(Number(prop)<0){
            newprop = target.length + Number(prop);
            return Reflect.set(target,newprop,value);
        }
        else{
            return Reflect.set(target,prop,value);
        }
    }
})

console.log(arrProxy[-1]);
// arrProxy[-1]=4;
arrProxy[-3]=-1;
arrProxy.splice(-2,1);
console.log(arrProxy);

