import React from 'react'
import { useState } from 'react'
import { PencilIcon,TrashIcon } from '@heroicons/react/24/solid'
import { useDispatch, useSelector } from 'react-redux'
import { adminLogin, clearUser } from '../utils/userSlice'

const TheatreDetails = () => {
  const tdetails = useSelector(store=>store.user.values)
  const dispatch = useDispatch()

  const [price,setPrice] = useState(tdetails.ticketprice)
  const [seats,setSeats] = useState(tdetails.cols)
  const [rows,setRows] = useState(tdetails.rows)
  const [newtime,setNewtime] = useState('')
  const [editObj,setEditObj] = useState([])
  const [tempShows,setTempShows] = useState(tdetails.shows)
  let validate = false

  const addShow = () => {
    if (newtime != ''){
      const newShow = {
        id: Date.now(), 
        status: "Available",
        duration: "3hrs",
        time: newtime,
        booking: []
      }
      setTempShows([...tempShows, newShow])
      setNewtime('')
    }
  }

  const enableEdit = (element) => {
    const resetEdit = Object.keys(editObj).reduce((acc, key) => {
      acc[key] = false
      return acc
    }, {})
    setEditObj({
      ...resetEdit,
      [element.id]: true,
    })
    let dataEle = document.querySelector(`input[data-id="${element.id}"]`)
    setTimeout(() => {
      if(dataEle){
        dataEle.focus()
      }
    }, 0)
    
  }

  const updateShow = (element, index) => {
    const dataEle = document.querySelector(`input[data-id="${element.id}"]`)
    const alteredTime = dataEle ? dataEle.value : element.time
    if(alteredTime != element.time){
      const updatedShows = [...tempShows]
      updatedShows[index] = {
        ...updatedShows[index],
        time: alteredTime,
        status: "Available",
        duration: "3hrs",
        booking: []
      }
    
      setTempShows(updatedShows)
    }
    setEditObj(item =>({
      ...item,
      [element.id]: false,
    }))
  }

  
  const deleteShow = (element,i)=>{
    const s = tempShows.filter(show=>show.id != element.id)
    setTempShows(s)
  }

  function checkValues (){
    if( isNaN(price) || (Number(price) <= 0) ){
      alert("Enter valid Ticket Price")
    }else if(( isNaN(seats) || (Number(seats) <= 0) )){
      alert("Enter valid Seats per/row")
    }else if(( isNaN(rows) || (Number(rows) <= 0) )){
      alert("Enter valid Rows")
    }else{
      validate = true
    }
  }

  const updateDetails = async()=>{
    checkValues()
    if(validate){
      let jsonobj = {}
      if(price == tdetails.ticketprice && seats == tdetails.cols && rows == tdetails.rows && tempShows == tdetails.shows){
        alert('Theatre details remain unchanged; please verify or log out if needed.')
      }else if(seats !== tdetails.cols || rows !== tdetails.rows){
        let tshows = [...tempShows]
        const alterBookings = tshows.map(show => ({
          ...show,
          booking: show.booking.length > 0 ? [] : show.booking
        }));
        jsonobj = JSON.stringify({ ticketprice: Number(price),cols: Number(seats),rows: Number(rows),shows: alterBookings })        
      }else{
        jsonobj = JSON.stringify({ ticketprice: Number(price),shows: tempShows }) 
      }
      if(jsonobj != {}){
        try{
          let response = await fetch(`https://movies-server-34w8.onrender.com/updatedetails/${tdetails._id}`,{
            method : 'put',
            headers: { 'Content-Type': 'application/json' },
            body: jsonobj,
          });
          let data =  await response.json()
          if((data.message == 'Theatre updated')){
            alert(`Theatre details updated ${tdetails.venue}`)
            dispatch(adminLogin(data.updateTheatre))
            logoutAdmin()
          }
        }catch(err){
          console.error(err)
        }   
      }
    }
  }
  const logoutAdmin = ()=>{
    dispatch(clearUser())
  }
  
  return (
    <>
      <div className='w-96 mx-auto'>
        <h1 className='text-center text-2xl/9 font-bold tracking-tight text-black py-6'>Theatre Details</h1>
        <div className="space-y-6">
          <div className='flex items-center gap-x-3'>
            <label htmlFor='price' className='w-1/3 text-sm/6 font-medium text-gray-800'>
              Ticket Price ₹
            </label>
            <input id="price" type="text" name="price" value={price}
            placeholder='Enter price'
            onChange={(e) => setPrice(e.target.value)} 
            className='w-2/3 rounded-md bg-white px-3 py-1.5 sm:text-sm/6
                    outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 
                    focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-orange-500' 
            />
          </div>
          <div className='flex items-center gap-x-3'>
            <label htmlFor='seats' className='w-1/3 text-sm/6 font-medium text-gray-800'>
              Seats per/row
            </label>
            <input id="seats" type="text" name="seats" value={seats}
            placeholder='Enter seat count'
            onChange={(e) => setSeats(e.target.value)} 
            className='w-2/3 rounded-md bg-white px-3 py-1.5 sm:text-sm/6
                    outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 
                    focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-orange-500' 
            />
          </div>
          <div className='flex items-center gap-x-3'>
            <label htmlFor='rows' className='w-1/3 text-sm/6 font-medium text-gray-800'>
              No.of Rows
            </label>
            <input id="rows" type="text" name="rows" value={rows}
            placeholder='Enter rows'
            onChange={(e) => setRows(e.target.value)} 
            className='w-2/3 rounded-md bg-white px-3 py-1.5 sm:text-sm/6
                    outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 
                    focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-orange-500' 
            />
          </div>
          <div className='border rounded-lg'>
            <div className='flex justify-around bg-gray-200 rounded-t-lg font-medium py-1.5 text-center'>
              <h2 className='w-2/5'>Shows</h2>
              <h2 className='w-2/5'>Actions</h2>
            </div>
            {tempShows.map((element,index)=>(
              <div key={index} className='flex justify-around text-center text-sm py-1.5 border-b text-gray-700'>
                <div className='w-2/5 text-center'>
                  <input type="text"
                  disabled={!editObj[element.id]} 
                  data-id={element.id}
                  defaultValue={element.time}
                  className='w-2/3 rounded-md bg-white px-3 sm:text-sm/6
                  outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 
                  focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-orange-500'/>
                </div>
                <div className='w-2/5 flex justify-evenly'>
                  <div className='w-2/5'>
                    {editObj[element.id] ? 
                    <button onClick={() =>updateShow(element,index)}
                    className='rounded-md h-full border border-sky-500 text-sky-500 px-1'>
                      <span className='text-[13px] font-medium'>Edit</span>
                    </button>
                    :
                    <button onClick={() =>enableEdit(element)}
                    className='rounded-md h-full border border-sky-500 text-sky-500 px-1'>
                      <PencilIcon className='size-4'/>
                    </button>
                    }
                  </div>
                  <div className='w-2/5'>
                    <button onClick={() =>deleteShow(element,index)}
                    className='rounded-md h-full border border-rose-500 text-rose-500 px-1'>
                      <TrashIcon className='size-4'/>
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            <div className='flex justify-around text-center text-sm py-1.5 text-gray-700'>
              <div className='w-2/5 text-center'>
                <input type="text" 
                value={newtime}
                onChange={(e) => setNewtime(e.target.value)}
                className='w-2/3 rounded-md bg-white px-3 sm:text-sm/6
                outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 
                focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-orange-500'/>
              </div>
              <h2 className='w-2/5'>
                <button className='rounded-md border border-emerald-500 text-emerald-500 px-2 py-0.5 font-medium'
                onClick={addShow}>
                  + Add Shows
                </button>
              </h2>
            </div>
          </div>
          <div className='flex items-center gap-x-3'>
            <button type="button" onClick={logoutAdmin}
            className='flex w-1/3 justify-center rounded-md px-3 py-1.5 text-sm/6 font-medium
             border border-gray-500  text-gray-500 shadow-sm' 
            >
              Admin Logout
            </button>
            <button type="button" onClick={updateDetails}
            className='flex w-2/3 justify-center rounded-md bg-orange-500 px-3 py-1.5 text-sm/6 font-medium text-white shadow-sm' 
            >
              Update Details
            </button>
          </div>
          
        </div>
      </div>
    </>
  )
}

export default TheatreDetails
