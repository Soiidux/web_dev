// import fs from 'fs';
import fs from 'fs/promises';
//readFile() - callback

// fs.readFile('./test.txt','utf-8', (error,data)=>{
//     if(error) throw error;
//     console.log(data);
// });

// //readFileSync() - Synchronous version
// const data = fs.readFileSync('./test.txt','utf-8');
// console.log(data);

//readFile() - Promise version
// fs.readFile('./text.txt','utf-8')
//     .then((data)=>console.log(data))
//     .catch((error)=>console.log(error));

//async await version (modern)
const readFile = async () => {
    try {
        const data = await fs.readFile('./test.txt','utf-8');
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

const writeFile = async ()=>{
    try {
        await fs.writeFile('./test.txt','Hello, I am writing to this file.');
        console.log("File written");
    } catch (error) {
        console.log(error);
    }
}

const appendFile = async ()=>{
    try {
        await fs.appendFile('./test.txt','\nHello, I am appending to this file.');
        console.log('File appended');
    } catch (error) {
        console.log(error);
    }
}

const run = async () => {
    await writeFile();
    await readFile();
    await appendFile();
    await readFile();
};

run();

