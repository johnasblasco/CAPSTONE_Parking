import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Client = () => {
      const navigate = useNavigate();
      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');
      const [isLogin, setIsLogin] = useState(false);
      const [error, setError] = useState(null);

      const handleLogin = () => {
            axios.get("http://localhost:8000/client")
                  .then(response => {
                        response.data.forEach(user => {
                              if (user.username === username && user.password === password) {
                                    setIsLogin(true);
                                    console.log("ok na")
                                    navigate('/client/home', { replace: true });
                              }
                        })

                        if (!isLogin) setError("credentials not match")
                  })
                  .catch(err => {
                        console.log(err)
                  })
      }

      return (
            <div className="bg-cover h-screen opacity-80" style={{ backgroundImage: 'url(bg.jpg)' }}>
                  <div className="flex items-center justify-center h-screen">
                        <div className="flex flex-col justify-center items-center gap-2 max-w-sm my-8 px-14 pt-14 pb-8 bg-gray-100 rounded-xl shadow-md overflow-x-hidden">
                              <img src="car.png" className="h-[200px] w-[200px] object-cover" />
                              <p className="text-center">Log in</p>

                              <div className="flex flex-col">
                                    <label htmlFor="username">Username:</label>
                                    <input
                                          type="text"
                                          id="username"
                                          className="border-2 bg-gray-200 px-4 py-2 w-full rounded-xl"
                                          value={username}
                                          onChange={e => setUsername(e.target.value)}
                                    />

                                    <label htmlFor="password">Password:</label>
                                    <input
                                          type="password"
                                          id="password"
                                          className="border-2 bg-gray-200 px-4 py-2 w-full rounded-xl"
                                          value={password}
                                          onChange={e => setPassword(e.target.value)}
                                    />
                              </div>

                              {error && <p className="text-red-500">{error}</p>}

                              <button
                                    className="bg-sky-950 py-3 px-12 mt-4  text-white rounded-xl hover:bg-sky-700"
                                    onClick={handleLogin}
                              >
                                    LOGIN
                              </button>

                        </div>
                  </div>
            </div>
      );
};

export default Client;