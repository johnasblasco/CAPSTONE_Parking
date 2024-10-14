import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Admin = () => {
      const navigate = useNavigate();
      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');
      const [isLogin, setIsLogin] = useState(false);
      const [error, setError] = useState(null);

      const handleLogin = () => {
            axios.get("http://localhost:8000/admin")
                  .then(response => {
                        response.data.forEach(admin => {
                              if (admin.username === username && admin.password === password) {
                                    setIsLogin(true);
                                    console.log("ok na")
                                    navigate('/admin/home/reports');
                                    Swal.fire({
                                          position: "center",
                                          icon: "success",
                                          title: "Sucessfully logged in!",
                                          showConfirmButton: false,
                                          timer: 1500
                                    });
                              }
                        })

                  })
                  .catch(err => {
                        console.log(err)
                  })

            Swal.fire({
                  title: "LOGIN FAILED!",
                  text: "Please check your username and password.",
                  icon: "error"
            });
      }

      return (
            <div className="h-screen bg-[url('/BG.png')] bg-cover bg-bottom bg-no-repeat">

                  <div className="flex items-center justify-center h-screen">


                        <div className="flex flex-col items-center pr-24 gap-2 pt-28  pb-8 bg-[url('/polygon1.png')] w-[650px] h-[650px] h-max-700:h-[550px] h-max-700:w-[550px]  bg-contain bg-no-repeat rounded-xl "
                        >
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