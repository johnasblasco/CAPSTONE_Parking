import React from 'react';

const About = () => {
      const title = "ABOUT  US";
      const paragraph = "Created By: Group 4, 3F-G1 of College of Information and Communications Technology Bulacan State University. All Rights Reserved."

      return (
            <div className='flex justify-between'>
                  <div data-aos="fade-right"
                        data-aos-offset="300"
                        data-aos-easing="ease-in-sine" >
                        <h2 className='text-8xl tracking-wider text-white font-extrabold'>
                              {title.split("").map((letter, index) => (
                                    <span
                                          key={index}
                                          className={`inline-block animate-color-change hover:animate-scale-text ${letter === " " ? "w-4" : ""}`}
                                    >
                                          {letter}
                                    </span>
                              ))}
                        </h2>



                        <p className='mt-10 w-[60%] text-wrap text-2xl text-white mb-12'>
                              {paragraph.split(" ").map((word, index) => (
                                    <span
                                          key={index}
                                          className="inline-block font-bold  hover:animate-color-change transition-transform duration-400 hover:scale-125 mr-4"
                                    >
                                          {word}
                                    </span>
                              ))}
                        </p>

                  </div>

                  <div data-aos="fade-left"
                        data-aos-offset="300"
                        data-aos-easing="ease-in-sine">
                        <img className='hover:scale-105 w-[1800px]' src="about.png" alt="About Us" />
                  </div>
            </div>
      );
}

export default About;
