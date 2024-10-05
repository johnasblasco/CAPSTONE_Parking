import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Toast from '../components/Toast';

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
                  setShowToast(true)

                  // clear info
                  setName("")
                  setUsername("")
                  setPassword("")


            } catch (error) {
                  console.log("Please fill all the information")
            }

      }

      const [showToast, setShowToast] = useState(false)

      return (
            <>

                  <div className='font-bold mx-[10%] h-max-700:mt-[35vh] mt-[25vh] w-[80vw] text-deepBlue'>


                        {/* CONTENT */}
                        <div className=" relative bg-white border-4 border-bloe w-fit p-12 rounded-3xl mx-auto gap-8 flex items-center flex-col ">
                              <p className='border-4 font-bold border-deepBlue absolute top-4 left-[-35px] bg-yeelow py-1 px-12 text-lg rounded-3xl '>Create Account</p>


                              <h2 className='mt-6 text-2xl'>Create Account for Employees</h2>
                              <div className='flex mt-4 items-center gap-16 w-[40vw]'>
                                    <label htmlFor="name">Full Name</label>
                                    <input id='name' className='py-4 px-8 rounded-3xl flex-1 border-4 border-bloe hover:bg-bloe/10 placeholder-black/50' value={name} placeholder='Please input your name here' type="text" onChange={e => setName(e.target.value)} />
                              </div>

                              <div className='flex items-center gap-6 w-[40vw]'>
                                    <label htmlFor="username">New Username</label>
                                    <input id="username" className='py-4 px-8 rounded-3xl flex-1 border-4 border-bloe hover:bg-bloe/10 placeholder-black/50 ' value={username} placeholder='Please input your desired username here' type="text" onChange={e => setUsername(e.target.value)} />
                              </div>

                              <div className='flex items-center gap-8 w-[40vw]'>
                                    <label htmlFor="password">New Password</label>
                                    <input id="password" className='py-4 px-8 rounded-3xl flex-1 border-4 border-bloe hover:bg-bloe/10 placeholder-black/50 ' value={password} placeholder='Please input your desired password here' type="password" onChange={e => setPassword(e.target.value)} />
                              </div>

                              <div className='flex justify-center'>
                                    <button onClick={handleForm} className='bg-blue-500   hover:scale-90 text-offWhite py-4 px-8 rounded-3xl text-lg font-bold'>Create Account</button>
                              </div>
                        </div>



                  </div>



                  {/* CONDITIONAL RENDERING */}
                  {
                        showToast && <Toast setShowToast={setShowToast} />
                  }

                  {/* NAV */}
            </>
      )
}

export default CreateAccount