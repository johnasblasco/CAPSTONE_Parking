import React from 'react'
import { Link } from 'react-router-dom'

const Form = () => {
      return (
            <div className='grid grid-cols-2 grid-rows-1'>
                  <div>
                        <h2 className='text-8xl tracking-wide text-yeelow font-extrabold'>PARK-AID</h2>
                        <h2 className='text-8xl tracking-widest text-offWhite font-extrabold'>SYSTEM</h2>

                        <p className='mt-10 w-[60%] text-wrap text-2xl text-white'> A Parking system that will help you to park your vehicle in a safe and secure way, right at your fingertips</p>
                        <p />


                        <div className='mt-10 flex gap-4 text-center items-center font-bold'>
                              <Link to={'/get-started'} text-3xl className="hover:scale-90 py-3 px-8 rounded-3xl border-white border-4 bg-yeelow text-darkBloe hover:bg-darkBloe hover:text-yeelow">
                                    GET STARTED
                              </Link>


                        </div>

                        <div className='mt-10 flex justify-start items-center'>
                              <img src="/cict.png" alt="" />
                              <img src="/bulsu.png" alt="" />
                        </div>
                  </div>


                  <img src="landing_Car.png" className=' z-[-1] mt-[-140px]' />


            </div >
      )
}

export default Form