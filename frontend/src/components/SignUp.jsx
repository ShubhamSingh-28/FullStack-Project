//import React from 'react'
import axios from "axios";
import { useState } from "react";
//import { Link } from "react-router-dom"
export default function SignUp() {
  const[registrationData, setRegistrationData] = useState({
    email: '',
    password: ''
  })
  const handleChange  = (e) =>{
    const { name, value} = e.target;
    setRegistrationData((prevValue) => ({...prevValue, [name]:value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       const response = await axios.post('http://localhost:8000/register',registrationData)
       console.log(response.data);
 
       // Reset the form after successful registration
      
    } catch (error) {
       console.error(error);
    }
    setRegistrationData({
      email: '',
      password: ''
   });
 };
 



  return (
 <div>
  <h1>Registration Form</h1>
  <form onSubmit={handleSubmit}>
    <input type="email" 
    name="email"  
    placeholder="email" 
    required
    value={registrationData.email}
    onChange={handleChange}
    />
   <input
   type="password"
   name="password"  
   placeholder="Password"
   required
   value={registrationData.password}
   onChange={handleChange}
/>
    <button type="submit">Register</button>
  </form>
 </div>

  )
}

