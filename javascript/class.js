class Person {                      //class=blueprint
    constructor(fname,lname){
        this.fname=fname;
        this.lname=lname;

    }
    getfullname(){
        return this.fname+" "+this.lname;
    }
}

const p1= new Person("Piyush","Garg");
const p2 = new Person("Akash","Kadlag");

console.log(p1.getfullname());
console.log(p2.getfullname());


