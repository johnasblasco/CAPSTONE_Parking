import React from 'react'

const About = () => {
      return (
            <div className='flex justify-between '>
                  <div>
                        <h2 className='text-8xl tracking-wider text-[#001858] font-extrabold'>ABOUT <span className='text-[#DFBD4E]'>US</span></h2>

                        <p className='mt-10 w-[90%]  text-wrap text-lg text-[#001858]'> Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />
                              Rerum, eaque. Ratione quidem, ipsam reprehenderit ipsum delectus est odio! <br />
                              Rerum, eaque. Ratione quidem, ipsam reprehenderit ipsum delectus <br />
                        </p>
                  </div>

                  <div className='mt-16'>
                        <img src="about.png" alt="" />
                  </div>


            </div>
      )
}

export default About