import React from 'react'
import { Link } from 'react-router-dom'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Bars3Icon } from '@heroicons/react/24/solid'
import movieIcon from '../assets/movie-icon.png';

const Navbar = () => {
    
  return (
    <div className='w-full bg-gray-100'>
      <div className='w-5/6 mx-auto flex justify-between'>
        <Link className='md:w-1/5 flex items-start py-4' to='/'>
          <h1 className='md:text-xl xs:text-lg py-1.5 '>Movies </h1>
          <img src={movieIcon} alt="lgo" height="40" width="40" />
          <h1 className='md:text-xl xs:text-lg py-1.5'>Hub </h1>
        </Link>
        <div className='md:w-3/5 flex items-center'>
          <div className='w-4/5 flex p-2 bg-gray-50 border border-gray-200 rounded-full'>
            <input className='w-full rounded-full text-sm px-3' type="text" />
            <button className='bg-orange-500 text-white p-1.5 rounded-full ml-1 font-semibold'>
              <MagnifyingGlassIcon className="size-4"/>
            </button>
          </div>
        </div>
        <div className='md:w-1/5 flex items-center justify-evenly sm:text-base xss:text-sm py-6 '>
          <Link to='/'>Admin</Link>
          <Link className='flex items-center' to='/register'>
            <button className='h-6 w-16 rounded text-xs text-white bg-orange-500'>Sign up</button>
          </Link>
          <button className='relative'> 
            <Bars3Icon className="size-7" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
