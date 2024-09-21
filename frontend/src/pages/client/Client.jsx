import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const Client = () => {

      const navigate = useNavigate();
      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');
      const [isLogin, setIsLogin] = useState(false);
      const [error, setError] = useState(null);

      //solution if may hindi nakapag log out
      // axios.get("http://localhost:8000/user")
      //       .then((user) => {
      //             const isLogin = user.data.find((user) => user.login)
      //             if (isLogin) navigate('/user/dashboard', { replace: true });

      //       })
      //       .catch(err => console.log(err))
      // console.log("wala")


      const handleLogin = async () => {
            try {
                  const response = await axios.get("http://localhost:8000/user");

                  // main logic here
                  const user = response.data.find((user) => user.username === username && user.password === password && user.status === true);
                  if (!user) {

                        Swal.fire({
                              title: "LOGIN FAILED!",
                              text: "Please check your username and password.",
                              icon: "error"
                        });
                        return
                  }
                  setIsLogin(true);
                  console.log("Login successful");
                  Swal.fire({
                        title: "LOGGED IN SUCCESSFULLY!",
                        text: "Welcome, parking attendant!",
                        icon: "success"
                  });
                  navigate('/user/dashboard', { replace: true });

                  // Make a log of the data
                  const now = new Date();
                  const logData = {
                        name: user.name,
                        timeIn: now,
                        timeOut: null
                  };
                  await axios.post("http://localhost:8000/admin/loginHistory", logData);

                  // Proceed to update the data on the server
                  await axios.put(`http://localhost:8000/user/${user._id}`, { ...user, login: true });
                  console.log('Data updated successfully:');



            } catch (err) {

                  console.error('Error:', err);
                  setError("Login failed");
            }
      };

      return (
            <div className="h-screen bg-[url('BG.png')] bg-cover bg-bottom bg-no-repeat">

                  <div className="flex items-center justify-center h-screen">


                        <div className="flex flex-col items-center pr-24 gap-2 pt-28  pb-8 bg-[url('polygon1.png')] w-[650px] h-[650px] h-max-700:h-[550px] h-max-700:w-[550px] bg-contain bg-no-repeat rounded-xl "
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
                                          className="self-center bg-[#8ED8A9] py-3 px-12 mt-4 w-fit text-2xl border-4 border-[#001858]  text-[#001858] rounded-3xl  hover:bg-[#72c791]"
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