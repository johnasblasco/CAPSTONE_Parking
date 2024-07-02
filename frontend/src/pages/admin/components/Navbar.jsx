import React from 'react'
import { IoMdLogOut } from "react-icons/io";

const Navbar = () => {
      return (

            <nav className='relative'>
                  <ul className=' absolute top-0 bottom-0 left-0'>
                        <div className="fixed h-full lg:w-[200px] max-[500px]:hidden rounded-3xl py-8 px-4 m-auto flex gap-4 flex-col justify-between bg-gray-200">
                              <div className='flex gap-4 flex-col'>
                                    <li>Login History</li>
                                    <li>Create Account</li>
                                    <li>Manage Accounts</li>
                              </div>

                              <button className=' mb-24 mx-auto bg-red-700 text-white w-fit flex items-center rounded-2xl p-2'>
                                    <IoMdLogOut className='text-1xl' />
                                    <p className='text-xs font-bold'>logout</p>

                              </button>
                        </div>
                  </ul>
            </nav>
      )
}

export default Navbar