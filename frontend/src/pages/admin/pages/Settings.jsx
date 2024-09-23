import React from 'react'

const Settings = () => {
      return (
            <div className='mx-[10%] h-max-700:mt-[35vh] mt-[25vh] w-[80vw] text-deepBlue'>



                  {/* CONTENT */}

                  <div className="font-bold relative pt-12 shadow-2xl border-4 border-bloe bg-white mx-8  rounded-3xl min-h-screen h-auto ">

                        <div className='flex min-h-screen justify-between p-20'>
                              {/* left */}
                              <div className='border-4 border-bloe flex flex-col items-center'>
                                    <p className='text-6xl text-bloe '>DETAILS</p>
                                    <img src="/capture.png" alt="" />
                                    <input type="text" className='text-center py-4 border-4 border-bloe' placeholder='Company Name' />
                                    <textarea className='overflow-y-auto text-pretty text-center border-4 m-4 border-bloe' rows="9" cols="40" placeholder='Company Rules'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae, voluptatum ducimus, assumenda illo minima libero minus nisi exercitationem consequuntur nulla quos. Nisi repellat quod similique expedita, ex sed consequuntur magni.</textarea>
                              </div>

                              {/* right */}
                              <div className='border-4 border-bloe text-center'>
                                    <p className='text-2xl text-bloe '>Total Parking Spaces</p>
                                    <div className='flex gap-4 justify-center'>
                                          <input type="text" className='border-4 w-20 border-bloe' placeholder='2 wheels' />
                                          <input type="text" className='border-4 w-20 border-bloe' placeholder='3/4 wheels' />
                                    </div>
                                    <input type="text" />
                                    <input type="text" />
                                    <input type="text" />
                              </div>
                        </div>


                  </div>

            </div>

      )
}

export default Settings