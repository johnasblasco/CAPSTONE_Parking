import React, { useState, useEffect, useContext, useRef } from 'react';

import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import { FaFilter } from "react-icons/fa";
import { myContext } from '../Home';
import moment from 'moment';
import { IoMdClose } from 'react-icons/io';
import axios from 'axios';
import Swal from 'sweetalert2';


const ManageVehicles = () => {
      const [timers, setTimers] = useState({});
      const [showPopup, setShowPopup] = useState(false);
      const [selectedVehicle, setSelectedVehicle] = useState(null);
      const [displayVehicles, setDisplayVehicles] = useState([]);

      const [
            socket,
            allVehicles,
            setAllVehicles,
            vehicles,
            setVehicles,
            companyName,
            parkingRules,
            twoWheels,
            threeAndFourWheels,
            pricePerTicket,
            hoursLimit,
            overTimeFees,
      ] = useContext(myContext)


      // Handle radio button clicks
      const [twoWheelsRadio, setTwoWheelsRadio] = useState(false);
      const [threeWheelsRadio, setThreeWheelsRadio] = useState(false);
      const [fourWheelsRadio, setFourWheelsRadio] = useState(false);
      const [IN, setIN] = useState(false);
      const [OUT, setOUT] = useState(false);

      const handleIN = () => {
            setIN(true)
            setOUT(false)
      }
      const handleOUT = () => {
            setIN(false)
            setOUT(true)
      }

      const handleTwo = () => {
            setTwoWheelsRadio(true);
            setThreeWheelsRadio(false);
            setFourWheelsRadio(false);
      };

      const handleThree = () => {
            setTwoWheelsRadio(false);
            setThreeWheelsRadio(true);
            setFourWheelsRadio(false);
      };

      const handleFour = () => {
            setTwoWheelsRadio(false);
            setThreeWheelsRadio(false);
            setFourWheelsRadio(true);
      };
      // Update table based on radio button selection
      useEffect(() => {
            let filteredVehicles = allVehicles;

            // Filter by category
            if (twoWheelsRadio) {
                  filteredVehicles = filteredVehicles.filter(vehicle => vehicle.category === '2 Wheels');
            } else if (threeWheelsRadio) {
                  filteredVehicles = filteredVehicles.filter(vehicle => vehicle.category === '3 Wheels');
            } else if (fourWheelsRadio) {
                  filteredVehicles = filteredVehicles.filter(vehicle => vehicle.category === '4 Wheels');
            }

            // Filter by status
            if (IN) {
                  filteredVehicles = filteredVehicles.filter(vehicle => vehicle.status === true);
            } else if (OUT) {
                  filteredVehicles = filteredVehicles.filter(vehicle => vehicle.status === false);
            }


            setDisplayVehicles(filteredVehicles);
      }, [twoWheelsRadio, threeWheelsRadio, fourWheelsRadio, allVehicles, IN, OUT]);



      // Handle Date Selection
      const handleDateSelection = async () => {
            const pastMinimumDate = new Date('2024-01-01').toISOString().split('T')[0];

            const { value: date } = await Swal.fire({
                  title: "Select Departure Date",
                  input: "date",
                  inputAttributes: {
                        required: true,
                        min: pastMinimumDate,
                  },
                  showCancelButton: true,
                  confirmButtonText: "Submit",
            });

            if (date) {
                  const filteredEarnings = allEarnings.filter(earning =>
                        earning.currentDate.startsWith(date)
                  );


                  // Fetch vehicles for the selected date
                  await fetchSelectedVehicles(date);

                  Swal.fire("PRINT DATE", date);
            }
      }

      const fetchSelectedVehicles = async (date) => {
            try {
                  const res = await axios.get('http://localhost:8000/vehicle');
                  // Check if vehicles have startDate and filter them
                  const filteredVehicles = res.data.filter(vehicle => {
                        if (vehicle.startDate) {
                              const vehicleDate = new Date(vehicle.startDate).toISOString().split('T')[0]; // Extract the date part

                              return vehicleDate === date; // Compare with selected date
                        }
                        return false; // Skip if startDate is missing
                  });

                  // Set today's vehicles state based on the selected date
                  setDisplayVehicles(filteredVehicles); // Keep the filtered vehicles for the selected date
            } catch (error) {
                  console.error('Error fetching vehicles:', error);
            }
      };

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

      useEffect(() => {
            setDisplayVehicles(allVehicles)
      }, [allVehicles])

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
      }, [allVehicles]);

      // Determine if vehicle is overtime
      const isOvertime = (hours) => {
            return hours >= 3;
      };

      const manageParkout = (allVehicles) => {
            setSelectedVehicle(allVehicles);
            setShowPopup(true);
            setStartDate(allVehicles.startDate)
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
                  parkOutAlert()


            } catch (error) {
                  console.log(error)
            }
      }
      const parkOutAlert = () => {
            Swal.fire({
                  title: "Parkout successful!",
                  width: 600,
                  padding: "3em",
                  color: "#716add",
                  background: "#fff",
                  backdrop: `
                    rgba(0,0,123,0.4)
                    url("/moving-car.gif")
                    left top
                    no-repeat
                  `
            });
      }

      const [startDate, setStartDate] = useState(new Date())
      const currentDate = moment();


      // Calculate the difference in hours and minutes
      const duration = moment.duration(currentDate.diff(startDate));

      const dayDifference = duration.days();
      const hoursDifference = duration.hours();
      const minutesDifference = duration.minutes();


      const [search, setSearch] = useState(0);
      console.log(search)
      const handleSearch = () => {
            let filteredVehicles = vehicles;
            search > 0 ? setDisplayVehicles(filteredVehicles.filter(vehicle => vehicle.ticketNumber == search)) : setDisplayVehicles(vehicles)

      }


      return (
            <>
                  <div className='mx-[9%] h-max-700:mt-[35vh] mt-[25vh] w-[80vw] text-deepBlue'>


                        {/* CONTENT */}
                        <div className='flex font-bold gap-4 w-full'>


                              {/* filter */}
                              <div className='relative mt-32 border-4 shadow-2xl border-deepBlue bg-offWhite min-w-[14vw] flex flex-col justify-center rounded-3xl h-fit gap-2 p-4 py-10'>
                                    <p className='flex border-4 border-deepBlue absolute left-[-35px] top-2 font-bold bg-yeelow py-1 px-12 text-lg rounded-3xl'><FaFilter />Filter</p>

                                    <p className='mt-12 text-center text-2xl font-bold'>By Wheels</p>

                                    <div className='flex justify-center gap-4 my-4'>
                                          <div className='flex justify-center items-center gap-3'>
                                                {twoWheelsRadio ? (<MdCheckBox onClick={() => setTwoWheelsRadio(!twoWheelsRadio)} className='text-4xl' />) : (<MdCheckBoxOutlineBlank onClick={handleTwo} className='text-4xl' />)}
                                                <label>2</label>
                                          </div>

                                          <div className='flex justify-center items-center gap-3'>
                                                {threeWheelsRadio ? (<MdCheckBox onClick={() => setThreeWheelsRadio(!threeWheelsRadio)} className='text-4xl' />) : (<MdCheckBoxOutlineBlank onClick={handleThree} className='text-4xl' />)}
                                                <p>3</p>
                                          </div>

                                          <div className='flex justify-center items-center gap-3'>
                                                {fourWheelsRadio ? (<MdCheckBox onClick={() => setFourWheelsRadio(!fourWheelsRadio)} className='text-4xl' />) : (<MdCheckBoxOutlineBlank onClick={handleFour} className='text-4xl' />)}
                                                <p>4</p>
                                          </div>
                                    </div>
                                    {/* by status */}
                                    <p className='mt-12 text-center text-2xl font-bold'>By Status</p>
                                    <div className='flex justify-center gap-4 my-4'>
                                          <div className='flex justify-center items-center gap-3'>
                                                {IN ? (<MdCheckBox onClick={() => setIN(!IN)} className='text-4xl' />) : (<MdCheckBoxOutlineBlank onClick={handleIN} className='text-4xl' />)}
                                                <label>In</label>
                                          </div>
                                          <div className='flex justify-center items-center gap-3'>
                                                {OUT ? (<MdCheckBox onClick={() => setOUT(!OUT)} className='text-4xl' />) : (<MdCheckBoxOutlineBlank onClick={handleOUT} className='text-4xl' />)}
                                                <p>Out</p>
                                          </div>
                                    </div>
                                    <p className='mt-12 text-center text-2xl font-bold'>By Date</p>
                                    <button onClick={handleDateSelection} className='m-4 h-12 bg-pink hover:scale-95 rounded-2xl p-2 px-4 text-white' >
                                          <FaFilter className='inline' /> MM/DD/YYYY
                                    </button>
                              </div>

                              <div className="border-4 border-bloe w-[99%] relative bg-white mx-8 rounded-3xl min-h-screen h-auto flex flex-col px-8 py-4 gap-6 items-center">
                                    <p className='border-4 font-bold border-deepBlue absolute left-[-35px] bg-yeelow py-1 px-4 text-lg rounded-3xl '>Currently Parked</p>

                                    <div className='flex items-center justify-center w-full'>
                                          {/* SEARCH */}
                                          <div className='flex items-center gap-4'>
                                                <input onChange={e => setSearch(e.target.value)} className=" w-[25vw] border-gray-500 py-2 px-4 rounded-2xl  font-bold text-xl text-center border-4 outline-8 outline-bloe placeholder-deepBlue/50" type="text" placeholder='Search by ticket Number' />
                                                <button onClick={handleSearch} className='bg-bloe hover:scale-95 hover:brightness-125 text-white text-xl  font-bold py-2 px-8 rounded-2xl border-2 border-bloe shadow-xl'>Search</button>
                                          </div>
                                    </div>


                                    {/* TABLE */}
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

                                                      displayVehicles.map((vehicle, index) => {
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
                                                                        <td >
                                                                              {vehicle.status ? (<button onClick={() => manageParkout(vehicle)} className='bg-pink py-2 px-3 hover:scale-95 hover:bg-red-500 hover:brightness-90 text-deepBlue rounded-2xl border-4 font-bold border-deepBlue'>Park out</button>) : ("--")}

                                                                        </td>
                                                                  </tr>
                                                            )
                                                      })
                                                }
                                          </tbody>
                                    </table>

                              </div>
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
                                                            <p>Total Charge: <b> Php.{pricePerTicket}.00</b> </p>
                                                            {hoursDifference >= 3 && <p className='ml-24 font-bold'>(+ overstay)</p>}
                                                      </div>

                                                      <button onClick={handleRemove} className='bg-pink border-4 border-bloe hover:bg-[#c73838] py-2 px-8 text-2xl font-bold rounded-2xl text-white'>Remove</button>
                                                </div>


                                          </div>
                                    </div>
                              </div>
                        )
                  }



            </>
      )
}

export default ManageVehicles