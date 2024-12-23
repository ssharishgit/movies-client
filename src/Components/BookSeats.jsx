import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import Shows from './Shows'

export default function BookSeats() {
  const movieDetails = useSelector(store=>store.movie.items)
  const movie = movieDetails[0].title
  const navigate = useNavigate()
  const location = useLocation()
  const theatre = location.state?.theatre || []
  const formattedDate = location.state?.formattedDate || ''
  const showdate = location.state?.showdate || ''
  const time = location.state?.selectedShow || ''
  const id = location.state?.selectedIndex || ''
  const booked_seats = location.state?.selectedSeats || []
  const ticketPrice = location.state?.ticketPrice || 150
  const url = "https://image.tmdb.org/t/p/original"

  const displaySeats =()=>{
    return booked_seats
    .map(seat => {
      const [row, seatNumber] = seat.split('-')
      return `${String.fromCharCode(65 + parseInt(row))}${seatNumber}`
    })
    .join(', ')
  }
  const v = new Date(showdate);
  const date = v.toISOString().split('T')[0]

  const confirmTickets = async ()=>{
  
    try{
      let response = await fetch(`https://movies-server-34w8.onrender.com/theatres/${theatre._id}`,{
        method : 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          id,
          time,
          booking:{ 
            movie,
            date,
            booked_seats
          } 
        }),
      });
      let data =  await response.json()
      if((data.message == 'New booking') || (data.message == 'Seats updated')){
        alert(`Tickets booked for ${movie}`)
        navigate('/shows')
      }
    }catch(err){
      console.error(err)
    }
  }

  useEffect(()=>{
    document.body.style.overflow = 'auto'
  },[])

  return (
    <>
      <div>
        {(movieDetails.length >0) ?
        <div className='flex min-h-full flex-1 flex-col justify-center items-center px-6 py-8 lg:px-8 bg-neutral-200'>
          <div className='sm:mx-auto sm:max-w-xs'>
            <div className='px-3 pt-3 bg-white rounded-t-lg'>
              <div className='border-b-2 border-dashed border-gray-600 pb-3'>
                <img className="w-full rounded-md h-64" src={url+movieDetails[0].poster_path} alt={movieDetails[0].title} />
                <h2 className='my-3 font-bold tracking-tight text-gray-900 capitalize'>
                  <div className='text-lg leading-5'>{movieDetails[0].title}</div>
                </h2>
                <h3 className='text-neutral-600'>{formattedDate +" | "+ time }</h3>
                <h3 className='text-neutral-600'>{theatre.venue+", "+theatre.location}</h3>
              </div>
              <div className='py-3'>
                <h3 className='text-neutral-600 text-sm'>
                  {booked_seats.length} Ticket{booked_seats.length !== 1 ? 's' : ''}</h3>
                <h2 className='font-medium text-gray-700 text-lg uppercase py-1'>Screen 1</h2>
                <h3 className='text-neutral-600 text-sm uppercase'>{theatre.seattype+' - '+ displaySeats()}</h3>
              </div>
            </div>
            <div className='bg-neutral-100 px-3 py-2 font-medium'>
              <div className='flex justify-between text-sm'>
                <h2 className=''>Total</h2>
                <h2>₹{booked_seats.length * ticketPrice}</h2>
              </div>
            </div>
            <button className='w-full py-1 rounded-b-lg bg-orange-500 font-semibold text-white'
            // onClick={()=>navigate(`/shows`)}
            onClick={confirmTickets}
            >Confirm Tickets</button>

          </div>
        </div>
        : 
        <div>
          <div className='w-5/6 mx-auto pt-8 py-4'>
          <button className='w-full text-xl text-center uppercase text-orange-500 border-2 border-orange-500 py-4'
          onClick={()=>navigate(`/`)}
          >Please select a Movie</button>
          </div>
          <div className='w-full'>
            <div className='border-b '></div>
          </div>
        </div>
        }
      </div>
    </>
    
  )
}
