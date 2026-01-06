import { useState, useEffect } from "react";

export function App(){
    const [message,setMessage] = useState("Hello World");

    useEffect(()=>{
         //return
    },[])
    return (
        <div>
            <h1>Hello World</h1>
            <h2>{message}</h2>
        </div>
    );
}