import React, { useState } from 'react'
import Header from './components/Header'
import Form from './components/Form'
import About from './components/About'
const Pages = () => {

      const [mySwitch, setMySwitch] = useState(true)

      return (
            <div className='bg-no-repeat bg-bottom bg-[url("/BG.png")] bg-cover w-full fixed overflow-scroll'>

                  <div className='h-screen px-28 pt-12  '>
                        <Header setMySwitch={setMySwitch} />

                        <div className='relative mt-48 h-max-700:mb-20'>
                              {
                                    mySwitch ? (<Form />) : (<About />)

                              }
                        </div>

                        <footer className="fixed w-[99%] bottom-0 left-0  text-white py-6">
                              <div className="container mx-auto px-4">
                                    <div className="flex justify-between items-center">

                                          <div className="text-sm">
                                                <p>&copy; {new Date().getFullYear()}ParkAid System. All rights reserved.</p>
                                          </div>

                                          <div className="space-x-4">
                                                <a href="https://www.freeprivacypolicy.com/live/2a280f3a-2cca-45c5-91b5-dfd9ecdf44e7" target='_blank' className="text-gray-400 hover:text-white">Privacy Policy</a>
                                                <a href="https://www.freeprivacypolicy.com/live/46184dc6-6fe9-48cd-957d-4007bf1b378d" target='_blank' className="text-gray-400 hover:text-white">Terms of Service</a>
                                                <a href="https://www.facebook.com/pmv.kang" target='_blank' className="text-gray-400 hover:text-white">Contact Us</a>
                                          </div>
                                    </div>
                              </div>
                        </footer>
                  </div>


            </div>
      )
}

export default Pages