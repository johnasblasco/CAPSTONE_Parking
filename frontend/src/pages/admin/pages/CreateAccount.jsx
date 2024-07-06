import React from 'react'

const CreateAccount = () => {
      return (
            <div className='absolute left-[200px] top-[100px] lg:overflow-x-hidden max-sm:hidden'>
                  <div className="mx-4 bg-[#D9D9D9] min-h-screen rounded-3xl" style={{ width: 'calc(100vw - 250px)' }}>
                        <div className="title flex justify-center">
                              <h2 className='text-5xl my-8 font-extrabold' >Create Account</h2>
                        </div>

                        {/* CONTENT */}

                        <div className="  bg-[#D6D0C4] mx-8 rounded-3xl min-h-screen flex flex-col ">

                              {/* spaces, form */}
                              <div className='mt-16 ml-32 h-[40vh] flex flex-col gap-6'>

                                    <div>
                                          <label className=' ml-4 mr-20' htmlFor="">Full Name</label>
                                          <input className='py-4 px-8 rounded-xl w-[70%] bg-[#C4B9A9] placeholder-gray-800' placeholder=' Please input your name here' type="text" />
                                    </div>

                                    <div>
                                          <label className=' ml-4 mr-10' htmlFor="">New Username</label>
                                          <input className='py-4 px-8 rounded-xl w-[70%] bg-[#C4B9A9] placeholder-gray-800' placeholder=' Please input your desired username here' type="text" />
                                    </div>

                                    <div>
                                          <label className=' ml-4 mr-11' htmlFor="">New Password</label>
                                          <input className='py-4 px-8 rounded-xl w-[70%] bg-[#C4B9A9] placeholder-gray-800' placeholder=' Please input your desired password here' type="text" />
                                    </div>

                                    <div className='flex justify-center w-[90%]'>
                                          <button className=' hover:bg-[#56945c] bg-[#75B37B] text-white p-4 w-fit mt-6 rounded-3xl text-lg font-bold'>Create Account</button>
                                    </div>
                              </div>

                              {/* button */}


                        </div>

                  </div>
            </div >
      )
}

export default CreateAccount