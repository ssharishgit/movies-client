import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import Shows from './Components/Shows'
import Home from './Components/Home'
import { Route, Routes, useNavigate } from 'react-router-dom'
import PageNotFound from './Components/PageNotFound'
import Register from './Components/Register'
import { SignIn } from './Components/SignIn'
import BookSeats from './Components/BookSeats'
import { useSelector } from 'react-redux'
import TheatreDetails from './Components/TheatreDetails'
import UserProfile from './Components/UserProfile'

function App() {
  const [allmovies,setAllmovies] = useState([])
  const navigate = useNavigate()
  const userDetails = useSelector(store=>store.user.values)

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYzQ1NDliOGRlMTI3ODQ1ZDMzZjdlYTJkNzZmNGYzNSIsIm5iZiI6MTczMzIwNDM4NS4wMTQwMDAyLCJzdWIiOiI2NzRlOTlhMTFhNjNiOGFjMjc5MmVkZjEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.9MuPPVkW5wmOIJZMkljU88PnsM70XDVuN4ADYC6oKmg'
    }
  };
  const getAllMovies = async ()=>{
    try{
      const res = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&region=IN', options);
      let data = await res.json()
      setAllmovies(data.results)
    }catch(err){
      console.error(err)
    }
  }

  useEffect(()=>{
    getAllMovies()
  },[])

  const findIt = (type,value) =>{
    navigate('/',{state :{type: type, value: value}})
  }

  return (
    <>
      <Navbar findIt={findIt}/>
      {(userDetails.role === 'admin') ? 
      <Routes>
        <Route path='/' element={<TheatreDetails />} />
        <Route path='*' element={<PageNotFound role={userDetails.role} />} />
      </Routes>
      :
      <Routes>
        <Route path='/' element={<Home allmovies={allmovies} />} />
        <Route path='/shows' element={<Shows />} />
        <Route path='/register' element={<Register />} />
        <Route path='/signin' element={<SignIn />} />
        {(userDetails.role === 'user') ?
          <Route path='/userprofile' element={<UserProfile />} />
        :
          <Route path='/' />
        }
        <Route path='/booktickets' element={<BookSeats />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      }
      
    </>
  )
}

export default App
