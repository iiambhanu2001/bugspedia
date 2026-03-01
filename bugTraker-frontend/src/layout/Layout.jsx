import React from 'react'
import Navbar from "../components/navbar.jsx"
import Sidebar from "./sidebar.jsx"
import { Outlet } from 'react-router-dom'


function Layout({islogin}) {
  return (
    <div className='min-h-screen flex flex-col bg-gray-100'>
     <Navbar islogin={islogin}/>
     <div className="flex flex-1">
        <Sidebar/>
        <main className='flex-1 p-6'>
            <Outlet/>
        </main>
     </div>

    </div>
  )
}

export default Layout