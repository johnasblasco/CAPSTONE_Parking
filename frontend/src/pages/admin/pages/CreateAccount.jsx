import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const CreateAccount = () => {
      const [name, setName] = useState("")
      const [username, setUsername] = useState("")
      const [password, setPassword] = useState("")

      const navigate = useNavigate()

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


                  Swal.fire({
                        position: "center",
                        icon: "success",
                        title: name + " has been created",
                        showConfirmButton: false,
                        timer: 1500
                  });
                  navigate("/admin/home/manage-account")


            } catch (error) {
                  console.log("Please fill all the information")
            }

      }

      const [showToast, setShowToast] = useState(false)

      return (
            <>

                  <div className='font-bold mx-[10%] h-max-700:mt-[35vh] mt-[25vh] w-[80vw] text-deepBlue'>


                        {/* CONTENT */}
                        <div className=" relative bg-white border-4 border-bloe  p-8 rounded-2xl mx-auto gap-8 flex items-center flex-col ">
                              <p className='border-4 font-bold border-deepBlue absolute top-4 left-[-35px] bg-yeelow py-1 px-12 text-lg rounded-3xl '>Create Account</p>


                              <h2 className=' text-3xl'> <span className='text-pink'>Create User Account </span> (Employees Parking Attendant)</h2>
                              <img src="/user.png" className='w-72 h-60' alt="" />
                              <div className='flex mt-4 items-center gap-16 w-[50vw]'>
                                    <label htmlFor="name">Full Name</label>
                                    <input id='name' className='py-4 px-8 rounded-3xl flex-1 border-4 border-bloe focus:bg-bloe/10 hover:bg-bloe/10 placeholder-black/50 outline-indigo-900' value={name} placeholder='Please input your name here' type="text" onChange={e => setName(e.target.value)} />
                              </div>

                              <div className='flex items-center gap-6 w-[50vw]'>
                                    <label htmlFor="username">New Username</label>
                                    <input id="username" className='py-4 px-8 rounded-3xl flex-1 border-4 border-bloe focus:bg-bloe/10 hover:bg-bloe/10 placeholder-black/50 outline-indigo-900' value={username} placeholder='Please input your desired username here' type="text" onChange={e => setUsername(e.target.value)} />
                              </div>

                              <div className='flex items-center gap-8 w-[50vw]'>
                                    <label htmlFor="password">New Password</label>
                                    <input id="password" className='py-4 px-8 rounded-3xl flex-1 border-4 border-bloe focus:bg-bloe/10 hover:bg-bloe/10 placeholder-black/50 outline-indigo-900' value={password} placeholder='Please input your desired password here' type="password" onChange={e => setPassword(e.target.value)} />
                              </div>

                              <div className='flex justify-center'>
                                    <button onClick={handleForm} className='bg-deepBlue  hover:scale-90 text-offWhite py-4 px-8 rounded-3xl text-lg font-bold'>Create Account</button>
                              </div>
                        </div>



                  </div>





                  {/* NAV */}
            </>
      )
}

export default CreateAccount