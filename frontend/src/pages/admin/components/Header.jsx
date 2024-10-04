import React from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
const Header = () => {

      const navigate = useNavigate();
      const logoutAlert = Swal.mixin({
            customClass: {
                  confirmButton: "btn btn-success",
                  cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
      });

      const logout = () => {
            logoutAlert.fire({
                  title: "Are you sure you want to logout?",
                  position: "center",
                  icon: "question",
                  showCancelButton: true,
                  confirmButtonText: "Yes, Logout!",
                  cancelButtonText: "No, cancel!",
                  reverseButtons: true
            }).then(async (result) => {
                  if (result.isConfirmed) {
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
                  <img src="/logo2.png" className='w-[200px] mx-4' />
                  <img onClick={logout} src="/logout.png" className='w-10 hover:cursor-pointer' />
            </header>
      )
}

export default Header