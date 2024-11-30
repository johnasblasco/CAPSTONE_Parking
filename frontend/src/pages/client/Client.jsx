import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaAngleLeft } from "react-icons/fa6";

import Swal from 'sweetalert2';
const Client = () => {

      const navigate = useNavigate();
      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');
      const [isLogin, setIsLogin] = useState(false);
      const [error, setError] = useState(null);

      const handleLogin = async () => {
            try {
                  const response = await axios.get("https://capstone-parking.onrender.com/user");

                  // Find user with matching credentials and status
                  const user = response.data.find((user) => user.username === username && user.password === password && user.status === true);
                  if (!user) {
                        Swal.fire({
                              title: "LOGIN FAILED!",
                              text: "Please check your username and password.",
                              icon: "error",
                        });
                        return;
                  }

                  setIsLogin(true);
                  console.log("Login successful");
                  navigate('/user/home/dashboard', { replace: true, state: { userId: user._id } });

                  // Log the timeIn data
                  const now = new Date();
                  const logData = {
                        name: user.name,
                        timeIn: now,
                        timeOut: null,
                  };
                  await axios.post("https://capstone-parking.onrender.com/admin/loginHistory", logData);

                  // Update the login status to true
                  await axios.put(`https://capstone-parking.onrender.com/user/${user._id}`, { login: true });
                  console.log('Data updated successfully:');

            } catch (err) {
                  console.error('Error:', err);
                  setError("Login failed");
            }
      };


      return (
            <div className="h-screen bg-[url('/BG.png')] bg-cover bg-bottom bg-no-repeat">


                  <div className="flex items-center justify-center h-screen">

                        {/* back button */}
                        <div data-aos="fade-up" data-aos-duration="500" className='absolute  w-40 h-32 left-12 cursor-pointer top-[-94px] hover:scale-y-90 '>
                              <img onClick={() => navigate("/")} src="/BACK.png" alt="" className='absolute  left-12 cursor-pointer top-[-30px] hover:scale-y-90 ' />
                        </div>

                        <div className=" relative flex flex-col items-center pr-24 gap-2 pt-28  pb-8 bg-[url('/polygon1.png')] w-[650px] h-[650px] laptop:h-[550px] laptop:w-[550px] h-max-700:h-[550px] h-max-700:w-[550px] bg-contain bg-no-repeat rounded-xl "
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
                                          className="self-center bg-yeelow hover:scale-90 py-3 px-12 mt-4 w-fit text-2xl border-4 border-bloe text-bloe rounded-3xl"
                                          onClick={handleLogin}
                                    >
                                          CONTINUE
                                    </button>
                              </div>
                        </div>
                  </div>


            </div>
      );
};

export default Client;