import { useDispatch } from 'react-redux'
import { addMovie } from '../utils/movieSlice'
import { useNavigate } from 'react-router-dom'

export function MovieCard({id,title,release_date,poster_path,content,genre_ids,popularity,backdrop_path}){

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const url = "https://image.tmdb.org/t/p/original"

  let date = new Date(release_date)
  let options = { day: '2-digit', month: '2-digit', year: 'numeric' }
  let formattedDate = date.toLocaleDateString('en-GB', options)

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
  let genres = genreArray.filter(item => genre_ids.includes(item.id)).map(item => item.name)
  genres = genres.toString() 
  
  const handleMovieClick = ()=>{
    dispatch(addMovie(content))
    navigate('/shows')
  }

  return (
    <>
      <div className="w-56 cursor-pointer" onClick={handleMovieClick}>
        <img className="w-full rounded-md" src={url+poster_path} alt={title} />
      </div>
      <div className="w-56 cursor-pointer" onClick={handleMovieClick}>
        <h1 className="text-lg font-semibold leading-5 pt-4 pb-1">{title}</h1>
        <h4 className="text-xs text-neutral-500">({formattedDate})</h4>
        <p className="text-neutral-600 pt-2">{genres}</p>
      </div>

    </>
  )
}