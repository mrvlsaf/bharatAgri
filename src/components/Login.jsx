import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (event) => {
        event.preventDefault();
        if (username !== "bharatagri" || password !== "1234")
            console.log("incorrect")
        else navigate("/home");
    }

    return (
        <div className='main-container'>
            <div className='login-container'>
                <div className='login-head'>Welcome to BharatAgri!</div>
                <form onSubmit={handleLogin}>
                    <div className='login-input-cont'>
                        <div>Username</div>
                        <input required value={username} onChange={(e) => setUsername(e.target.value)} type='text' />
                    </div>
                    <div className='login-input-cont'>
                        <div>Password</div>
                        <input required value={password} onChange={(e) => setPassword(e.target.value)} type='password' />
                    </div>
                    <button type="submit" className='login-button'>LOGIN</button>
                </form>
                <div className='forgot-pass-cont'><span>Forgot Password?</span></div>
            </div>
        </div>
    )
}
