import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {

  const [username,setUserName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [language,setLanguage] = useState("")
  const [location,setLocation] = useState("")

  const navigate = useNavigate()

  const collectData = async ()=>{
    let response = await fetch('https://movies-server-hoe5.onrender.com/users/register',{
      method : 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username,email,password,language,location }),
    });
    localStorage.setItem("user",JSON.stringify({ username,email,password,language,location }))
    let data =  await response.json()
    console.log(data)
    if(data){
      alert(data.message)
      navigate('/')
    }
    console.warn(response)
  }
  return (
    <div>
      <h1 className='w-60 text-2xl font-semibold mx-auto py-6'>User Registeration</h1>
      <input className='w-60 block p-2 m-4 border-2 border-orange-300 mx-auto' 
      onChange={(e) => setUserName(e.target.value)} value={username}
      type="text" name="name" placeholder='Enter name'/>
      <input className='w-60 block p-2 m-4 border-2 border-orange-300 mx-auto' 
      onChange={(e) => setEmail(e.target.value)} value={email}
      type="text" name="email" placeholder='Enter email'/>
      <input className='w-60 block p-2 m-4 border-2 border-orange-300 mx-auto' 
      onChange={(e) => setPassword(e.target.value)} value={password}
      type="text" name="password" placeholder='Enter password'/>
      <input className='w-60 block p-2 m-4 border-2 border-orange-300 mx-auto' 
      onChange={(e) => setLanguage(e.target.value)} value={language}
      type="text" name="language" placeholder='Preferred language'/>
      <input className='w-60 block p-2 m-4 border-2 border-orange-300 mx-auto' 
      onChange={(e) => setLocation(e.target.value)} value={location}
      type="text" name="location" placeholder='Preferred location'/>
      <button className='w-60 block p-2 m-4 bg-orange-400 mx-auto' 
      onClick={collectData}
      type="button">Sign Up</button>
    </div>
  )
}

export default Register
