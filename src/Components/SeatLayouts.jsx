import React, { useEffect, useState } from 'react'
import { ChevronLeftIcon, XMarkIcon } from '@heroicons/react/24/outline'

const SeatLayouts = ({movie,theatre,index,showtimes,showdate,closeseats}) => {
  const royalRef = React.createRef()
  const [seatRow, setSeatRow] = useState(0)
  const [seatCol, setSeatCol] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState(index)
  const [selectedSeats, setSelectedSeats] = useState([])
  const [ticketPrice,setTicketPrice] = useState(180)

  let date = new Date(showdate)
  let options = { weekday: 'long',month: 'short',day: 'numeric'}
  let formattedDate = date.toLocaleDateString(undefined, options)

  useEffect(() => {
    setGridDisplay()
  }, [])

  let btnStyle = "custombtn rounded py-1 w-28 h-10 bg-white border border-emerald-400 text-emerald-400"

  function setGridDisplay(){
    const royalElement = royalRef.current
    if (royalElement) {
      const row = Number(royalElement.getAttribute("seatrow"))
      const col = Number(royalElement.getAttribute("seatcol"))
      setSeatRow(row)
      setSeatCol(col)
    }
  }
  
  const showsClick = (element,index) => {
    setSeatRow(element.rows)
    setSeatCol(element.cols)
    setSelectedIndex(index)
    renderSeats()
  }
  const proceedToPay = () => {
    console.log("Seats", selectedSeats);
  };
  const renderSeats = () =>{
    const temp = []
    for(let i = 0;i < seatRow;i++){
      const seats =[]
      for(let j = 0;j < seatCol;j++){
        const isSelected = selectedSeats.includes(`${i}-${j}`);
        seats.push(
          <button
            key={`${i}-${j}`}
            className={`seat text-[10px] text-center cursor-pointer custombtn leading-6 w-6 max-h-6 m-1 rounded-sm 
              border ${isSelected ? 'bg-emerald-400 text-white' : 'border-emerald-400 text-emerald-400'}`}
            onClick={() => seatClick(i, j)}
          >{j + 1}</button>
        )
        // seats.push(<button key={j} className='seat text-[10px] text-center cursor-pointer custombtn
        //    leading-6 w-6 max-h-6 m-1 rounded-sm  border border-emerald-400 text-emerald-400'>{j + 1}</button>)
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full h-lvh bg-white">
        <div className='flex items-center justify-between pt-4 px-2'>
          <div className='flex items-center'>
            <button onClick={closeseats}  className="px-2">
              <ChevronLeftIcon  className="size-6"/>
            </button>
            <div>
              <h2 className="text-lg font-semibold">{movie}</h2>
              <h3 className='text-neutral-600'>{theatre +" | "+ formattedDate +"  "+ showtimes[selectedIndex].time }</h3>
            </div>
          </div>
          <div>
            <button onClick={closeseats} className="p-2 ">
              <XMarkIcon className='size-5' />
            </button>
          </div>
        </div>
        <div className='py-4'>
          <header className='bg-slate-100 px-10'>
            <div className="flex gap-2.5 py-4">
              {showtimes.map((element, index) => (
                <button
                key={index}
                className={`${btnStyle} ${selectedIndex === index ? 'active' : ''}`}
                onClick={() => showsClick(element,index)}
                >
                  {element.time}
                </button>
              ))}
            </div>
          </header>
          <div className="text-sm px-[5%]">
            <div className="text-neutral-600 py-2 my-4 border-b-2 max-h-96 overflow-y-auto">Rs. {ticketPrice}  PREMIUM</div>
            <div ref={royalRef} id="seats-royal"  seatrow="10" seatcol="15">
              {renderSeats()}
            </div>
          </div>
        </div>
        <div className="fixed bottom-0 left-0 right-0 p-2.5 bg-white shadow text-center">
          <button
            className={`w-1/4 py-2 rounded bg-orange-400 text-white ${selectedSeats.length === 0 ? ' hidden' : ''}`}
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
