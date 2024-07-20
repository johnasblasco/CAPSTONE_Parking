import React from 'react'
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { MdLocalPrintshop } from "react-icons/md";

const Reports = () => {
      return (
            <>
                  <Header />
                  <div className='absolute left-[200px] top-[100px] lg:overflow-x-hidden max-lg:hidden'>
                        <div className="mx-4 bg-[#D9D9D9] min-h-screen rounded-3xl" style={{ width: 'calc(100vw - 250px)' }}>


                              {/* header */}
                              <div className='relative my-4'>
                                    <div className="title flex justify-center">
                                          <h2 className='text-5xl my-8 font-extrabold' >Reports</h2>

                                          <div className='absolute right-12 top-12 flex gap-2 items-center' >
                                                <MdLocalPrintshop className='text-2xl' />
                                                <button className='bg-[#53AC5C] py-1 px-3 rounded-xl text-white'>Print</button>
                                          </div>

                                    </div>
                              </div>
                              {/* EARNINGS */}
                              <div className='mx-10 flex items-center gap-6 justify-around font-light'>

                                    {/* left */}
                                    <div className='bg-[#C1B8B8] w-[45dvw] rounded-2xl '>

                                          <div className='bg-[#A89595] mx-4 mt-4 rounded-xl w-fit px-6 py-1'>
                                                <span>Earnings</span>
                                          </div>


                                          <div className='flex text-center justify-center gap-20 mb-10 '>

                                                <div>
                                                      <p className='text-4xl my-2'>PHP <b className='font-extrabold'>20.00</b></p>
                                                      <p>Today</p>
                                                </div>
                                                <div>
                                                      <p className='text-4xl my-2'>PHP <b className='font-extrabold'>2000.00</b></p>
                                                      <p>Yesterday</p>
                                                </div>

                                          </div>
                                    </div>

                                    {/* right */}
                                    <div className='bg-[#9CD2A5] w-[25dvw] rounded-2xl '>
                                          <div className='bg-[#87BB83] mx-4 mt-4 rounded-xl w-fit px-6 py-1'>
                                                <span>Total Earnings</span>
                                          </div>

                                          <div className=' flex items-start text-center mb-10'>
                                                <p className='text-4xl my-5 w-full'>PHP <b className='font-extrabold'>20.00</b></p>
                                          </div>
                                    </div>

                              </div>




                        </div>
                  </div >
                  <Navbar />
            </>
      )
}

export default Reports