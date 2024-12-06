import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import Shows from './Components/Shows'
import Home from './Components/Home'
import { Route, Routes } from 'react-router-dom'
import PageNotFound from './Components/PageNotFound'
import Register from './Components/Register'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shows' element={<Shows />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<PageNotFound/>} />
      </Routes>
      {/* <Shows /> */}
    </>
  )
}

export default App
