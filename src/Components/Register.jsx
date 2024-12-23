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
    let response = await fetch('https://movies-server-34w8.onrender.com/users/register',{
      method : 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username,email,password,language,location }),
    });
    let data =  await response.json()
    if(data){
      alert(data.message)
      navigate('/signin')
    }
  }
  return (
    <>
      <div className='w-80 mx-auto'>
        <h1 className='mt-8 text-center text-2xl/9 font-bold tracking-tight text-gray-900 py-6'>User Registeration</h1>
        <div className="space-y-6">
          <input id="username" type="text" name="username" value={username}
          placeholder='Enter name'
          onChange={(e) => setUserName(e.target.value)} 
          className='block w-full rounded-md bg-white px-3 py-1.5 sm:text-sm/6
                  outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 
                  focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-orange-500' 
          />
          <input id="email" type="text" name="email" value={email}
          placeholder='Enter email'
          onChange={(e) => setEmail(e.target.value)} 
          className='block w-full rounded-md bg-white px-3 py-1.5 sm:text-sm/6
                  outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 
                  focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-orange-500' 
          />
          <input id="password" type="text" name="password" value={password}
          placeholder='Enter password'
          onChange={(e) => setPassword(e.target.value)} 
          className='block w-full rounded-md bg-white px-3 py-1.5 sm:text-sm/6
                  outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 
                  focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-orange-500' 
          />
          <input id="language" type="text" name="language" value={language}
          placeholder='Enter language'
          onChange={(e) => setLanguage(e.target.value)} 
          className='block w-full rounded-md bg-white px-3 py-1.5 sm:text-sm/6
                  outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 
                  focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-orange-500' 
          />
          <input id="location" type="text" name="location" value={location}
          placeholder='Enter location'
          onChange={(e) => setLocation(e.target.value)} 
          className='block w-full rounded-md bg-white px-3 py-1.5 sm:text-sm/6
                  outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 
                  focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-orange-500' 
          />
          <button type="button" onClick={collectData}
          className='flex w-full justify-center rounded-md bg-orange-500 px-3 py-1.5 text-sm/6 font-medium text-white shadow-sm' 
          >
            Register
          </button>
        </div>
      </div>
    </>
    
  )
}

export default Register
