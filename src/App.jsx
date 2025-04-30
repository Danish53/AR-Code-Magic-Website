import React from 'react'
import ScrollToTop from './Components/ScrollToTop/ScrollToToppp'
import Footer from './Components/GlobleFooter/Footer'

import './App.css'
import { Outlet } from 'react-router-dom';
function App() {
  return (
    <>
    <ScrollToTop />
    <Outlet /> 
    <Footer/>
    </>
  )
}

export default App