import React, { useState, useEffect } from 'react'
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { MdLocalPrintshop } from "react-icons/md";
import axios from 'axios';
import moment from 'moment';

const Reports = ({ allVehicles }) => {
      const [totalEarnings, setTotalEarnings] = useState(0)

      axios.get("http://localhost:8000/earnings")
            .then((response) => {
                  setTotalEarnings(response.data[0].totalEarnings)
                  console.log(totalEarnings)
            })
            .catch(err => console.log(err))


      // CURRENTLY PARKED
      const [timers, setTimers] = useState({});

      // Format duration into hours and minutes
      const formatTime = (startDate) => {
            const startTime = moment(startDate);
            const endTime = moment(); // Assuming current time is end time
            const duration = moment.duration(endTime.diff(startTime));

            const hours = Math.floor(duration.asHours());
            const minutes = duration.minutes() > 9 ? duration.minutes() : "0" + duration.minutes()
            return { hours, minutes };
      };

      // Update timers every minute
      useEffect(() => {
            const intervalId = setInterval(() => {
                  // Create new timers object with updated durations
                  const updatedTimers = {};
                  allVehicles.forEach((vehicle, index) => {
                        const { hours, minutes } = formatTime(vehicle.startDate);
                        updatedTimers[index] = { hours, minutes };
                  });
                  setTimers(updatedTimers);
            }, 5000); // Update every minute (60000 milliseconds)

            // Clear interval on component unmount
            return () => clearInterval(intervalId);
      }, [allVehicles]);

      console.log(allVehicles)



      return (


            <>
                  <Header />
                  <div className='absolute left-[200px] top-[100px] lg:overflow-x-hidden max-lg:hidden'>
                        <div className="mx-4 bg-[#D9D9D9] min-h-screen rounded-3xl" style={{ width: 'calc(100vw - 250px)' }}>


                              {/* header */}
                              <div className='relative my-4'>
                                    <div className="title flex justify-center">
                                          <h2 className='text-5xl my-8 font-extrabold' >Reports</h2>

                                          <div className='absolute right-12 top-12 flex gap-2 items-center' >
                                                <MdLocalPrintshop className='text-2xl' />
                                                <button className='bg-[#53AC5C] py-1 px-3 rounded-xl text-white'>Print</button>
                                          </div>

                                    </div>
                              </div>
                              {/* EARNINGS */}
                              <div className='mx-10 flex items-center gap-6 justify-around font-light'>

                                    {/* left */}
                                    <div className='bg-[#C1B8B8] w-[45dvw] rounded-2xl '>

                                          <div className='bg-[#A89595] mx-4 mt-4 rounded-xl w-fit px-6 py-1'>
                                                <span>Earnings</span>
                                          </div>


                                          <div className='flex text-center justify-center gap-20 mb-10 '>

                                                <div>
                                                      <p className='text-4xl my-2'>PHP <b className='font-extrabold'>20.00</b></p>
                                                      <p>Today</p>
                                                </div>
                                                <div>
                                                      <p className='text-4xl my-2'>PHP <b className='font-extrabold'>2000.00</b></p>
                                                      <p>Yesterday</p>
                                                </div>

                                          </div>
                                    </div>

                                    {/* right */}
                                    <div className='bg-[#9CD2A5] w-[25dvw] rounded-2xl '>
                                          <div className='bg-[#87BB83] mx-4 mt-4 rounded-xl w-fit px-6 py-1'>
                                                <span>Total Earnings</span>
                                          </div>

                                          <div className=' flex items-start text-center mb-10'>
                                                <p className='text-4xl my-5 w-full'>PHP <b className='font-extrabold'>{totalEarnings}.00</b></p>
                                          </div>
                                    </div>

                              </div>



                              {/* vehicle table content */}
                              <div className="bg-[#D6D0C4] m-12 rounded-3xl min-h-screen h-auto flex flex-col py-4 px-4 gap-6 items-center">
                                    <p className=' bg-[#94AB95] py-1 px-10 text-lg rounded-3xl '>Car History</p>

                                    {/* flex between filter and table */}
                                    <div className='flex gap-4 w-full mt-8'>
                                          {/* filter */}
                                          <div className='bg-[#C9B7B7] w-[25vw] rounded-xl h-fit'>

                                          </div>

                                          {/* table */}
                                          <div className='w-full'>
                                                {/* header only */}
                                                <div className='flex items-center justify-center gap-4'>
                                                      <p>Search by ticket No.</p>
                                                      <input className="bg-[#C4B9A9] rounded-2xl py-1 px-6 outline-none placeholder-black/50" type="text" placeholder='Please input Ticket No.' />
                                                      <button className='bg-[#6181D3] text-white py-1 px-2 rounded-xl'>Search</button>
                                                </div>

                                                {/*table  */}
                                                <table className='w-full my-10'>
                                                      <thead>
                                                            <tr className='text-center border-b border-black'>
                                                                  <th>Ticket No.</th>
                                                                  <th>Date</th>
                                                                  <th>Plate No.</th>
                                                                  <th>Category</th>
                                                                  <th>Total Time</th>
                                                                  <th>Status</th>
                                                            </tr>
                                                      </thead>
                                                      <tbody>
                                                            {allVehicles.map((vehicle, index) => {
                                                                  const { hours, minutes } = timers[index] || formatTime(vehicle.startDate);

                                                                  const duration = vehicle.endDate != null ? moment.duration(moment(vehicle.endDate).diff(moment(vehicle.startDate))) : "";

                                                                  return (
                                                                        <tr key={index} className="text-center">
                                                                              <td>{vehicle.ticketNumber}</td>
                                                                              <td>{moment(vehicle.startDate).format("DD-MM-YY")}</td>
                                                                              <td>{vehicle.plateNumber}</td>
                                                                              <td>{vehicle.category}</td>
                                                                              <td>
                                                                                    {vehicle.endDate != null ?
                                                                                          duration > 24 ? `${duration.days() != 0 ? `${duration.days()} days` : ""}  ${duration.hours()} hours`
                                                                                                :
                                                                                                `${duration.hours()} hours`


                                                                                          : `${hours}:${minutes} hours`}

                                                                              </td>
                                                                              <td>{vehicle.status ? "In" : "Out"}</td>
                                                                        </tr>
                                                                  );
                                                            })}
                                                      </tbody>
                                                </table>



                                          </div>
                                    </div>

                              </div>

                        </div>
                  </div >
                  <Navbar />
            </>
      )
}

export default Reports