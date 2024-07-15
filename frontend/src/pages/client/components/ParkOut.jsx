import { IoMdClose } from 'react-icons/io';
import { useEffect, useState } from 'react';


const ParkOut = ({ setShowParkOut }) => {


      return (
            <div className='fixed w-screen h-screen bg-black/40 z-50'>
                  <div className='fixed top-0 inset-0 flex items-center justify-center bg-black/40'>

                        <div className={`relative lg:min-w-[45vw] md:max-w-[20vw] sm:max-w-[10vw] bg-[#D9D9D9] shadow-lg rounded-2xl flex flex-col gap-4 items-center p-8 w-full h-5/6`}>
                              <IoMdClose onClick={() => setShowParkOut(false)} className='text-3xl absolute top-2 right-2 cursor-pointer' />

                              <h2 className='text-center text-3xl font-bold mb-4'>Parking Out</h2>

                              <div className='flex items-center gap-4'>
                                    <label htmlFor="ticket">Search by Ticket No.</label>
                                    <input type="text" className='bg-[#D1CBC2] p-3 rounded-xl ' placeholder='Please input Ticket No.' />
                              </div>



                              <button className='mt-auto px-16 py-3 mb-10 bg-[#6181D3] text-white font-bold text-3xl rounded-2xl '>
                                    Search
                              </button>
                        </div>

                  </div>
            </div>
      );
};

export default ParkOut;




