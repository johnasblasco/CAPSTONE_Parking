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

                  <nav className='relative top-[100px] max-md:hidden'>
                        <ul className=' absolute top-0 bottom-0 left-0'>
                              <div className="fixed h-full lg:w-[200px] rounded-3xl py-8 px-4 m-auto flex gap-4 flex-col justify-between bg-[#D9D9D9]">
                                    <div className='flex gap-4 flex-col'>
                                          <Link to="/admin/home/login-history" className='focus:bg-[#C6C8CD] rounded-xl w-fit py-2 px-4'>Login History</Link>
                                          <Link to="/admin/home/create-account" className='focus:bg-[#C6C8CD] rounded-xl w-fit py-2 px-4'>Create Account</Link>
                                          <Link to="/admin/home/manage-account" className='focus:bg-[#C6C8CD] rounded-xl w-fit py-2 px-4'>Manage Accounts</Link>
                                    </div>

                                    <button onClick={handleLogOut} className=' mb-24 mx-auto bg-red-700 hover:bg-red-800 text-white w-fit flex items-center rounded-2xl px-3 py-2'>
                                          <p className='text-xs font-bold'><IoMdLogOut className='inline text-2xl' /> Logout</p>
                                    </button>
                              </div>
                        </ul>

                  </nav >
                  {/* POPUP */}
                  {
                        logOut && <div className='fixed bg-black/20 h-full w-full z-100 flex justify-center items-center'>
                              <div className='bg-[#D9D9D9] py-10 max-md:w-[50vw] w-[30vw] max-sm:hidden rounded-3xl flex flex-col justify-between h-[50vh]'>
                                    <h2 className='text-center text-5xl font-extrabold'>Log Out</h2>
                                    <p className='text-center'>are you sure you want to log out?</p>
                                    <div className='flex justify-evenly'>
                                          <Link to="/" className='px-8 py-4 rounded-2xl text-white bg-[#75C578] hover:bg-[#5aa15d] w-30'>Log Out</Link>
                                          <button className='px-8 py-4 text-white rounded-2xl bg-[#C58475] hover:bg-[#9e6659] w-34' onClick={handleLogOut}>Cancel</button>
                                    </div>
                              </div>

                        </div>
                  }

            </>

      )
}

export default Navbar