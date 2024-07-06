import axios from 'axios';
import React from 'react'
import { IoMdLogOut } from "react-icons/io";
import { Link } from 'react-router-dom'

const Navbar = () => {

      const handleLogout = async () => {
            const response = await axios.get("http://localhost:8000/user")
            const user = response.data.find((user) => user.login)


            //get the user from loginHistory that has same name
            const responseLog = await axios.get("http://localhost:8000/admin/loginHistory")
            const userLog = responseLog.data.find((userLog) => userLog.timeOut === null)

            //set date now
            const now = new Date()

            //time out na 
            await axios.put(`http://localhost:8000/admin/loginHistory/${userLog._id}`, { ...userLog, timeOut: now })

            //mag log out
            await axios.put(`http://localhost:8000/user/${user._id}`, { ...user, login: false })

      }

      return (

            <nav className='relative'>
                  <ul className=' absolute top-0 bottom-0 left-0'>
                        <div className="fixed h-full lg:w-[200px] max-[500px]:hidden rounded-3xl py-8 px-4 m-auto flex gap-4 flex-col justify-between bg-[#D9D9D9]">
                              <div className='flex gap-4 flex-col'>
                                    <li>Login History</li>
                                    <li>Create Account</li>
                                    <li>Manage Accounts</li>
                              </div>

                              <button className=' mb-24 mx-auto bg-red-700 hover:bg-red-800 text-white w-fit flex items-center rounded-2xl p-2'>
                                    <IoMdLogOut className='text-1xl' />
                                    <Link onClick={handleLogout} to="/"><p className='text-xs font-bold'>logout</p></Link>
                              </button>
                        </div>
                  </ul>
            </nav >
      )
}

export default Navbar