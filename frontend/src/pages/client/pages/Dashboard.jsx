import React, { useEffect, useState } from 'react'
import Clock from '../components/Clock';
import { FaCarSide } from "react-icons/fa6";
import moment from 'moment';

// in
import { FaArrowRightToBracket } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";

// out
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";


const Dashboard = ({ vehicles }) => {

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
                                                            <th className='border-l border-r border-black'>Type</th>
                                                            <th>Total Time</th>
                                                      </tr>
                                                </thead>
                                                <tbody>
                                                      {
                                                            vehicles.map((vehicle, index) => {
                                                                  return (
                                                                        <tr key={index} className='text-center'>
                                                                              <td>{vehicle.ticketNumber}</td>
                                                                              <td className='border-l border-r border-black'>{vehicle.category}</td>
                                                                              <td>{

                                                                              }0.1 hours</td>
                                                                        </tr>
                                                                  )
                                                            })
                                                      }


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

                                    <div className='relative min-h-[44vh] rounded-3xl bg-[#C6C8CD] p-4'>
                                          <span className='absolute px-4 py-1 bg-[#B0ADBC] rounded-lg'>Slots</span>

                                          {/* content */}
                                          <div className='flex justify-between text-center p-4 items-center mt-4'>
                                                <div>
                                                      <h2 className='text-[#B94242] text-8xl'>{vehicles.length}</h2>
                                                      <p>Occupied</p>
                                                </div>

                                                <div>
                                                      <h2 className='text-8xl text-[#307629]'>101</h2>
                                                      <p>Available Slots</p>
                                                </div>

                                                <div className='bg-[#AFB6C6] rounded-2xl p-8 flex flex-col gap-1'>
                                                      <p>3/4-Wheeler</p>
                                                      <p className='text-[#9F5D2D] text-3xl font-light'>
                                                            {
                                                                  vehicles.filter(vehicle => vehicle.category === "3 wheels" || vehicle.category === "4 wheels").length
                                                            }
                                                            /48
                                                      </p>
                                                      <p>2-Wheeler</p>
                                                      <p className='text-[#9F5D2D] text-3xl font-light'>{
                                                            vehicles.filter(vehicle => vehicle.category === "2 wheels").length
                                                      }
                                                            /53</p>
                                                </div>
                                          </div>

                                    </div>
                              </div>
                        </div>

                  </div>
            </div >

      )
}

export default Dashboard