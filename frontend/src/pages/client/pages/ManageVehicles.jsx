import React from 'react'
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import moment from 'moment';
import { useState, useEffect } from 'react';
const ManageVehicles = ({ vehicles }) => {
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
                  vehicles.forEach((vehicle, index) => {
                        const { hours, minutes } = formatTime(vehicle.startDate);
                        updatedTimers[index] = { hours, minutes };
                  });
                  setTimers(updatedTimers);
            }, 5000); // Update every minute (60000 milliseconds)

            // Clear interval on component unmount
            return () => clearInterval(intervalId);
      }, [vehicles]);

      // Determine if vehicle is overtime
      const isOvertime = (hours) => {
            return hours >= 3;
      };



      return (
            <>
                  <Header />
                  <div className='absolute left-[200px] top-[100px] lg:overflow-x-hidden max-sm:hidden'>
                        <div className="mx-4 bg-[#D9D9D9] min-h-screen rounded-3xl" style={{ width: 'calc(100vw - 250px)' }}>
                              <div className="title flex justify-center">
                                    <h2 className='text-5xl my-8 font-extrabold' >Manage Vehicles</h2>
                              </div>

                              {/* CONTENT */}
                              <div className="bg-[#D6D0C4] mx-8 rounded-3xl min-h-screen h-auto flex flex-col px-8 py-4 gap-6 items-center">
                                    <p className=' bg-[#94AB95] py-1 px-4 text-lg rounded-3xl '>Currently Parked</p>

                                    <table className='w-full text-center '>
                                          <thead>
                                                <tr className='border-b border-black'>
                                                      <th>Ticket No.</th>
                                                      <th>Date</th>
                                                      <th>Plate No.</th>
                                                      <th>Category</th>
                                                      <th>Total Time</th>
                                                      <th>Action</th>
                                                </tr>
                                          </thead>

                                          <tbody>
                                                {

                                                      vehicles.map((vehicle, index) => {
                                                            const { hours, minutes } = timers[index] || formatTime(vehicle.startDate);
                                                            const overtime = isOvertime(hours);
                                                            return (


                                                                  <tr key={index} className={`text-center h-10 ${overtime ? 'bg-[#C9B7B7]' : ''}`}>
                                                                        <td>{vehicle.ticketNumber}</td>
                                                                        <td>{moment(new Date(vehicle.startDate)).format('DD-MM-YY')}</td>
                                                                        <td>{vehicle.plateNumber}</td>
                                                                        <td>{vehicle.category}</td>
                                                                        <td className={`${overtime ? 'text-[#892121]' : ''}`}>
                                                                              {`${hours}:${minutes} hours`}
                                                                        </td>
                                                                        <td><button className='bg-[#D94B2C] py-1 px-2 text-white rounded-lg'>Park out</button></td>
                                                                  </tr>
                                                            )
                                                      })
                                                }
                                          </tbody>
                                    </table>

                              </div>

                        </div>
                  </div >
                  <Navbar />
            </>
      )
}

export default ManageVehicles