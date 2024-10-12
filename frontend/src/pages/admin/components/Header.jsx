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
                  title: "Logout?",
                  position: "top-end",
                  width: 300,
                  showCancelButton: true,
                  confirmButtonText: "Yes",
                  cancelButtonText: "No!",
                  reverseButtons: true
            }).then(async (result) => {
                  if (result.isConfirmed) {
                        logoutAlert.fire({
                              icon: "success",
                              title: "Sucessfully logged out!",
                              showConfirmButton: false,
                              timer: 1000
                        });

                        navigate("/");
                  } else if (result.dismiss === Swal.DismissReason.cancel) {

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