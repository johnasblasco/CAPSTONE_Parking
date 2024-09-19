import React from 'react'
import { Link } from 'react-router-dom'

const Form = () => {
      return (
            <div className='w-full flex-col '>
                  <div>
                        <h2 className='text-8xl tracking-wide text-[#DFBD4E] font-extrabold'>PARK-AID</h2>
                        <h2 className='text-8xl tracking-widest text-[#001858] font-extrabold'>SYSTEM</h2>

                        <p className='mt-10 w-[30%] text-wrap text-lg text-[#001858]'> Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />
                              Rerum, eaque. Ratione quidem, ipsam reprehenderit ipsum delectus est odio! <br />
                              Rerum, eaque. Ratione quidem, ipsam reprehenderit ipsum delectus <br />
                        </p>


                        <div className='mt-10 flex gap-4 text-center items-center font-bold'>
                              <Link to={'/get-started'} className="p-3 rounded-3xl border-[#001858] border-4 bg-[#f582ae] text-[#001858] hover:bg-[#eb518c] hover:text-[#fffeee]">
                                    GET STARTED
                              </Link>

                              <Link className="p-3 rounded-3xl border-[#001858] border-4 text-[#001858] hover:bg-[#001858] hover:text-white">
                                    PLAY DEMO
                              </Link>
                        </div>

                        <div className='mt-10 flex justify-start items-center h-full gap-12'>
                              <img src="/cict.png" alt="" />
                              <img src="/parkaid.png" />
                              <img src="/bulsu.png" alt="" />
                        </div>
                  </div>

                  <div>

                  </div>

            </div>
      )
}

export default Form