import React, { useState } from 'react'
import './Signin.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signin() {

    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/signin',{email,password})
        .then(result => {
            console.log(result)
            if(result.data === "Success") {
                navigate('/home')
                localStorage.setItem('email', JSON.stringify(email));
                localStorage.setItem('login', true);
            } else if(result.data === "The password is incorrect") {
                alert("The password is incorrect");
            } else if(result.data === "User doesn't exist") {
                alert("User doesn't existed");
            }
        })
        .catch(err=>console.log(err))
    }

  return (
    <div className="signin">
        <div className="container">
            <h2>Sign in</h2>
            <form onSubmit={handleSubmit}>
                <div className="element">
                    <label htmlFor="email">
                        <strong>Email</strong>
                    </label>
                    <input 
                        required
                        type="email"
                        placeholder='Enter Email'
                        autoComplete='off'
                        name='email'
                        className="input"
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>
                <div className="element">
                    <label htmlFor="password">
                        <strong>Password</strong>
                    </label>
                    <input 
                        required
                        type="password"
                        placeholder='Enter Password'
                        autoComplete='off'
                        name='password'
                        className="input"
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
                <button type='submit' className="btn1">
                    Sign in
                </button>
            </form>
            <p>Don't Have an Account ?</p>
            <Link to="/" className="btn2">
                Sign up
             </Link>
        </div>
    </div>
  )
}

export default Signin