import axios from 'axios'
import React, { useEffect, useState } from 'react'
import tite, { Toaster } from 'react-hot-toast';
import { myToast } from '../components/Toast';

const CreateAccount = () => {
      const [name, setName] = useState("")
      const [username, setUsername] = useState("")
      const [password, setPassword] = useState("")

      const handleForm = async () => {
            try {
                  const newUser = {
                        name,
                        username,
                        password,
                        status: true,
                        login: false,
                  }
                  await axios.post("http://localhost:8000/user", newUser)
                  myToast();

                  // clear info
                  setName("")
                  setUsername("")
                  setPassword("")


            } catch (error) {
                  tite.error("Please fill all the information")
            }

      }

      console.log(name)
      return (

            <div className='absolute left-[200px] top-[100px] lg:overflow-x-hidden max-sm:hidden'>
                  <div className="mx-4 bg-[#D9D9D9] min-h-screen rounded-3xl" style={{ width: 'calc(100vw - 250px)' }}>
                        <div className="title flex justify-center">
                              <h2 className='text-5xl my-8 font-extrabold' >Create Account</h2>
                        </div>

                        {/* CONTENT */}

                        <div className=" bg-[#D6D0C4] mx-8 rounded-3xl min-h-screen flex flex-col ">

                              {/* spaces, form */}
                              <div className='mt-16 mx-32 pb-10 flex flex-col gap-6 overflow-y-auto'>
                                    <div className='flex items-center gap-16'>
                                          <label htmlFor="name">Full Name</label>
                                          <input id='name' className='py-4 px-8 rounded-xl flex-1 bg-[#C4B9A9] placeholder-gray-800' value={name} placeholder='Please input your name here' type="text" onChange={e => setName(e.target.value)} />
                                    </div>

                                    <div className='flex items-center gap-6'>
                                          <label htmlFor="username">New Username</label>
                                          <input id="username" className='py-4 px-8 rounded-xl flex-1 bg-[#C4B9A9] placeholder-gray-800' value={username} placeholder='Please input your desired username here' type="text" onChange={e => setUsername(e.target.value)} />
                                    </div>

                                    <div className='flex items-center gap-8'>
                                          <label htmlFor="password">New Password</label>
                                          <input id="password" className='py-4 px-8 rounded-xl flex-1 bg-[#C4B9A9] placeholder-gray-800' value={password} placeholder='Please input your desired password here' type="password" onChange={e => setPassword(e.target.value)} />
                                    </div>

                                    <div className='flex justify-center'>
                                          <button onClick={handleForm} className='hover:bg-[#56945c] bg-[#75B37B] text-white p-4 rounded-3xl text-lg font-bold'>Create Account</button>
                                    </div>
                              </div>



                        </div>

                  </div>
                  {/* TOASTER */}
                  <Toaster />
            </div >

      )
}

export default CreateAccount