import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import moment from 'moment';
import { IoMdClose } from 'react-icons/io';
import axios from 'axios';
import Toast from '../components/Toast';

const ManageAccount = ({ vehicles }) => {
      const [timers, setTimers] = useState({});
      const [showPopup, setShowPopup] = useState(false);
      const [selectedVehicle, setSelectedVehicle] = useState(null);
      const [showToast, setShowToast] = useState('');

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
            }, 60000); // Update every minute (60000 milliseconds)

            // Clear interval on component unmount
            return () => clearInterval(intervalId);
      }, [vehicles]);

      // Determine if vehicle is overtime
      const isOvertime = (hours) => {
            return hours >= 3;
      };

      const manageParkout = (vehicle) => {
            setSelectedVehicle(vehicle);
            setShowPopup(true);
            setStartDate(vehicle.startDate)
      };

      const handleRemove = async () => {
            try {
                  await axios.put(`http://localhost:8000/vehicle/${selectedVehicle._id}`, {
                        ...selectedVehicle,
                        status: false
                  })

                  setShowPopup(false)
                  setShowToast("out")

            } catch (error) {
                  console.log(error)
            }
      }
      const [startDate, setStartDate] = useState(new Date())
      const currentDate = moment();


      // Calculate the difference in hours and minutes
      const duration = moment.duration(currentDate.diff(startDate));

      const dayDifference = duration.days();
      const hoursDifference = duration.hours();
      const minutesDifference = duration.minutes();

      console.log("Difference in hours:", hoursDifference);
      console.log("Difference in minutes:", minutesDifference);
      console.log("Difference in Days:", dayDifference);


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
                                                                        <td><button onClick={() => manageParkout(vehicle)} className='bg-[#D94B2C] py-1 px-2 text-white rounded-lg'>Park out</button></td>
                                                                  </tr>
                                                            )
                                                      })
                                                }
                                          </tbody>
                                    </table>

                              </div>

                        </div>
                  </div >
                  {
                        showPopup && (
                              <div className='fixed w-screen h-screen bg-black/40 z-50'>
                                    <div className='fixed inset-0 flex items-center justify-center bg-black/40'>

                                          <div className={`relative lg:min-w-[45vw] md:max-w-[20vw] sm:max-w-[10vw] bg-[#D9D9D9] shadow-lg rounded-2xl flex flex-col gap-8  p-8 w-full h-5/6`}>
                                                <IoMdClose onClick={() => { setShowPopup(false) }} className='text-3xl absolute top-2 right-2 cursor-pointer' />

                                                <h2 className='text-3xl font-bold mb-4 text-center '>Parking Out</h2>

                                                <div className='bg-[#D1D0CA] w-full rounded-2xl flex justify-between px-10 font-bold'>
                                                      <div>
                                                            <p>Ticket Number</p>
                                                            <p>Date</p>
                                                            <p>Vehicle Type</p>
                                                            <p>Time Duration</p>
                                                            <p>Status</p>
                                                      </div>

                                                      <div className='border border-[#0000004F] my-2'></div>

                                                      <div className=''>
                                                            <p>{selectedVehicle.ticketNumber}</p>
                                                            <p>{moment(new Date(selectedVehicle.startDate)).format("DD-MM-YY")}</p>
                                                            <p>{selectedVehicle.category}</p>
                                                            <p>{
                                                                  dayDifference != 0 ?
                                                                        `${dayDifference} days ${hoursDifference} hours and ${minutesDifference} mins`
                                                                        :
                                                                        `${hoursDifference} hours and ${minutesDifference} mins`
                                                            }</p>
                                                            <p>{selectedVehicle.status ? "Parked In" : "Parked Out"}</p>
                                                      </div>

                                                </div>

                                                <div className='flex my-auto items-center gap-6 '>
                                                      <div>
                                                            <p>Total Charge: <b> Php.20.00</b> </p>
                                                            {hoursDifference >= 3 && <p className='ml-24 font-bold'>(+ overstay)</p>}
                                                      </div>

                                                      <button onClick={handleRemove} className='bg-[#B96F6F] hover:bg-[#a96464] py-2 px-8 text-2xl font-bold rounded-2xl text-white'>Remove</button>
                                                </div>


                                          </div>
                                    </div>
                              </div>
                        )
                  }
                  {/* TOAST */}
                  {
                        showToast == "out" && <Toast setShowToast={setShowToast} title={"Vehicle removed!"} disc={"Vehicle has been removed to the database."} />
                  }
                  <Navbar />
            </>
      )
}

export default ManageAccount