import React from 'react';
import React, { useState , useEffect} from 'react';
import 'axios';
import { useNavigate ,Link } from 'react-router-dom';



function Signup() {

    const {email,setEmail} = useState('')
    const {password,setPassword} = useState('')

    async function submit(e){
        e.preventDefault();

        try{
            await axios.post('http://localhost:8080/Signup',{
                email,password
            })
            .then(res =>{
                if(res.data == "exist"){
                    history('/home',{state:{id:email}})
                }else if(res.data == "not exist"){
                    alert("User not exist")
                }
            })
            .catch(e)
        }
        catch{
            console.log(e =>{
                alert("wrong details")
                console.log(e);
            })
        }
    }
  return (
    <div>
        <h1>Signup</h1>
        <form action='POST'>
            <input type="text" onChange={(e) =>{setEmail(e.target.value)}}/>
            <input type="text" onChange={(e) =>{setPassword(e.target.value)}}/>
            <button onClick={submit}>Submit</button>
        </form>
    </div>
  )
}

export default Signup;
