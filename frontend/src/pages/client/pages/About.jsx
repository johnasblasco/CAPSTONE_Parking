import React from 'react'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
const About = () => {
      return (
            <>
                  <Header />
                  <div className='absolute left-[200px] top-[100px] lg:overflow-x-hidden max-sm:hidden'>
                        <div className="mx-4 bg-[#D9D9D9] min-h-screen rounded-3xl" style={{ width: 'calc(100vw - 250px)' }}>
                              <div className="title flex justify-center">
                                    <h2 className='text-5xl my-8 font-extrabold' >About</h2>
                              </div>

                              {/* CONTENT */}
                              <div className="bg-[#D6D0C4] mx-8 rounded-3xl min-h-screen h-auto flex flex-col px-8 py-4 gap-6 items-center">
                                    <p className=' bg-[#94AB95] py-1 px-4 text-lg rounded-3xl '>About this Project</p>

                                    <div className='bg-[#CCC0B2] rounded-lg p-6'>
                                          <p className='text-justify'>Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                                                Dolorum saepe provident, quos porro voluptatibus dolores
                                                praesentium officia recusandae? Quia porro dolorum incidunt
                                                <br /><br />
                                                voluptate vitae obcaecati. Deleniti blanditiis cupiditate
                                                voluptates asperiores!
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                                <br /><br />
                                                Excepturi harum, maxime sint cum exercitationem veritatis quidem architecto,
                                                odit magni laudantium ex neque quaerat quas impedit pariatur aut dignissimos,
                                                beatae placeat!
                                          </p>
                                    </div>

                                    <div className='lg:max-w-[300px] bg-[#BBAFD4] p-4 rounded-3xl text-center'>
                                          <p>
                                                Created By: Group 4, 3F-G1 of <br /> College of Information Technology <br /> Bulacan state University <br /> All rights Reserved.
                                          </p>
                                    </div>




                              </div>

                        </div>
                  </div >

                  <Navbar />

            </>
      )
}

export default About