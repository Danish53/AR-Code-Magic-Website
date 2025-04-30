import React from 'react'
import { Outlet } from 'react-router-dom';
import WebNavbar from '../WebsiteComponents/WebNavbarMain/WebNavbar';
function WebsiteLayout () {
  return (
   
   <>
    <WebNavbar/>

    <Outlet />
    </>
  )
}

export default WebsiteLayout 