import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
      }

      return (
            <div className="bg-cover bg-no-repeat h-screen object-center " style={{ backgroundImage: 'url(bg.jpeg)', objectPosition: 'bottom 10px right 20px' }}>

                  <div className="flex items-center justify-center h-screen">

                        {/* background na mejo itim para pang takip sa masakit na damdamin*/}
                        <div className="absolute top-0 bottom-0 right-0 left-0 bg-gray opacity-20 "></div>


                        <div className="flex flex-col justify-between items-center gap-2 max-w-sm p-12 pb-8 bg-gray-200 rounded-xl shadow-md overflow-hidden z-10"
                              style={{ height: '85vh' }}>
                              <div>
                                    <img src="logo.png" className="pt-4 object-cover opacity-1" />
                                    <p className="text-center">Log in</p>
                              </div>

                              <div className="flex flex-col ">
                                    <label htmlFor="username">Username:</label>
                                    <input
                                          type="text"
                                          id="username"
                                          className="border-2 bg-gray-300 px-4 py-2 w-full rounded-xl"
                                          value={username}
                                          onChange={e => setUsername(e.target.value)}
                                    />

                                    <label htmlFor="password">Password:</label>
                                    <input
                                          type="password"
                                          id="password"
                                          className="border-2 bg-gray-300 px-4 py-2 w-full rounded-xl"
                                          value={password}
                                          onChange={e => setPassword(e.target.value)}
                                    />

                                    <button
                                          className="self-center bg-blue-900 py-3 px-12 mt-4 w-fit  text-white rounded-xl hover:bg-blue-950"
                                          onClick={handleLogin}
                                    >
                                          LOGIN
                                    </button>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default Admin;