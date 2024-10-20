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

                        <footer class="fixed w-[99%] bottom-0 left-0  text-white py-6">
                              <div class="container mx-auto px-4">
                                    <div class="flex justify-between items-center">

                                          <div class="text-sm">
                                                <p>&copy; {new Date().getFullYear()}ParkAid System. All rights reserved.</p>
                                          </div>

                                          <div class="space-x-4">
                                                <a href="#" class="text-gray-400 hover:text-white">Privacy Policy</a>
                                                <a href="#" class="text-gray-400 hover:text-white">Terms of Service</a>
                                                <a href="#" class="text-gray-400 hover:text-white">Contact Us</a>
                                          </div>
                                    </div>
                              </div>
                        </footer>
                  </div>


            </div>
      )
}

export default Pages