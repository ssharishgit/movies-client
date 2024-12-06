import React, { useEffect, useState } from 'react'
import { MovieCard } from './MovieCard';
import { useDispatch } from 'react-redux';
import { clearMovie } from '../utils/movieSlice';

const Home = () => {
  const [allmovies,setAllmovies] = useState([])
  const dispatch = useDispatch()
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYzQ1NDliOGRlMTI3ODQ1ZDMzZjdlYTJkNzZmNGYzNSIsIm5iZiI6MTczMzIwNDM4NS4wMTQwMDAyLCJzdWIiOiI2NzRlOTlhMTFhNjNiOGFjMjc5MmVkZjEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.9MuPPVkW5wmOIJZMkljU88PnsM70XDVuN4ADYC6oKmg'
    }
  };

  const getAllMovies = async ()=>{
    await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&region=IN', options)
    .then(res => res.json())
    .then(res => setAllmovies(res.results))
    .catch(err => console.error(err));
  }
  console.log(allmovies)
  useEffect(()=>{
    dispatch(clearMovie())
    getAllMovies()
  },[])
  return (
    <div className='w-5/6 mx-auto py-4'>
      <h1 className='text-2xl font-bold leading-7 py-4'>Now Playing Movies</h1>
      <div className='flex flex-wrap gap-8 pb-8'>
        {allmovies.map((element,index) =>(
          <div key={index}>
            <MovieCard {...element}
            content = {element}
            key={element.id}
            />
          </div>
        ))}
        
      </div>
    </div>
  )
}

export default Home
