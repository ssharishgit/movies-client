import React, { useEffect, useState } from 'react'
import { MovieCard } from './MovieCard';
import { useDispatch } from 'react-redux';
import { clearMovie } from '../utils/movieSlice';
import { useLocation } from 'react-router-dom';

const Home = ({allmovies}) => {
  const dispatch = useDispatch()
  const [moviesList,setMoviesList] = useState([])
  const location = useLocation()

  const type = location.state?.type || false
  const value = location.state?.value || false

  useEffect(()=>{
    dispatch(clearMovie())
    location.state = null
    document.body.style.overflow = 'auto'
  },[])

  const genreArray =[
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]
  
  useEffect(() => {
    if(allmovies && type && value) {
      let tempArray = []
      if(type == 'Title') {
        tempArray = allmovies.filter(movie => movie.title.toLowerCase().includes(value.toLowerCase()))
      }else if(type == 'Genre') {
        tempArray = allmovies.filter(movie => movie.genre_ids.some(genreId =>
          genreArray.find(genre => genre.id === genreId)?.name.toLowerCase().includes(value.toLowerCase())
        ))
      }else{
        let d = value.split("/")
        let dateObject = new Date(`${d[2]}`, d[1] - 1, d[0])
        let ymdDate = `${dateObject.getFullYear()}-${dateObject.getMonth() + 1}-${dateObject.getDate()}`
        tempArray = allmovies.filter(movie => movie.release_date.includes(ymdDate))
      }
      setMoviesList(tempArray)
    } else {
      setMoviesList(allmovies)
    }
  },[allmovies, type, value])
  
  return (
    <div className='w-5/6 mx-auto py-4'>
      <h1 className='text-2xl font-bold leading-7 py-4'>Now Playing Movies</h1>
      <div className='flex flex-wrap gap-8 pb-8'>
        {moviesList.map((element,index) =>(
          <div key={index}>
            <MovieCard {...element}
            content = {element}
            genreArray = {genreArray}
            key={element.id}
            />
          </div>
        ))}
        
      </div>
    </div>
  )
}

export default Home
