import React, { useState } from 'react'
import { IoMdLogOut } from "react-icons/io";
import { Link } from 'react-router-dom'

const Navbar = () => {

      const [logOut, setLogOut] = useState(false)

      const handleLogOut = () => {
            console.log(logOut)
            setLogOut(!logOut);
      }


      return (
            <>

                  <nav className='fixed top-[100px] left-[10%] font-bold '>

                        <div className=" w-[80vw] bg-white border-4 border-[#001858] p-1 rounded-full text-center">
                              <div className='flex justify-center gap-4 '>

                                    <Link to="/admin/home/settings" className='focus:bg-darkYeelow rounded-full w-[200px] border-4 border-[#001858] py-2 px-4'>Settings</Link>
                                    <Link to="/admin/home/create-account" className='focus:bg-darkYeelow rounded-full w-[200px] border-4 border-[#001858] py-2 px-4'>Create Account</Link>
                                    <Link to="/admin/home/manage-account" className='focus:bg-darkYeelow rounded-full border-4 border-[#001858] w-[200px] py-2 px-4'>Manage Account</Link>
                                    <Link to="/admin/home/login-history" className='focus:bg-darkYeelow rounded-full w-[200px] border-4 border-[#001858] py-2 px-4'>Login History</Link>
                                    <Link to="/admin/home/reports" className='focus:bg-darkYeelow rounded-full w-[200px] border-4 border-[#001858] py-2 px-4'>Reports</Link>
                              </div>


                        </div>
                  </nav >


            </>

      )
}

export default Navbar