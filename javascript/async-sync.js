//syncronous =  Executes executes line by line consecutively in a sequencial manner. It is a code that waits for operations to complete
//              It is a blocking code
//Example of a sync code: 

console.log("Task 1");
console.log("Task 2");
console.log("Task 3");

//asyncronous = Allows multiple operations to be performed concurrently without waiting. It is a non-blocking code i.e it doesn't block
//              execution flow and allows the program to continue. It is handled with callbacks, promises and async/await
//              (I/O operations, network requests, fetching data)
//Example of async code:

setTimeout(() => console.log("Task 4"),3000);
console.log("Task 5");








//Async(non-blocking) operations *without using promises*

//Read a file hello.txt
//Make a new file called backup.txt
//Copy the contents of hello.txt to backup.txt
//Delete hello.txt

// @@@@@@   LEGACY CODE   @@@@@@
// -----------------------------------------------------------------------------------------------------------------------------

// const fs = require("fs");
// console.log("Starting Program");
// fs.readFile("./hello.txt","utf-8",function(err,response){   //Reading hello.txt
//     if (err){
//         console.log("Error reading hello.txt"); //error messages
//     }
//     else{
//         console.log("Hello.txt was read successfully")
//         fs.writeFile("backup.txt",response,function(err){   //Making backup.txt and writing on it
//             if(err){
//                 console.log("Error in writing backup.txt");
//             }
//             else{
//                 console.log("Successfully written backup.txt");
//                 fs.unlink("./hello.txt",function(err){
//                     if(err){
//                         console.log("Error in deleting hello.txt");
//                     }
//                     else{
//                         console.log("hello.txt deleted successfully");
//                     }
//                 })
//             }
//         })
//     }
// })
// console.log("Program ended");
// -----------------------------------------------------------------------------------------------------------------------------




// @@@@@@   CONVERTING LEGACY CODE TO MODERN CODE   @@@@@@
// -----------------------------------------------------------------------------------------------------------------------------

const fs = require('fs');
function ReadFileWithPromise(filepath,encoding){
    return new Promise((resolve,reject)=>
    {
        fs.readFile(filepath,encoding,(error,content)=>
        {
            if(error){
                reject(error);                                  //Signal to user's .catch function to run
            }
            else{
                resolve(content);                               //Signal to user's .then function to run
            }       
        })
    })
}

function WriteFileWithPromise(filename,content){
    return new Promise((resolve,reject)=>
    {
        fs.writeFile(filename,content,function(error)
        {
           if(error){
            reject(error);
           } 
           else{
            resolve(`${filename} was written successfully`);
           }
        })
    })
}

function DeleteFileWithPromise(filepath){
    return new Promise((resolve,reject)=>
        {
            fs.unlink(filepath,function(error)
            {
                if(error){
                    reject(error);
                }
                else{
                    resolve("File was deleted.");
                }
            })
        })
}
// console.log("Program start");
// ReadFileWithPromise('./hello.txt','utf-8')
//     .then((content)=>WriteFileWithPromise('backup.txt',content))
//     .then((Writtenmessage)=>{
//         console.log(Writtenmessage);
//         return DeleteFileWithPromise('./hello.txt');
//     })
//     .then((Deletemessage)=>console.log(Deletemessage))
//     .catch((error)=>console.log(`Error: ${error}`))
//     .finally(()=>console.log("All done"))
// console.log("Program end.")
// -----------------------------------------------------------------------------------------------------------------------------

//  @@@@@@ CONVERTING THE ABOVE CODE INTO A MORE READABLE CODE USING ASYNC AND AWAIT :Async code looks like sync code   @@@@@@
// -----------------------------------------------------------------------------------------------------------------------------
async function DoTasks() {
    try{
        const filecontent = await ReadFileWithPromise('./hello.txt','utf-8')
        await WriteFileWithPromise('backup.txt',filecontent)
        await DeleteFileWithPromise('./hello.txt') 
    }
    catch{
        (error)=>console.log(`Error: ${error}`)
    }
    finally{
        console.log("All done");
    }
}

DoTasks().then(()=> console.log("All done"));






// @@@@@@   CODING ASYNC OPERATIONS USING PROMISES   @@@@@@
// -----------------------------------------------------------------------------------------------------------------------------
//Async(non-blocking) operations *using promises*

//Read a file hello.txt
//Make a new file called backup.txt
//Copy the contents of hello.txt to backup.txt
//Delete hello.txt
// console.log("Starting Program");
// const fsv2 = require("fs/promises");
// fsv2.readFile("./hello.txt","utf-8")
// .then((response)=> 
//     {
//         console.log("Hello.txt was read successfully")
//         fsv2.writeFile("backup.txt",response)
//         console.log("Successfully written backup.txt")
//     })
// .then(()=>
//     {
//         fsv2.unlink("./hello.txt")
//         console.log("hello.txt deleted successfully")
//     })
// .catch((error)=>console.log("Error",error));

// console.log("Program ended");
// -----------------------------------------------------------------------------------------------------------------------------