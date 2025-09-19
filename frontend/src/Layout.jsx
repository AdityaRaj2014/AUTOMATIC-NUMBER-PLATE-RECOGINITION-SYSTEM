import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './component/Navbar/Navbar.jsx'
function Layout(){
    return(
        <>
    <Navbar/>
    <div className="max-w-7xl mx-auto pt-20 px-6">
     <Outlet/>
    </div>
    </>
    )
}
export default Layout