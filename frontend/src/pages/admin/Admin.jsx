import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { FaAngleLeft } from "react-icons/fa6";
import Swal from 'sweetalert2';

const Admin = () => {
      const navigate = useNavigate();
      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');
      const [isLogin, setIsLogin] = useState(false);
      const [error, setError] = useState(null);

      const handleLogin = () => {
            axios.get("https://capstone-parking.onrender.com/admin")
                  .then(response => {
                        response.data.forEach(admin => {
                              if (admin.username === username && admin.password === password) {
                                    setIsLogin(true);
                                    console.log("ok na")

                                    navigate('/admin/home/dashboard');
                                    setTimeout(() => {
                                          Swal.fire({
                                                position: "center",
                                                icon: "success",
                                                title: "Sucessfully logged in!",
                                                showConfirmButton: false,
                                                timer: 1500
                                          });
                                    }, 1500);
                              }
                              else {
                                    Swal.fire({
                                          title: "LOGIN FAILED!",
                                          text: "Please check your username and password.",
                                          icon: "error"
                                    });
                              }
                        })

                  })
                  .catch(err => {
                        console.log(err)
                  })


      }


      return (
            <div className="h-screen bg-[url('/BG.png')] bg-cover bg-bottom bg-no-repeat">

                  <div className="flex items-center justify-center h-screen">

                        {/* back button */}
                        <div data-aos="fade-up" data-aos-duration="500" className='absolute w-40 h-32 left-12 cursor-pointer top-[-94px]  hover:scale-y-90 '>
                              <img onClick={() => navigate("/")} src="/BACK.png" alt="" className='absolute left-12 cursor-pointer top-[-30px] hover:scale-y-90 ' />
                        </div>

                        <div className="relative flex flex-col items-center pr-24 gap-2 pt-28  pb-8 bg-[url('/polygon1.png')] w-[650px] h-[650px] laptop:h-[550px] laptop:w-[550px] h-max-700:h-[550px] h-max-700:w-[550px]  bg-contain bg-no-repeat rounded-xl "
                        >
                              <div onClick={() => navigate("/login")} className='hover:scale-90 absolute top-8 left-8 cursor-pointer flex items-center'>
                                    <FaAngleLeft className='text-4xl' />
                                    <p className='text-darkBloe font-bold  text-2xl'>Back </p>
                              </div>

                              <p className='text-6xl text-darkBloe font-extrabold'>SIGN IN</p>
                              <p className='text-xl text-darkBloe font-bold'>TO PARKAID</p>

                              <div className="flex flex-col gap-4 pt-12 font-bold">
                                    <input
                                          type="text"
                                          id="username"
                                          className="border-4 bg-[#FFEFBA] border-[#001858] px-5 py-3 w-full rounded-3xl"
                                          value={username}
                                          placeholder="Username"
                                          onChange={e => setUsername(e.target.value)}
                                    />

                                    <input
                                          type="password"
                                          id="password"
                                          className="border-4 bg-[#FFEFBA] border-[#001858] px-5 py-3 w-full rounded-3xl"
                                          value={password}
                                          placeholder="Password"
                                          onChange={e => setPassword(e.target.value)}
                                    />


                                    <button
                                          className="self-center bg-bloe hover:scale-90 py-3 px-12 mt-4 w-fit text-2xl border-4 border-gray-300 text-offWhite  rounded-3xl"
                                          onClick={handleLogin}
                                    >
                                          ➡️ Go to Admin
                                    </button>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default Admin;