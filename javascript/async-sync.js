//Async(non-blocking) operations *without using promises*

//Read a file hello.txt
//Make a new file called backup.txt
//Copy the contents of hello.txt to backup.txt
//Delete hello.txt
const fs = require("fs");
console.log("Starting Program");
fs.readFile("./hello.txt","utf-8",function(err,response){   //Reading hello.txt
    if (err){
        console.log("Error reading hello.txt"); //error messages
    }
    else{
        console.log("Hello.txt was read successfully")
        fs.writeFile("backup.txt",response,function(err){   //Making backup.txt and writing on it
            if(err){
                console.log("Error in writing backup.txt");
            }
            else{
                console.log("Successfully written backup.txt");
                fs.unlink("./hello.txt",function(err){
                    if(err){
                        console.log("Error in deleting hello.txt");
                    }
                    else{
                        console.log("hello.txt deleted successfully");
                    }
                })
            }
        })
    }
})
console.log("Program ended");

// -----------------------------------------------------------------------------------------------------------------------------

//Async(non-blocking) operations *using promises*

//Read a file hello.txt
//Make a new file called backup.txt
//Copy the contents of hello.txt to backup.txt
//Delete hello.txt
console.log("Starting Program");
const fsv2 = require("fs/promises");
fsv2.readFile("./hello.txt","utf-8")
.then((response)=> 
    {
        console.log("Hello.txt was read successfully")
        fsv2.writeFile("backup.txt",response)
        console.log("Successfully written backup.txt")
    })
.then(()=>
    {
        fsv2.unlink("./hello.txt")
        console.log("hello.txt deleted successfully")
    })
.catch((error)=>console.log("Error",error));

console.log("Program ended");