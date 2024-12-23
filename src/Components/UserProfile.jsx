import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearUser } from '../utils/userSlice'
import { useNavigate } from 'react-router-dom'

const UserProfile = () => {
  const userdetails = useSelector(store=>store.user.values)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [name,setName] = useState(userdetails.username)
  const [language,setLanguage] = useState(userdetails.language)
  const [location,setLocation] = useState(userdetails.location)

  const updateDetails = async()=>{
    if(language == userdetails.language && location == userdetails.location){
      alert('User details remain unchanged; please verify or log out if needed.')
    }else{
      try{
        let response = await fetch(`https://movies-server-34w8.onrender.com/users/${userdetails._id}`,{
          method : 'put',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ language,location }) ,
        });
        let data =  await response.json()
        if((data.message == 'User updated')){
          alert(`User details updated`)
          handleLogout()
        }
      }catch(err){
        console.error(err)
      }   
    }
  }
  const handleLogout = ()=>{
    dispatch(clearUser())
    navigate('/')
  }
  
  return (
    <>
      <div className='w-96 mx-auto'>
        <h1 className='text-center text-2xl/9 font-bold tracking-tight text-black py-6'>User Details</h1>
        <div className="space-y-6">
          <div className='flex items-center gap-x-3'>
            <label htmlFor='name' className='w-2/5 text-sm/6 font-medium text-gray-800'>
              User Name
            </label>
            <input id="name" type="text" name="name" value={name}
            disabled
            onChange={(e) => setName(e.target.value)} 
            className='w-3/5 rounded-md bg-white px-3 py-1.5 sm:text-sm/6
                    outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 
                    focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-orange-500' 
            />
          </div>
          <div className='flex items-center gap-x-3'>
            <label htmlFor='language' className='w-2/5 text-sm/6 font-medium text-gray-800'>
              Preferred Language
            </label>
            <input id="language" type="text" name="language" value={language}
            placeholder='Enter language'
            onChange={(e) => setLanguage(e.target.value)} 
            className='w-3/5 rounded-md bg-white px-3 py-1.5 sm:text-sm/6
                    outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 
                    focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-orange-500' 
            />
          </div>
          <div className='flex items-center gap-x-3'>
            <label htmlFor='location' className='w-2/5 text-sm/6 font-medium text-gray-800'>
              Preferred Location
            </label>
            <input id="location" type="text" name="location" value={location}
            placeholder='Enter location'
            onChange={(e) => setLocation(e.target.value)} 
            className='w-3/5 rounded-md bg-white px-3 py-1.5 sm:text-sm/6
                    outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 
                    focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-orange-500' 
            />
          </div>
          <div className='flex items-center gap-x-3'>
            <button type="button" onClick={handleLogout}
            className='flex w-2/5 justify-center rounded-md px-3 py-1.5 text-sm/6 font-medium
             border border-gray-500  text-gray-500 shadow-sm' 
            >
              Logout
            </button>
            <button type="button" onClick={updateDetails}
            className='flex w-2/3 justify-center rounded-md bg-orange-500 px-3 py-1.5 text-sm/6 font-medium text-white shadow-sm' 
            >
              Update Details
            </button>
          </div>
          
        </div>
      </div>
    </>
  )
}

export default UserProfile