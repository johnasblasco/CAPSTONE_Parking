import React from 'react'

const Settings = () => {
      return (
            <div className='mx-[10%] h-max-700:mt-[35vh] mt-[25vh] w-[80vw] text-deepBlue'>



                  {/* Background */}

                  <div className="font-bold relative pt-12 shadow-2xl border-4 border-bloe bg-white mx-8  rounded-3xl min-h-screen h-auto ">
                        {/* CONTENT */}
                        <div className='flex min-h-screen justify-center p-20'>
                              {/* left */}
                              <div className='px-16 flex flex-col items-center'>
                                    <p className='text-6xl text-bloe '>DETAILS</p>
                                    <img src="/capture.png" alt="" />
                                    <input type="text" className='text-center rounded-3xl w-[90%] py-4 border-4 border-bloe' placeholder='Company Name' />
                                    <textarea className='overflow-y-auto rounded-3xl p-4 text-pretty text-center border-4 m-4 border-bloe' rows="9" cols="40" placeholder='Company Rules'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae, voluptatum ducimus, assumenda illo minima libero minus nisi exercitationem consequuntur nulla quos. Nisi repellat quod similique expedita, ex sed consequuntur magni.</textarea>
                              </div>

                              {/* right */}
                              <div className=' mx-auto px-40  text-center'>
                                    <p className='text-3xl text-bloe my-4 '>Total Parking Spaces</p>

                                    <div className='flex gap-4 justify-center'>
                                          <input type="number" className='border-4 p-4 w-40 rounded-3xl text-center border-bloe' placeholder='2 wheels' />
                                          <input type="number" className='border-4 p-4 w-40 rounded-3xl text-center border-bloe' placeholder='3/4 wheels' />
                                    </div>

                                    <p className='mt-8 text-3xl'>Price per ticket</p>
                                    <input type="number" className='rounded-3xl  m-2 w-full text-4xl text-center py-4 border-4 border-bloe' placeholder='PHP 30.00' />

                                    <p className='mt-8 text-3xl'>(Optional) Hours Limit </p>
                                    <input type="number" className='rounded-3xl  m-2 w-full text-4xl text-center py-4 border-4 border-bloe' placeholder='3 HOURS' />

                                    <p className='mt-8 text-3xl'>(Optional) Overtime Ticket</p>
                                    <input type="number" className='rounded-3xl  m-2 w-full text-4xl text-center py-4 border-4 border-bloe' placeholder='PHP 20.00' />

                                    <button className='mt-12 bg-greenWich border-4 border-bloe hover:bg-[#75d397] text-bloe py-4 px-8 rounded-3xl text-lg font-bold'>Save Changes</button>
                              </div>
                        </div>


                  </div>

            </div>

      )
}

export default Settings