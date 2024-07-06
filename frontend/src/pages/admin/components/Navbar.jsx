import React from 'react'
import { IoMdLogOut } from "react-icons/io";
import { Link } from 'react-router-dom'

const Navbar = () => {
      return (

            <nav className='relative top-[100px] max-md:hidden'>
                  <ul className=' absolute top-0 bottom-0 left-0'>
                        <div className="fixed h-full lg:w-[200px] rounded-3xl py-8 px-4 m-auto flex gap-4 flex-col justify-between bg-[#D9D9D9]">
                              <div className='flex gap-4 flex-col'>
                                    <Link to="/admin/home/login-history" className='focus:bg-[#C6C8CD] rounded-xl w-fit py-2 px-4'>Login History</Link>
                                    <Link to="/admin/home/create-account" className='focus:bg-[#C6C8CD] rounded-xl w-fit py-2 px-4'>Create Account</Link>
                                    <Link to="/admin/home/manage-account" className='focus:bg-[#C6C8CD] rounded-xl w-fit py-2 px-4'>Manage Accounts</Link>
                              </div>

                              <button className=' mb-24 mx-auto bg-red-700 hover:bg-red-800 text-white w-fit flex items-center rounded-2xl p-2'>
                                    <IoMdLogOut className='text-1xl' />
                                    <Link to="/"><p className='text-xs font-bold'>logout</p></Link>
                              </button>
                        </div>
                  </ul>
            </nav >
      )
}

export default Navbar