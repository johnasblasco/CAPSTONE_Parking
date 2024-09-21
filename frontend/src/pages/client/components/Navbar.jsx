import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {


      return (
            <>

                  <nav className='fixed top-[100px] left-[10%] font-bold '>

                        <div className=" w-[80vw] bg-white border-4 border-[#001858] p-1 rounded-full text-center">
                              <div className='flex justify-center gap-4 '>
                                    <Link to="/user/dashboard" className='focus:bg-darkYeelow rounded-full w-[200px] border-4 border-[#001858] py-2 px-4'>Dashboard</Link>
                                    <Link to="/user/manage-vehicles" className='focus:bg-darkYeelow rounded-full border-4 border-[#001858] w-[200px] py-2 px-4'>Manage Vehicles</Link>
                                    <Link to="/user/reports" className='focus:bg-darkYeelow rounded-full w-[200px] border-4 border-[#001858] py-2 px-4'>Reports</Link>
                              </div>


                        </div>

                  </nav >


            </>
      )
}

export default Navbar