import React, { useState } from 'react'
import Header from './components/Header'
import Form from './components/Form'
import About from './components/About'
import { Routes, Route } from 'react-router-dom'
const Pages = () => {

      const [mySwitch, setMySwitch] = useState(true)

      return (
            <div className='bg-no-repeat bg-bottom bg-[url("bg.png")] bg-cover h-screen w-full fixed overflow-auto'>

                  <div className='h-screen px-28 py-12  '>
                        <Header setMySwitch={setMySwitch} />

                        <div className='mt-16'>
                              {
                                    mySwitch ? (<Form />) : (<About />)

                              }



                        </div>

                  </div>

            </div>
      )
}

export default Pages