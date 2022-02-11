import React, {useEffect, useState} from 'react'
import { Navbar } from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { isAuthentification } from '../handlers/isAuthentification'

const AppLayout = () => {
   const token = localStorage.getItem('token')
   const navigate = useNavigate()

   const isAuth = isAuthentification(token)

   useEffect(() => {
      if(isAuth == false) {
         return navigate('/login')
      } 
   }, [navigate])
   return (
      <>
         <Navbar/>
         <div id='layoutSidenav'>
            <Sidebar/>
            <Outlet/>
            <ToastContainer/>
         </div>
      </>
   )
}

export default AppLayout