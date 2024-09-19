import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
                                    navigate('/admin/home/login-history', { replace: true });
                              }
                        })

                  })
                  .catch(err => {
                        console.log(err)
                  })

            toast.error("Admin Not Found!");
      }

      return (
            <div className="h-screen bg-[#F3D2C1] ">

                  <div className="flex items-center justify-center h-screen">


                        <div className="flex flex-col items-center gap-2 pt-28  pb-8 bg-[url('polygon1.png')] w-[650px] h-[650px] bg-contain bg-no-repeat rounded-xl "
                        >
                              <div className="text-center text-[#001858]">
                                    <h3 className="text-6xl font-extrabold">SIGN IN</h3>
                                    <p className="text-2xl">TO PARKAID</p>
                              </div>

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
                                          className="self-center bg-[#8ED8A9] py-3 px-12 mt-4 w-fit text-2xl border-4 border-[#001858]  text-[#001858] rounded-3xl  hover:bg-[#72c791]"
                                          onClick={handleLogin}
                                    >
                                          CONTINUE
                                    </button>
                              </div>
                        </div>
                        <ToastContainer
                              position="bottom-right"
                              autoClose={2000}
                              hideProgressBar={false}
                              newestOnTop={false}
                              closeOnClick
                              rtl={false}
                              pauseOnFocusLoss
                              draggable
                              pauseOnHover
                              theme="light"
                              transition:Bounce
                        />
                  </div>
            </div>
      );
};

export default Admin;