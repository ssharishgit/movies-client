import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import SeatLayouts from './SeatLayouts'

const Shows = () => {
  
  const navigate = useNavigate()
  const movieDetails = useSelector(store=>store.movie.items)
  const [showSeats,setShowSeats] = useState(false)
  const [showDate, setShowDate] = useState()
  const [theatreDetails, setTheatreDetails] = useState([])
  const [theatre, setTheatre] = useState('')

  const openSeatLayouts = () => {
    setShowSeats(true)
  }

  const getAllTheatres = async ()=>{
    try{
      const res = await fetch('https://movies-server-34w8.onrender.com/theatres',{
        method : 'get',
        headers: { 'Content-Type': 'application/json' },
      })
      let results = await res.json()
      console.log(results.data)
      setTheatreDetails(results.data)
    }catch(err){
      console.error(err)
    }
  }

  useEffect(() => {
    onInit()
    getAllTheatres()
  }, [])

  useEffect(() => {
    if(showSeats){
      document.body.style.overflow = 'hidden'
    }else{
      document.body.style.overflow = 'auto'
    }
  }, [showSeats])

  function onInit(){
    let tempDate = new Date()
    tempDate.setDate(tempDate.getDate() + 1)
    setShowDate(tempDate)
  }

  const [selectedIndex, setSelectedIndex] = useState(null)
  const [selectedShowDate, setSelectedShowDate] = useState(0)

  let btnStyle = "rounded py-1 w-28 h-10 border border-emerald-400 text-emerald-400"
  let showStyle = "customdate flex flex-col justify-center items-center w-12 border py-1 rounded-md"
  const showClick = (value,index) => {
    setTheatre(value)
    setSelectedIndex(index)
    openSeatLayouts()
  }

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  let dateDetails = []

  for(let i = 1;i <= 4;i++){
    const currentDay = new Date()

    let tempDate = currentDay

    tempDate.setDate(tempDate.getDate() + i)
    let number = tempDate.getDate()
    let txt = '' 
    if(number < 10){
      txt = '0' + number
    }else{
      txt = number.toString()
    }
    let displayDate = days[(tempDate.getDay() % 7)]
    let displayMonth = months[tempDate.getMonth()]
    dateDetails.push({
      id: i,
      "day": displayDate,
      "number": txt,
      "month": displayMonth,
      "date": tempDate
    })
  }
  const handleDateChange = (element,index) => {
    setShowDate(element.date)
    setSelectedShowDate(index)
  }
  return (
    <>
      <div>
        {(movieDetails.length >0) ? 
        <div>
          {showSeats && <SeatLayouts title={movieDetails[0].title} theatre={theatre} index={selectedIndex}
           showdate={showDate} closeseats={()=>setShowSeats(false)} />}
          <div className='w-5/6 mx-auto pt-8 py-4'>
            <h1 className='text-4xl my-2'>{movieDetails[0].title}</h1>
          </div>
          <div className='w-full'>
            <div className='border-b '></div>
          </div>
          <div className='w-5/6 mx-auto flex gap-3 px-4 py-2'>
            {dateDetails.map((element, index) => (
                <button
                key={index}
                className={`${showStyle} ${selectedShowDate === index ? 'active' : ''}`}
                onClick={() => handleDateChange(element,index)}
                >
                  <div className='uppercase text-neutral-500 text-[10px]'>{element.day}</div>
                  <div className='font-medium leading-5'>{element.number}</div>
                  <div className='uppercase text-neutral-500 text-[10px]'>{element.month}</div>
                </button>
            ))}
          </div>
          <div className='w-full bg-gray-100 py-4'>
            <div className='w-5/6 mx-auto bg-white'>
              {theatreDetails.map((theatres,i) => (
                <div className='flex items-center border-t py-4' key={i}>
                  <div className='w-1/4 py-4'>
                    <h1 className='font-bold px-4'>{theatres.venue}</h1>
                  </div>
                  <div className='flex gap-4 p-4'>
                    {theatres.shows.map((element, index) => (
                      <button
                      key={index}
                      className={`${btnStyle}`}
                      onClick={() => showClick(theatres,element.id)}
                      >
                        {element.time}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
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

export default Shows
