import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { Bars3Icon } from '@heroicons/react/24/solid'
import movieIcon from '../assets/movie-icon.png';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux'
import { clearUser } from '../utils/userSlice'

const Navbar = ({findIt}) => {
  const userDetails = useSelector(store=>store.user.values)
  const [selectedType,setSelectedType] = useState('Title')
  const [placeholder,setPlaceholder] = useState('Search movies by Title')
  const [searchData,setSearchData] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const changetype = (event) =>{
    setSelectedType(event.target.value)
    if(event.target.value == 'Title'){
      setPlaceholder('Search movies by Title')
    }else if(event.target.value == 'Genre'){
      setPlaceholder('Search movies by Genre')
    }else{
      setPlaceholder('Search movies by RealseDate DD/MM/YYYY')
    }
    setSearchData('')
    handleSearch()
  }

  const handleData = (event) =>{
    if(searchData != event.target.value){
      setSearchData(event.target.value)
    }
  }

  const handleAdminLogin = () =>{
    navigate('/signin',{state:{role:'admin'}})
  }

  const handleLogout = ()=>{
    dispatch(clearUser())
    navigate('/')
  }
  
  useEffect(() =>{
    if (searchData.length > 2){
      if(selectedType != 'Realse date') {
        findIt(selectedType, searchData)
      }else if(searchData.length > 9){
        findIt(selectedType, searchData)
      }
    }
  }, [searchData])

  const handleSearch = () =>{
    findIt(selectedType, searchData)
  }
  return (
    <div className='w-full bg-gray-100'>
      {(userDetails.role !== 'admin') ?
      <div className='w-5/6 mx-auto flex justify-between'>
        <Link className='md:w-1/5 flex items-start py-4' to='/'>
          <h1 className='md:text-xl xs:text-lg py-1.5 '>Movies </h1>
          <img src={movieIcon} alt="lgo" height="40" width="40" />
          <h1 className='md:text-xl xs:text-lg py-1.5'>Hub </h1>
        </Link>
        <div className='md:w-3/5 flex items-center'>
          <div className='w-4/5 px-3'>
            <div className='w-full flex items-center rounded-md bg-white outline outline-1 -outline-offset-1 
            outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 
            has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-orange-500'>
              <div className='grid shrink-0 grid-cols-1 focus-within:relative'>
                <select id='selected-type' name='selected-type' aria-label='selected-type' value={selectedType} onChange={changetype}
                  className='col-start-1 row-start-1 w-full appearance-none rounded-md py-1.5 pl-2 pr-6 text-sm/6 text-center cursor-pointer
                  placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-orange-500'
                >
                  <option>Title</option>
                  <option>Genre</option>
                  <option>Realse date</option>
                </select>
                <ChevronDownIcon
                  aria-hidden='true'
                  className='pointer-events-none col-start-1 row-start-1 mr-1 md:size-4 self-center justify-self-end text-gray-500 sm:size-3'
                />
              </div>
              <input id='movies' name='movies' type='text' placeholder={placeholder} value={searchData} onChange={handleData}
                className='block min-w-0 grow py-1.5 pl-1 pr-3 text-sm placeholder:text-gray-400 focus:outline focus:outline-0'
              />
              <button className='text-orange-600 p-1.5 mx-2 font-semibold' onClick={handleSearch}>
                <MagnifyingGlassIcon className='size-5'/>
              </button>
            </div>
          </div>
        </div>
        <div className='md:w-1/5 flex items-center justify-evenly sm:text-base xss:text-sm py-4'>
          {(userDetails.role === 'user') ?
          <div className='w-3/5 flex items-center justify-between'>
            <h1 className='cursor-auto capitalize'>{'Hello, ' + userDetails.username}</h1>
            <button className='h-6 w-16 text-xs rounded-md bg-orange-500 text-white hover:opacity-85'
            onClick={handleLogout}>
              Logout
            </button>
          </div>
          :
          <div className='w-3/5 flex items-center justify-between'>
            <h1 className='cursor-pointer' onClick={handleAdminLogin}>Admin</h1>
            <Link className='flex items-center' to='/signin'>
              <button className='h-6 w-16 text-xs rounded-md bg-orange-500 text-white hover:opacity-85'>
                Login
              </button>
            </Link>
          </div>
          }
          
          <div className='w-2/5 flex justify-center text-right'>
            <Menu as='div' className='relative inline-block text-left'>
              <div>
                <MenuButton className='inline-flex w-full justify-center gap-x-1.5 rounded-md px-2 py-1
                 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'>
                  <Bars3Icon className='size-5' />
                </MenuButton>
              </div>

              <MenuItems transition
                className='absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-md ring-1 ring-black/5 
                transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 
                data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in'
              >
                {(userDetails.role === 'user') ?
                <div className=''>
                  <MenuItem>
                    <Link to='/' className='block px-4 py-2 text-sm data-[focus]:bg-orange-50'>Home</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to='/userprofile' className='block px-4 py-2 text-sm data-[focus]:bg-orange-50'>User Profile</Link>
                  </MenuItem>
                </div>
                :
                <div className=''>
                  <MenuItem>
                    <Link to='/' className='block px-4 py-2 text-sm data-[focus]:bg-orange-50'>Home</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to='/register' className='block px-4 py-2 text-sm data-[focus]:bg-orange-50'>Register User</Link>
                  </MenuItem>
                  <MenuItem>
                    <div onClick={handleAdminLogin} 
                    className='block px-4 py-2 text-sm data-[focus]:bg-orange-50 cursor-pointer'>
                      Admin Login
                    </div>
                  </MenuItem>
                </div>
                }
                
              </MenuItems>
            </Menu>
          </div>
          <button className='relative'> 
          </button>
        </div>
      </div>
      :
      <div className='w-5/6 mx-auto flex justify-between'>
        <Link className='md:w-1/5 flex items-start py-4' to='/'>
          <h1 className='md:text-xl xs:text-lg py-1.5 '>Movies </h1>
          <img src={movieIcon} alt="lgo" height="40" width="40" />
          <h1 className='md:text-xl xs:text-lg py-1.5'>Hub </h1>
        </Link>
        <div className='md:w-3/5 flex items-center justify-center text-center text-xl'>
          {userDetails.venue +', '+ userDetails.location}
        </div>
        <div className='md:w-1/5 flex items-center justify-evenly sm:text-base xss:text-sm py-4'>
          <button className='h-6 w-16 text-xs rounded-md bg-orange-500 text-white hover:opacity-85'
          onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      }
    </div>
  )
}

export default Navbar
