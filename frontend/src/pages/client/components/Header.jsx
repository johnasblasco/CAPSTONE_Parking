import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
      const [user, setUser] = useState({});
      const navigate = useNavigate();

      const loginHistory = async () => {
            try {
                  // Fetch the login history
                  const response = await axios.get("http://localhost:8000/admin/loginhistory");
                  const foundUser = response.data.find(user => user.timeOut === null);

                  if (foundUser) {
                        setUser(foundUser); // Set the user if found
                        let currentTime = new Date();

                        // Update the user with the timeOut
                        await axios.put(`http://localhost:8000/admin/loginhistory/${foundUser._id}`, {
                              ...foundUser,
                              timeOut: currentTime.toISOString()
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
                  title: "Are you sure? You want to logout?",
                  text: "You won't be able to revert this!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonText: "Yes, Logout!",
                  cancelButtonText: "No, cancel!",
                  reverseButtons: true
            }).then(async (result) => {
                  if (result.isConfirmed) {
                        await loginHistory(); // Call loginHistory before navigating
                        logoutAlert.fire({
                              title: "Logged Out!",
                              text: "You have successfully logged out.",
                              icon: "success"
                        });
                        navigate("/");
                  } else if (result.dismiss === Swal.DismissReason.cancel) {
                        logoutAlert.fire({
                              title: "Cancelled",
                              text: "You have cancelled the logout.",
                              icon: "error"
                        });
                  }
            });
      };

      return (
            <header className='bg-white py-4 px-12 mb-4 flex items-center justify-between fixed top-0 rounded-b-3xl w-full z-10'>
                  <img src="/logo2.png" className='w-[200px] mx-4' alt="Logo" />
                  <img onClick={logout} src="/logout.png" className='w-10 hover:cursor-pointer' alt="Logout" />
            </header>
      );
};

export default Header;
