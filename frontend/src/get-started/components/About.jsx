import React from 'react';

const About = () => {
      const title = "ABOUT  US";

      return (
            <div className='flex justify-between'>
                  <div>
                        <h2 className='text-8xl tracking-wider text-white font-extrabold'>
                              {title.split("").map((letter, index) => (
                                    <span
                                          key={index}
                                          className={`inline-block animate-color-change hover:scale-125 ${letter === " " ? "w-4" : ""}`}
                                    >
                                          {letter}
                                    </span>
                              ))}
                        </h2>

                        <p className=' mt-10 w-[60%] text-wrap text-2xl text-white'>
                              Created By: Group 4, 3F-G1 of College of Information and Communications Technology
                              Bulacan State University. All Rights Reserved.
                        </p>
                  </div>

                  <div className='w-full'>
                        <img className='hover:scale-105' src="about.png" alt="About Us" />
                  </div>
            </div>
      );
}

export default About;
