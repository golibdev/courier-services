import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
   return (
      <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
         <Link className="navbar-brand ps-3" to="/">Courier Service</Link>
         <div className='d-flex justify-content-between w-100'>
            <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i className="fas fa-bars"></i></button>
         </div>
      </nav>
   )
}
