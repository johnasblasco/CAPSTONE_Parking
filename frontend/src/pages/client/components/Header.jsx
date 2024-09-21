import React from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
const Header = () => {

      const navigate = useNavigate();
      const logout = () => {
            Swal.fire({
                  title: "Are you sure? You Want To Logout?",
                  text: "You won't be able to revert this!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, Logout!"
            }).then((result) => {
                  if (result.isConfirmed) {
                        Swal.fire({
                              title: "Success!",
                              text: "Your account has been logged out.",
                              icon: "success"
                        });
                        navigate('/')
                  }
            });
      }
      return (
            <header className='bg-white py-4 px-12 mb-4 flex items-center justify-between fixed top-0 rounded-b-3xl w-full z-10'>
                  <img src="/logo2.png" className='w-[200px] mx-4' />
                  <img onClick={logout} src="/logout.png" className='w-10 hover:cursor-pointer' />
            </header>
      )
}

export default Header