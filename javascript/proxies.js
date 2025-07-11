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

console.log(personProxy.age);
// console.log(personProxy.password);
// personProxy.age=-10;
// personProxy.age="abc";
// personProxy.fname=1;

