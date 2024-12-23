import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { adminLogin, userLogin } from '../utils/userSlice'

export const SignIn = () =>{
  const location = useLocation()
  const role = location.state?.role || 'user'
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [placeholder,setPlaceholder] = useState('')

  useEffect(()=>{
    if(role != 'user'){
      setPlaceholder('kgcinemas')
      setEmail('')
      setPassword('')
    }else{
      setPlaceholder('')
      setEmail('')
      setPassword('')
    }
  },[role])

  const signin = async ()=> {
    try{
      if(role != 'user'){
        let res = await fetch('https://movies-server-34w8.onrender.com/theatres/adminlogin',{
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({email,password})
        });
        let data =  await res.json()
        alert(data.message)
        if(data.message === "Admin login successful"){
          dispatch(adminLogin(data.theatre))
          navigate('/')
        }
      }else{
        let res = await fetch('https://movies-server-34w8.onrender.com/users/login',{
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({email,password})
        });
        let data =  await res.json()
        if(data.message === "User loggin successful"){
          alert(data.message)
          let tokenId = data.token
          let loginData = {...data.user,tokenId}
          dispatch(userLogin(loginData))
          navigate('/')
        }
      }
    }catch(err){
      console.log(err)
    }
    
  }

  return (
    <>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-4/5 sm:max-w-xs'>
          <h2 className='mt-8 text-center text-2xl/9 font-bold tracking-tight text-gray-900 capitalize'>
            {role} Login
          </h2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-xs'>
          <div className='space-y-6'>
            <div>
              <label htmlFor='email' className='block text-sm/6 font-medium text-gray-900'>
                Email address
              </label>
              <div className='mt-2'>
                <input id='email' name='email' type='text' value={email}
                  placeholder= {placeholder}
                  onChange={(e) => setEmail(e.target.value)} 
                  className='block w-full rounded-md bg-white px-3 py-1.5 sm:text-sm/6
                  outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 
                  focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-orange-500'
                />
              </div>
            </div>

            <div>
              <label htmlFor='password' className='block text-sm/6 font-medium text-gray-900'>
                Password
              </label>
              <div className='mt-2'>
                <input id='password' name='password' type='text' value={password}
                  placeholder= {placeholder}
                  onChange={(e) => setPassword(e.target.value)} 
                  className='block w-full rounded-md bg-white px-3 py-1.5 sm:text-sm/6
                  outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 
                  focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-orange-500'
                />
              </div>
            </div>

            <div>
              <button onClick={signin}
              className='flex w-full justify-center rounded-md bg-orange-500 px-3 py-1.5 text-sm/6 font-medium text-white shadow-sm'
              >
                Login
              </button>
            </div>
          </div>
          {(role == 'user')?
          <p className='mt-4 text-center text-sm/6 text-gray-500'>
            Not a member?{' '}
            <Link to='/register' className='font-semibold text-orange-500'>
              Register here
            </Link>
          </p>
          : <div></div>
          }
        </div>
      </div>
    </>
  )
}