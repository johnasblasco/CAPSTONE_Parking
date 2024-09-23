import React, { useState, useEffect, useContext, useRef } from 'react';
import { myContext } from '../Home';
import moment from 'moment';
import { IoMdClose } from 'react-icons/io';
import axios from 'axios';
import Toast from '../components/Toast';


const ManageVehicles = () => {
      const [timers, setTimers] = useState({});
      const [showPopup, setShowPopup] = useState(false);
      const [selectedVehicle, setSelectedVehicle] = useState(null);
      const [showToast, setShowToast] = useState('');

      const [socket, allVehicles, totalEarnings, todayEarn, setTodayEarn, yesterdayEarnings, vehicles, setVehicles, setTotalEarnings, earnings, setEarnings] = useContext(myContext)



      // STEP1: make a refference
      const invoiceRef = useRef();

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

            const vehicleUpdateData = {
                  ...selectedVehicle,
                  endDate: moment(),
                  status: false
            };

            try {
                  await axios.put(`http://localhost:8000/vehicle/${selectedVehicle._id}`, vehicleUpdateData)
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



      // search
      const [getVehicles, getSetVehicles] = useState(vehicles)
      const [search, setSearch] = useState(0);
      console.log(search)
      const handleSearch = () => {
            let filteredVehicles = vehicles;
            search > 0 ? setVehicles(filteredVehicles.filter(vehicle => vehicle.ticketNumber == search)) : ""

      }


      return (
            <>
                  <div className='mx-[10%] h-max-700:mt-[35vh] mt-[25vh] w-[80vw] text-deepBlue'>


                        {/* CONTENT */}
                        <div className="border-4 border-bloe w-full relative bg-white mx-8 rounded-3xl min-h-screen h-auto flex flex-col px-8 py-4 gap-6 items-center">
                              <p className='border-4 font-bold border-deepBlue absolute left-[-35px] bg-yeelow py-1 px-4 text-lg rounded-3xl '>Currently Parked</p>

                              <div className='flex items-center justify-center w-full'>
                                    {/* SEARCH */}
                                    <div className='flex items-center gap-4'>
                                          <input onChange={e => setSearch(e.target.value)} className=" w-[25vw] bg-lightBlue py-2 px-4 rounded-3xl  font-bold text-xl text-center border-4 border-deepBlue outline-none placeholder-deepBlue/50" type="text" placeholder='Search' />
                                          <button onClick={handleSearch} className='bg-greenWich text-deepBlue font-bold py-2 px-8 rounded-3xl border-4 border-deepBlue'>Search</button>
                                    </div>
                              </div>

                              <table className='w-full text-center mt-16'>
                                    <thead>
                                          <tr className='border-b-4 border-deepBlue'>
                                                <th className='border-r-4 border-deepBlue'>Ticket No.</th>
                                                <th className='border-r-4 border-deepBlue'>Date</th>
                                                <th className='border-r-4 border-deepBlue'>Plate No.</th>
                                                <th className='border-r-4 border-deepBlue'>Category</th>
                                                <th className='border-r-4 border-deepBlue'>Total Time</th>
                                                <th >Action</th>
                                          </tr>
                                    </thead>

                                    <tbody>
                                          {

                                                vehicles.map((vehicle, index) => {
                                                      const { hours, minutes } = timers[index] || formatTime(vehicle.startDate);
                                                      const overtime = isOvertime(hours);
                                                      return (


                                                            <tr key={index} className={`text-center h-10 ${overtime ? '' : ''}  `}>
                                                                  <td className='border-r-4 border-deepBlue'>{vehicle.ticketNumber}</td>
                                                                  <td className='border-r-4 border-deepBlue'>{moment(new Date(vehicle.startDate)).format('DD-MM-YY')}</td>
                                                                  <td className='border-r-4 border-deepBlue'>{vehicle.plateNumber}</td>
                                                                  <td className='border-r-4 border-deepBlue'>{vehicle.category}</td>
                                                                  <td className={` border-r-4 border-deepBlue ${overtime ? 'text-[#892121]' : ''}`}>
                                                                        {`${hours}:${minutes} hours`}
                                                                  </td>
                                                                  <td ><button onClick={() => manageParkout(vehicle)} className='bg-pink py-1 px-2 text-deepBlue rounded-2xl border-4 font-bold border-deepBlue'>Park out</button></td>
                                                            </tr>
                                                      )
                                                })
                                          }
                                    </tbody>
                              </table>

                        </div>

                  </div>

                  {
                        showPopup && (
                              <div className='fixed w-screen h-screen bg-black/40 z-50'>
                                    <div className='fixed inset-0 flex items-center justify-center bg-deepBlue/40'>

                                          {/* FORM */}
                                          <div className={`relative bg-offWhite shadow-lg rounded-3xl flex flex-col gap-8 items-center p-20 `}>
                                                <IoMdClose onClick={() => setShowPopup(false)} className='text-5xl absolute top-4 right-4 cursor-pointer' />

                                                <h2 className='text-6xl text-bloe font-bold text-center '>Parking Out</h2>

                                                <div className='bg-[#EEE4E4] w-full rounded-2xl gap-8 flex justify-between p-8 font-bold'>
                                                      <div>
                                                            <p>Ticket Number</p>
                                                            <p>Date</p>
                                                            <p>Vehicle Type</p>
                                                            <p>Time Duration</p>
                                                            <p>Status</p>
                                                      </div>

                                                      <div className='border border-[#0000004F] my-2'></div>

                                                      <div className='text-right'>
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

                                                      <button onClick={handleRemove} className='bg-pink border-4 border-bloe hover:bg-[#c73838] py-2 px-8 text-2xl font-bold rounded-2xl text-white'>Remove</button>
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

                  {/*STEP 3: RECEIPT HERE HIDDEN */}
                  < div ref={invoiceRef} className="mt-4 hidden" >
                        <h1>Thank you kufal</h1>
                  </div >
            </>
      )
}

export default ManageVehicles