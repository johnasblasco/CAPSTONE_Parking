import React from 'react'
import { Link } from 'react-router-dom'

const Form = () => {
      const parkAid = "PARK-AID";
      const system = "SYSTEM";
      const paragraph = "A Parking system that will help you to park your vehicle in a safe and secure way, right at your fingertips";

      return (
            <div className='grid grid-cols-2 grid-rows-1'>

                  <div data-aos="fade-right"
                        data-aos-offset="300"
                        data-aos-easing="ease-in-sine">

                        <h2 className='text-8xl tracking-wide animate-color-change font-extrabold'>
                              {parkAid.split("").map((letter, index) => (
                                    <span
                                          key={index}
                                          className={`inline-block animate-color-change transition-transform duration-400 hover:animate-scale-text ${letter === " " ? "w-4" : ""}`}
                                    >
                                          {letter}
                                    </span>
                              ))}
                        </h2>

                        <h2 className='text-8xl tracking-widest text-offWhite font-extrabold'>
                              {system.split("").map((letter, index) => (
                                    <span
                                          key={index}
                                          className={`inline-block transition-transform duration-400 hover:scale-125 ${letter === " " ? "w-4" : ""}`}
                                    >
                                          {letter}
                                    </span>
                              ))}
                        </h2>

                        <p className='mt-10 w-[60%] text-wrap text-2xl text-white'>
                              {paragraph.split(" ").map((word, index) => (
                                    <span
                                          key={index}
                                          className="inline-block font-bold  hover:animate-color-change transition-transform duration-400 hover:scale-125 mr-4"
                                    >
                                          {word}
                                    </span>
                              ))}
                        </p>

                        <div className='mt-12 flex gap-4 text-center items-center font-bold'>
                              <Link to={'/get-started'} className="hover:scale-90 py-3 px-8 rounded-3xl border-white border-4 bg-yeelow text-darkBloe hover:bg-darkBloe hover:text-yeelow">
                                    GET STARTED
                              </Link>
                        </div>


                  </div>

                  <div data-aos="fade-left"
                        data-aos-offset="300"
                        data-aos-easing="ease-in-sine">

                        <img src="landing_Car.png" className='cp:hidden h-[120%] z-[-1] mt-[-150px]' />
                  </div>
            </div >
      );
}

export default Form;
