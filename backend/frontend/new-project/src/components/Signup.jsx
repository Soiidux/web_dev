import { useState } from "react";
import apiClient from "../../service/apiClient";
import { useNavigate } from "react-router";

function Signup(){
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [loading,setloading] = useState(false);
    const [error,setError] = useState("");

    //for navigation
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault()
        setloading(true)
        setError('')

        //Make an API call to backend with data
        //Get response from backend
        //take action based on response

        try{
            console.log('Trying to do a signup');
            const data = await apiClient.signup(name,email,password);
            console.log("Signup response: ",data);
            if(data.success){
                navigate('login');
            }
            else{
                setError(data.message || 'Signup Failed');
            }
        }
        catch(error){
            console.log(`Error:${error}`);
        }
        finally{
            setloading(false);
        }
    }
    return(
        <div>
            <h1>Welcome to Signup Page</h1>
            {error && <div>Error: {error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input 
                    type="text" 
                    name="name" 
                    id="name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input 
                    type="emal" 
                    name="email" 
                    id="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input 
                    type="password" 
                    name="password" 
                    id="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    required 
                    />
                </div>
                <button
                type = "submit"
                disabled = {loading}
                >{loading? "Signup....":"Signup"}</button>
            </form>
        </div>
    )
}

export default Signup;