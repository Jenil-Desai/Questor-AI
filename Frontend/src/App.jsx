import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HeroSection from './pages/HeroSection'
import Dashboard from './pages/Dashboard'

const App = () => {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<HeroSection />}/>
    <Route path='/dashboard' element={<Dashboard />} />
   </Routes>
   </BrowserRouter>
  )
}

export default App