import React from 'react'
import { Link } from 'react-router-dom'
const Header = () => {
      return (
            <header className='bg-[#D9D9D9] p-4 mb-4 fixed top-0 w-full z-50 '>
                  <Link to="/admin/home"><img src="/logo2.png" className='w-[200px] mx-4' /></Link>
            </header>
      )
}

export default Header