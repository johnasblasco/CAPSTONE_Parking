import React from 'react';

const About = () => {
      const title = "ABOUT US";
      const lines = [
            "We Are Group 4, from Section 4F-G1",
            "College of Information and Communications Technology",
            "Bulacan State University",
            "",
            "Our team is committed to developing the Parking System Management Application, designed to improve parking efficiency and enhance the user experience.",
            "",
            "All rights reserved."
      ];

      return (
            <div className='flex justify-center'>
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

                        <div className='mt-10 w-[80%] text-wrap text-2xl text-white mb-12'>
                              {lines.map((line, index) => (
                                    <p key={index} className={`${line ? "mb-4" : "mb-8"}`}>
                                          {line.split(" ").map((word, wordIndex) => (
                                                <span
                                                      key={wordIndex}
                                                      className="inline-block font-bold transition-transform duration-400 hover:scale-125 hover:animate-color-change mr-2"
                                                >
                                                      {word}
                                                </span>
                                          ))}
                                    </p>
                              ))}
                        </div>
                  </div>

                  <div className='mr-16'
                        data-aos="fade-left"
                        data-aos-offset="300"
                        data-aos-easing="ease-in-sine">
                        <img className='hover:scale-105 w-[2000px]' src="about.png" alt="About Us" />
                  </div>
            </div>
      );
}

export default About;
