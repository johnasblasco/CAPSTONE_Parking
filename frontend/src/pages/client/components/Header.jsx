import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
      const [currentUser, setCurrentUser] = useState({});
      const [user, setUser] = useState({});
      const navigate = useNavigate();

      useEffect(() => {
            const fetchData = async () => {
                  try {
                        const response = await axios.get("http://localhost:8000/user");
                        const foundUser = response.data.find(user => user.login === true);
                        if (foundUser) {
                              setCurrentUser(foundUser);
                        }
                  } catch (error) {
                        console.error("Error fetching user data:", error);
                  }
            }
            fetchData();
      }, []);

      const loginHistory = async () => {
            try {
                  const response = await axios.get("http://localhost:8000/admin/loginhistory");
                  const foundUser = response.data.find(user => user.timeOut === null);

                  if (foundUser) {
                        setUser(foundUser);
                        const currentTime = new Date();

                        // Update the login history record with timeOut
                        await axios.put(`http://localhost:8000/admin/loginhistory/${foundUser._id}`, {
                              ...foundUser,
                              timeOut: currentTime.toISOString()
                        });

                        // Update current user's login status to false
                        await axios.put(`http://localhost:8000/user/${currentUser._id}`, {
                              ...currentUser,
                              login: false
                        });

                        console.log("Logout successful.");
                  }
            } catch (error) {
                  console.error("Error fetching or updating login history:", error);
            }
      };

      const logoutAlert = Swal.mixin({
            customClass: {
                  confirmButton: "btn btn-success",
                  cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
      });

      const logout = () => {
            logoutAlert.fire({
                  width: 300,
                  title: "Logout?",
                  position: "top-end",
                  showCancelButton: true,
                  confirmButtonText: "Yes",
                  cancelButtonText: "No!",
                  reverseButtons: true
            }).then(async (result) => {
                  if (result.isConfirmed) {
                        await loginHistory();
                        logoutAlert.fire({
                              icon: "success",
                              title: "Successfully logged out!",
                              showConfirmButton: false,
                              timer: 1000
                        });
                        navigate("/");
                  }
            });
      };

      return (
            <header className='bg-white py-4 px-12 mb-4 flex items-center justify-between fixed top-0 rounded-b-3xl w-full z-10'>
                  <img src="/logo2.png" className='w-[200px] mx-4' alt="Logo" />

                  <div className='flex items-center gap-4'>
                        <p className='text-slate-800 text-2xl font-bold'>Howdy, {currentUser.name}</p>
                        <img onClick={logout} src="/logout.png" className='w-10 hover:cursor-pointer' alt="Logout" />
                  </div>
            </header>
      );
};

export default Header;
