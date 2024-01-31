import React from 'react';
import React, { useState , useEffect} from 'react';
import 'axios';
import { useNavigate ,Link } from 'react-router-dom';



function Login() {
    const history =useNavigate()

    const {email,setEmail} = useState('')
    const {password,setPassword} = useState('')

    async function submit(e){
        e.preventDefault();

        try{
            await axios.post('http://localhost:8080/Login',{
                email,password
            })
        }
        catch{
            console.log(e)
        }
    }
  return (
    <div>
        <h1>Login</h1>
        <form action='POST'>
            <input type="text" onChange={(e) =>{setEmail(e.target.value)}}/>
            <input type="text" onChange={(e) =>{setPassword(e.target.value)}}/>
            <button onClick={submit}>Submit</button>
        </form>
    </div>
  )
}

export default Login;
