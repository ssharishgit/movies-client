import React, { useEffect, useState } from 'react'
import { ChevronLeftIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'

const SeatLayouts = ({title,theatre,index,showdate,closeseats}) => {
  const [seatRow, setSeatRow] = useState(0)
  const [seatCol, setSeatCol] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState(index)
  const [selectedSeats, setSelectedSeats] = useState([])
  const [ticketPrice,setTicketPrice] = useState(0)
  const navigate = useNavigate()

  const shows = theatre.shows
  const showObj = shows.find(ele=>ele.id === selectedIndex)
  const selectedShow = showObj.time

  let date = new Date(showdate)
  let options = { weekday: 'long',month: 'short',day: 'numeric'}
  let formattedDate = date.toLocaleDateString(undefined, options)

  useEffect(() => {
    setGridDisplay()
  }, [])

  let btnStyle = "custombtn rounded py-1 w-28 h-10 bg-white border border-emerald-400 text-emerald-400"

  function setGridDisplay(){
    setSeatRow(theatre.rows)
    setSeatCol(theatre.cols)
    setTicketPrice(theatre.ticketprice)
  }
  
  const showsClick = (element,index) => {
    setSelectedSeats([])
    setSelectedIndex(index)
  }
  const proceedToPay = () => {
    navigate('/booktickets',{state:{theatre,formattedDate,showdate,selectedShow,selectedSeats,ticketPrice,selectedIndex}})
  };
  const renderSeats = () =>{
    const bookings = showObj.booking
    let bookedTickets = []
    if(bookings.length > 0){
      for( let b = 0;b < bookings.length; b++){
        if(bookings[b].movie === title){
          let d = new Date(bookings[b].date)
          if(d.toDateString() === showdate.toDateString()){
            bookedTickets = bookings[b].booked_seats
          }
        }
      }
    }

    const temp = []
    for(let i = 0;i < seatRow;i++){
      const seats =[]
      for(let j = 0;j < seatCol;j++){
        const isSelected = selectedSeats.includes(`${i}-${j}`);
        const isBooked = bookedTickets.includes(`${i}-${j}`);
        let btnDiv = ''
        if(isBooked){
          btnDiv =
          <button key={`${i}-${j}`}
            className={`seat text-[10px] text-center leading-6 w-6 max-h-6 m-1 cursor-auto rounded-sm bg-neutral-200 text-white`}
          >{j + 1}</button>
        }else{
          btnDiv =
          <button
            key={`${i}-${j}`}
            className={`seat text-[10px] text-center cursor-pointer custombtn leading-6 w-6 max-h-6 m-1 rounded-sm 
              border ${isSelected ? 'bg-emerald-400 text-white' : 'border-emerald-400 text-emerald-400'}`}
            onClick={() => seatClick(i, j)}
          >{j + 1}</button>
        }
        
        seats.push(btnDiv)
      }
      temp.push(
        <div key={i} className='flex' id={`row-${i}`}>
          <span className="w-16 mt-1 mr-2 text-neutral-500 text-sm text-center">{String.fromCharCode(65 + i)} </span>
          {seats}
        </div>
      )
    }
    return temp
  }

  const seatClick = (row, col) => {
    const seatId = `${row}-${col}`
    setSelectedSeats((prev) => 
      prev.includes(seatId) ? prev.filter(seat => seat !== seatId) : [...prev, seatId]
    )
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='w-full h-full flex flex-col bg-white'>
        <header className='flex-shrink-0'>
          <div className='flex items-center justify-between py-3 px-2'>
            <div className='flex items-center'>
              <button onClick={closeseats}  className='px-2'>
                <ChevronLeftIcon  className='size-6'/>
              </button>
              <div>
                <h2 className='text-lg font-semibold'>{title}</h2>
                <h3 className='text-neutral-600 text-sm'>
                  {theatre.venue+", "+theatre.location +' | '+ formattedDate +'  '+ selectedShow }
                </h3>
              </div>
            </div>
            <div>
              <button onClick={closeseats} className='p-2 '>
                <XMarkIcon className='size-5' />
              </button>
            </div>
          </div>
          <div className='bg-slate-100 px-10'>
            <div className='flex gap-2.5 py-4 px-2'>
              {shows.map((element, index) => (
                <button
                key={index}
                className={`${btnStyle} ${selectedIndex === element.id ? 'active' : ''}`}
                onClick={() => showsClick(element,element.id)}
                >
                  {element.time}
                </button>
              ))}
            </div>
          </div>
        </header>
        <div className='flex-grow overflow-y-auto'>
          <div className='text-sm px-[5%] pb-4'>
            <div className='flex justify-between text-neutral-600 py-2 my-4 border-b-2'>
              <div>
                Rs. {ticketPrice} 
                <span className='uppercase'>{' ' +theatre.seattype}</span>
              </div>
              <div className='flex justify-evenly gap-x-4'>
                <div className='flex gap-x-1.5 items-center'>
                  <button
                    className='text-[10px] text-center leading-6 w-4 max-h-4 h-4 cursor-auto rounded-sm border border-emerald-400'
                  >
                  </button>
                  <h3>Available</h3>
                </div>
                <div className='flex gap-x-1.5 items-center'>
                  <button
                    className='text-[10px] text-center leading-6 w-4 max-h-4 h-4 cursor-auto rounded-sm bg-emerald-400'
                  >
                  </button>
                  <h3>Selected</h3>
                </div>
                <div className='flex gap-x-1.5 items-center'>
                  <button
                    className='text-[10px] text-center leading-6 w-4 max-h-4 h-4 cursor-auto rounded-sm bg-neutral-200'
                  >
                  </button>
                  <h3>Booked</h3>
                </div>
              </div>
            </div>
            <div id='seats-royal'>
              {renderSeats()}
            </div>
          </div>
        </div>
        <div className={`flex-shrink-0 bottom-0 p-2.5 bg-white shadow-[0_-4px_12px_-2px_rgba(0,0,0,0.3)]
          ${selectedSeats.length === 0 ? ' hidden' : ''} text-center text-sm`}>
          <button
            className={`w-1/4 py-2 rounded-md bg-orange-400 text-white`}
            onClick={proceedToPay}
            disabled={selectedSeats.length === 0}
          >
            Pay Rs-{selectedSeats.length * ticketPrice} ({selectedSeats.length} seat{selectedSeats.length !== 1 ? 's' : ''})
          </button>
        </div>
      </div>
    </div>
  )
}

export default SeatLayouts
