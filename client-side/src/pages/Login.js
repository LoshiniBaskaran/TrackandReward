import React, { useState, useContext } from 'react';
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import { AuthContext } from "../helpers/AuthContext";

function Login() {

    const navigate = useNavigate();

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const {setAuthState} = useContext(AuthContext);

    const login = async () => {
        if(username === "" || password === "")
            window.alert("Both username and password are required");
        else {
            const data = {email: username, pwd: password};
            await axios.post("http://localhost:3001/employees/login", data).then((response) => {
                if(!response.data.error) {
                    localStorage.setItem("accessToken", response.data.token);
                    setAuthState({
                        empId:response.data.empId,
                        empName:response.data.empName,
                        email:response.data.email,
                        designation:response.data.designation,
                        status: true
                      });
                    navigate("/");
                }
                else {
                    window.alert(response.data.error);
                }
            })
        }
    }

    return (
        <div className='card' style={{margin:"20px auto"}}>
            <div className='card-header'>Login</div>
            <div className='card-content'>
                    <label name="userName">Username </label>
                    <input name="userName" type = "text" autoComplete='off' placeholder='Your email is your username...' onChange={(event) => {setUserName(event.target.value)}} />    
                    <br/>
                    <label name="Password">Password </label>
                    <input type = "password" autoComplete='off' onChange={(event) => {setPassword(event.target.value)}} />
                    <br/>
                <button onClick={login}> LOGIN </button>
            </div>
        </div>
    )
}

export default Login
