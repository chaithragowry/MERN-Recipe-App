import './auth.css'
import React, { useState } from 'react';
import axios from "axios"; //used to send the post req to our API
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom"




export const Auth = () => {
    return (
        <div className="auth">
            <Login />
            <Register />
        </div>
    );
};

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)


    const [_, setCookies] = useCookies(["access_token"]);

    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();
        if (username.length == 0 || password.length == 0) {
            setError(true);
        }
        try {
            const response = await axios.post("http://localhost:3001/auth/login", {
                username,
                password,
            });
            console.log(response)
            
            if(response.data.token){
            setCookies("access_token", response.data.token);
            window.localStorage.setItem("userID", response.data.userID);
            navigate("/");
            }
            else{
                alert("Username or Password is Incorrect");
            }
        
        }catch (err) {
            console.error(err)
        }
    };

    return (

        <div className='login-form'>
            <div className='left'>
                <form className='form-container' onSubmit={onSubmit}>
                    <h1>Login to Your Account</h1>
                    <input
                        type="text"
                        placeholder='Username'
                        className='form-input'
                        value={username}
                        onChange={(event) => setUsername(event.target.value)} />

                    {error && username.length <= 0 ?
                        <p>username can't be empty</p> : ""}

                    <input
                        type="password"
                        placeholder='Password'
                        className='form-input'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)} />

                    {error && password.length <= 0 ?
                        <p>password can't be empty</p> : ""}


                    <button type="submit" className='left-btn'>Sign In</button>
                </form>
            </div>
        </div>
    );
};


const Register = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)


    const onSubmit = async (event) => {
        event.preventDefault(); //used to prevent refreshing of the page when submit the form
        if (username.length == 0 || password.length == 0) {
            setError(true);
        }
        try {
            await axios.post("http://localhost:3001/auth/register", {
                username,
                password,
            });
            if(!username.length==0 && !password.length==0){
            alert("Registration completed! Now Sign In")
            setUsername('');
            setPassword('');
            }
        } catch (err) {
            console.error(err)
        }
    };


    return (

        <div className='register-form'>
            <div className='right'>
                <form className='form-container' onSubmit={onSubmit}>
                    <h1>New Here ?</h1>
                    <input
                        type="text"
                        placeholder='Username'
                        className='form-input'
                        value={username}
                        onChange={(event) => setUsername(event.target.value)} />

                    {error && username.length <= 0 ?
                        <p>username can't be empty</p> : ""}


                    <input
                        type="password"
                        placeholder='Password'
                        className='form-input'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)} />

                    {error && password.length <= 0 ?
                        <p>password can't be empty</p> : ""}


                    <button type="submit" className='right-btn'>
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

