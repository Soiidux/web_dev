import { EventEmitter } from 'events';

const myEmitter = new EventEmitter();

function greetHandler(name){
    console.log(`Hello ${name}`);
}

function goodbyeHandler(name){
    console.log(`Hello ${name}`);
}

//Register event listeners

myEmitter.on('greet',greetHandler);
myEmitter.on('goodbye',goodbyeHandler);

//Emit events

myEmitter.emit('greet','John Doe');
myEmitter.emit('goodbye','John Doe');

//Error handling
myEmitter.on('error',(err)=>{
    console.log("An error occured:",err);
})

myEmitter.emit('error',new Error('Something went wrong'));