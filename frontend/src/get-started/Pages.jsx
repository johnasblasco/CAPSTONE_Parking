import React, { useState } from 'react'
import Header from './components/Header'
import Form from './components/Form'
import About from './components/About'
import { Routes, Route } from 'react-router-dom'
const Pages = () => {

      const [mySwitch, setMySwitch] = useState(true)

      return (
            <div className='bg-no-repeat bg-bottom bg-[url("/BG.png")] bg-cover w-full fixed overflow-scroll'>

                  <div className='h-screen px-28 pt-12  '>
                        <Header setMySwitch={setMySwitch} />

                        <div className='mt-48'>
                              {
                                    mySwitch ? (<Form />) : (<About />)

                              }



                        </div>

                  </div>

            </div>
      )
}

export default Pages