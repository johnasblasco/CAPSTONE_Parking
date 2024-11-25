import React, { useState } from 'react';
import { IoMdLogOut } from "react-icons/io";
import { Link } from 'react-router-dom';

const Navbar = () => {
      const [activeLink, setActiveLink] = useState('');

      const handleLinkClick = (link) => {
            setActiveLink(link);
      };

      return (
            <>
                  <nav className='fixed top-[100px] left-[10%] font-bold'>
                        <div className=" w-[80vw] bg-white border-4 border-[#001858] p-1 rounded-full text-center">
                              <div className='flex justify-center gap-4'>
                                    <Link
                                          to="/admin/home/settings"
                                          onClick={() => handleLinkClick('settings')}
                                          className={`rounded-full w-[200px] border-4 border-[#001858] py-2 px-4 ${activeLink === 'settings' ? 'bg-darkYellow' : ''}`}
                                    >
                                          Settings
                                    </Link>

                                    <Link
                                          to="/admin/home/manage-account"
                                          onClick={() => handleLinkClick('manage-account')}
                                          className={`rounded-full border-4 border-[#001858] w-[200px] py-2 px-4 ${activeLink === 'manage-account' ? 'bg-darkYellow' : ''}`}
                                    >
                                          Manage Account
                                    </Link>
                                    <Link
                                          to="/admin/home/login-history"
                                          onClick={() => handleLinkClick('login-history')}
                                          className={`rounded-full w-[200px] border-4 border-[#001858] py-2 px-4 ${activeLink === 'login-history' ? 'bg-darkYellow' : ''}`}
                                    >
                                          Login History
                                    </Link>
                                    <Link
                                          to="/admin/home/dashboard"
                                          onClick={() => handleLinkClick('reports')}
                                          className={`rounded-full w-[200px] border-4 border-[#001858] py-2 px-4 ${activeLink === 'reports' ? 'bg-darkYellow' : ''}`}
                                    >
                                          Dashboard
                                    </Link>
                              </div>
                        </div>
                  </nav>
            </>
      );
};

export default Navbar;
