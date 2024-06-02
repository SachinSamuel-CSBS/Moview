import React, { useState } from 'react'
import './Signup.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {

    const [name,setName] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/signup',{name,email,password})
        .then(result => {
            console.log(result)
            if(result.data === "Success") {
                navigate('/signin')
            } else if(result.data === "User already there") {
                alert("user already exists")
            }
        })
        .catch(err=>console.log(err))
    }

  return (
    <div className="signup">
        <div className="container">
            <h2>Sign up</h2>
            <form onSubmit={handleSubmit}>
                <div className="element">
                    <label htmlFor="name">
                        <strong>Name</strong>
                    </label>
                    <input
                        required
                        type="text"
                        placeholder='Enter Name'
                        autoComplete='off'
                        name='name'
                        className="input"
                        onChange={(e) => setName(e.target.value)} 
                    />
                </div>
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
                    Sign up
                </button>
            </form>
            <p>Already Have an Account</p>
            <Link to="/signin" className="btn2">
                Sign in
             </Link>
        </div>
    </div>
  )
}

export default Signup