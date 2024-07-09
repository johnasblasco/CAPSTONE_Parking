import axios from 'axios';
import React, { useState } from 'react'
import { IoMdLogOut } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
      const navigate = useNavigate();
      const [logOut, setLogOut] = useState(false)


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

            navigate("/")
      }

      return (
            <>


                  <nav className='relative top-[100px] max-md:hidden'>
                        <ul className=' absolute top-0 bottom-0 left-0'>
                              <div className="fixed h-full lg:w-[200px] max-[500px]:hidden rounded-3xl py-8 px-4 m-auto flex gap-4 flex-col justify-between bg-[#D9D9D9]">
                                    <div className='flex gap-4 flex-col'>
                                          <Link to="/user/dashboard" className='focus:bg-[#C6C8CD] rounded-xl w-fit py-2 px-4'>Dashboard</Link>
                                          <Link to="/user/manage-vehicles" className='focus:bg-[#C6C8CD] rounded-xl w-fit py-2 px-4'>Manage Vehicles</Link>
                                          <Link to="/user/reports" className='focus:bg-[#C6C8CD] rounded-xl w-fit py-2 px-4'>Reports</Link>
                                          <Link to="/user/about" className='focus:bg-[#C6C8CD] rounded-xl w-fit py-2 px-4'>About</Link>
                                    </div>

                                    <button onClick={() => setLogOut(true)} className=' mb-24 mx-auto bg-red-700 hover:bg-red-800 text-white w-fit flex items-center rounded-2xl p-2'>
                                          <IoMdLogOut className='text-1xl' />
                                          <p className='text-xs font-bold'>logout</p>
                                    </button>
                              </div>
                        </ul>
                  </nav >

                  {/* POPUP */}
                  {
                        logOut && <div className='fixed bg-black/20 h-full w-full z-100 flex justify-center items-center'>
                              <div className='bg-[#D9D9D9] py-10 lg:w-[30vw] rounded-3xl flex flex-col justify-between h-[50vh]'>
                                    <h2 className='text-center text-5xl font-extrabold'>Log Out</h2>
                                    <p className='text-center'>are you sure you want to log out?</p>
                                    <div className='flex justify-evenly'>
                                          <button onClick={handleLogout} className='px-8 py-4 rounded-2xl text-white bg-[#75C578] hover:bg-[#5aa15d] w-30'>Log Out</button>
                                          <button className='px-8 py-4 text-white rounded-2xl bg-[#C58475] hover:bg-[#9e6659] w-34' onClick={() => setLogOut(false)} >Cancel</button>
                                    </div>
                              </div>

                        </div>
                  }
            </>
      )
}

export default Navbar