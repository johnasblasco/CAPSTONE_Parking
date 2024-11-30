import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
      const [currentUser, setCurrentUser] = useState({});
      const [user, setUser] = useState({});
      const navigate = useNavigate();
      const { state } = useLocation(); // Access the state passed during navigation

      useEffect(() => {
            const fetchData = async () => {
                  try {
                        // Fetch the logged-in user's data using the passed userId
                        if (state?.userId) {
                              const response = await axios.get(`https://capstone-parking.onrender.com/user/${state.userId}`);
                              setCurrentUser(response.data);
                              console.log("Current user set:", response.data);
                        } else {
                              console.warn("No user ID found in state.");
                        }
                  } catch (error) {
                        console.error("Error fetching user data:", error);
                  }
            };
            fetchData();
      }, [state]);

      const logoutAlert = Swal.mixin({
            customClass: {
                  confirmButton: "btn btn-success",
                  cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
      });

      const logout = async () => {
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
                        // Update current user's login status to false
                        await axios.put(`https://capstone-parking.onrender.com/user/${currentUser._id}`, { login: false });


                        console.log("Logout successful." + currentUser._id);
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
                        <p className='text-slate-800 text-2xl font-bold'>Howdy, {currentUser.name || "Guest"}</p>
                        <img onClick={logout} src="/logout.png" className='w-10 hover:cursor-pointer' alt="Logout" />
                  </div>
            </header>
      );
};

export default Header;
