import React, { useEffect, useState } from 'react'
import Clock from '../components/Clock';
import { FaCarSide } from "react-icons/fa6";

// in
import { FaArrowRightToBracket } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";

// out
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";


const Dashboard = () => {

      return (

            <div className='absolute left-[200px] top-[100px] lg:overflow-x-hidden max-sm:hidden'>
                  <div className="mx-4 bg-[#D9D9D9] min-h-screen rounded-3xl" style={{ width: 'calc(100vw - 250px)' }}>


                        {/* CONTENT */}
                        <div className='py-12 px-4 grid grid-cols-2 gap-10'>
                              <div className="left flex flex-col gap-4">
                                    <div className='bg-[#C6C8CD] p-8 rounded-2xl w-full'>
                                          <Clock />
                                    </div>

                                    <div className='min-h-[50vh] overflow-y-auto overflow-x-hidden flex flex-col items-center bg-[#D2BAA5] rounded-2xl '>
                                          <p className='bg-[#AB9A80] rounded-3xl py-1 px-4 m-2'>Currently Parked</p>
                                          <table className='w-full '>
                                                <thead>
                                                      <tr className='text-center'>
                                                            <th>Ticket No.</th>
                                                            <th>Type</th>
                                                            <th>Total Time</th>
                                                      </tr>
                                                </thead>
                                                <tbody>
                                                      <tr className='text-center'>
                                                            <td>000001</td>
                                                            <td>2 wheels</td>
                                                            <td>3.5 hours</td>
                                                      </tr>

                                                </tbody>
                                          </table>
                                    </div>
                              </div>

                              <div className="right max-lg:hidden flex flex-col gap-4">

                                    <div className='flex gap-4 justify-evenly'>
                                          <button className='bg-[#81B489] border-2 rounded-2xl border-[#44833A] hover:bg-[#6a9c71] p-10 flex flex-col items-center w-[17vw]'>
                                                <div className='flex gap-2'>
                                                      <FaCarSide className='text-5xl' />
                                                      <FaArrowRightToBracket className='text-5xl' />
                                                </div>
                                                <p className='text-2xl font-[600]'>In</p>
                                                <FaPlus className='text-2xl font-[600]' />

                                          </button>
                                          <button className='bg-[#B96F6F] border-2 rounded-2xl border-[#833C3C] hover:bg-[#a15c5c] p-10 flex flex-col items-center w-[17vw]'>
                                                <div className='flex gap-2'>
                                                      <FaCarSide className='text-5xl' />
                                                      <FaArrowRightFromBracket className='text-5xl' />
                                                </div>
                                                <p className='text-2xl font-[600]'>Out</p>
                                                <FaMinus className='text-2xl font-bold' />

                                          </button>
                                    </div>

                                    <div className='min-h-[32vh] rounded-3xl bg-[#C6C8CD] p-4'>
                                          <span className='px-4 py-1 bg-[#B0ADBC] rounded-lg '>Slots</span>
                                    </div>
                              </div>
                        </div>

                  </div>
            </div >

      )
}

export default Dashboard