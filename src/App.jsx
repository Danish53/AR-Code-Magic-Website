import React, { useEffect } from 'react'
import ScrollToTop from './Components/ScrollToTop/ScrollToToppp'
import Footer from './Components/GlobleFooter/Footer'
import './App.css'
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchProfile } from './redux/authSlice';

function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchProfile());
    }
  }, [dispatch]);

  return (
    <>
      <ScrollToTop />
      <Outlet />
      <Footer />
    </>
  )
}

export default App