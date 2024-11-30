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
      const [search, setSearch] = useState("");

      const [
            allVehicles,
            setAllVehicles,
            vehicles,
            setVehicles,
            hoursLimit,
            overTimeFees,
      ] = useContext(myContext);

      // Radio button states
      const [twoWheelsRadio, setTwoWheelsRadio] = useState(false);
      const [threeWheelsRadio, setThreeWheelsRadio] = useState(false);
      const [fourWheelsRadio, setFourWheelsRadio] = useState(false);
      const [IN, setIN] = useState(true);
      const [OUT, setOUT] = useState(false);

      // Handle radio button clicks
      const handleIN = () => { setIN(true); setOUT(false); }
      const handleOUT = () => { setIN(false); setOUT(true); }
      const handleTwo = () => { setTwoWheelsRadio(true); setThreeWheelsRadio(false); setFourWheelsRadio(false); };
      const handleThree = () => { setTwoWheelsRadio(false); setThreeWheelsRadio(true); setFourWheelsRadio(false); };
      const handleFour = () => { setTwoWheelsRadio(false); setThreeWheelsRadio(false); setFourWheelsRadio(true); };

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

            // Filter by search term
            if (search) {
                  filteredVehicles = filteredVehicles.filter(vehicle => vehicle.plateNumber.toUpperCase().includes(search.toUpperCase()));
            }

            setDisplayVehicles(filteredVehicles);
      }, [twoWheelsRadio, threeWheelsRadio, fourWheelsRadio, allVehicles, IN, OUT, search]);

      // Handle Date Selection
      const handleDateSelection = async () => {
            const pastMinimumDate = new Date('2024-01-01').toISOString().split('T')[0];
            const { value: date } = await Swal.fire({
                  title: "Select Date",
                  input: "date",
                  inputAttributes: { required: true, min: pastMinimumDate },
                  showCancelButton: true,
                  confirmButtonText: "Submit",
            });

            if (date) {
                  const filteredVehicles = allVehicles.filter(vehicle => {
                        const vehicleDate = new Date(vehicle.startDate).toISOString().split('T')[0];
                        return vehicleDate === date;
                  });

                  setDisplayVehicles(filteredVehicles);
                  Swal.fire("Vehicles filtered by date", date);
            }
      };

      const handleEditPlateNumber = async (vehicle) => {

            const { value: newPlateNumber } = await Swal.fire({
                  title: 'Edit Plate Number',
                  input: 'text',
                  inputLabel: 'Enter new plate number',
                  inputPlaceholder: 'New Plate Number',
                  showCancelButton: true,
                  confirmButtonText: 'Save',
                  cancelButtonText: 'Cancel',
                  inputValidator: (value) => {
                        if (!value) {
                              return 'You need to enter a plate number!';
                        }
                  }
            });

            if (newPlateNumber) {
                  const plateNumberRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d-_]+$/;


                  // Check if the plate number is valid
                  if (!plateNumberRegex.test(newPlateNumber)) {
                        Swal.fire("Plate number must contain both letters and numbers. \n\n Example: ABC123");

                        return;
                  }
                  try {
                        const updatedVehicle = { plateNumber: newPlateNumber.toUpperCase() };
                        const response = await axios.put(`https://capstone-parking.onrender.com/vehicle/${vehicle._id}`, updatedVehicle);
                        console.log('Plate number updated successfully:', response.data);

                        // Update allVehicles and displayVehicles
                        setAllVehicles(prevVehicles => {
                              const updatedVehicles = prevVehicles.map(v => (v._id === vehicle._id ? { ...v, plateNumber: newPlateNumber.toUpperCase() } : v));
                              // Update displayVehicles based on the current filters
                              setDisplayVehicles(updatedVehicles);
                              return updatedVehicles; // Return updated vehicles for the state
                        });

                        Swal.fire({
                              title: 'Success!',
                              text: 'Plate number updated successfully!',
                              icon: 'success',
                        });
                  } catch (error) {
                        console.error('Error updating plate number:', error.message || error);
                        Swal.fire({
                              title: 'Error!',
                              text: 'Failed to update plate number. Please try again.',
                              icon: 'error',
                        });
                  }
            }
      };

      const manageParkout = (tt) => {
            setSelectedVehicle(tt);
            setShowPopup(true);
      };

      const [ifOverStay, setIfOverStay] = useState(false);

      const handleRemove = async () => {
            let vehicleUpdateData = {};
            const startDate = moment(selectedVehicle.startDate); // Get the start date from the selected vehicle
            const endDate = moment(); // Current time
            const duration = moment.duration(endDate.diff(startDate));

            const dayDifference = duration.days();
            const hoursDifference = duration.hours();
            const minutesDifference = duration.minutes();

            if ((dayDifference > 0 || hoursDifference > hoursLimit) && hoursLimit !== 0) {
                  setIfOverStay(true);
                  vehicleUpdateData = {
                        ...selectedVehicle,
                        extraCharges: overTimeFees,
                        endDate: endDate,
                        status: false
                  };

                  await axios.post("https://capstone-parking.onrender.com/earnings", {
                        currentDate: new Date().toISOString(),
                        earnings: overTimeFees
                  });
            } else {
                  setIfOverStay(false);
                  vehicleUpdateData = {
                        ...selectedVehicle,
                        endDate: endDate,
                        status: false
                  };
            }

            console.log("newvehicle here:", vehicleUpdateData);

            try {
                  await axios.put(`https://capstone-parking.onrender.com/vehicle/${selectedVehicle._id}`, vehicleUpdateData);
                  setShowPopup(false);
                  parkOutAlert();

                  // render the updates
                  setVehicles(prevVehicles =>
                        prevVehicles.filter(vehicle =>
                              vehicle._id != selectedVehicle._id

                        )
                  );
                  setAllVehicles(prevVehicles =>
                        prevVehicles.map(vehicle =>
                              vehicle._id === selectedVehicle._id ? vehicleUpdateData : vehicle
                        )
                  );

            } catch (error) {
                  console.log(error);
            }
      };

      const durationDisplay = () => {
            const startDate = moment(selectedVehicle.startDate);
            const endDate = moment();
            const duration = moment.duration(endDate.diff(startDate));

            const dayDifference = duration.days();
            const hoursDifference = duration.hours();
            const minutesDifference = duration.minutes();

            return dayDifference !== 0
                  ? `${dayDifference} days ${hoursDifference} hours and ${minutesDifference} mins`
                  : `${hoursDifference} hours and ${minutesDifference} mins`;
      };


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
      };

      const [startDate, setStartDate] = useState(new Date());
      const currentDate = moment();

      const duration = moment.duration(currentDate.diff(startDate));
      const dayDifference = duration.days();
      const hoursDifference = duration.hours();
      const minutesDifference = duration.minutes();

      const formatTime = (startDate) => {
            const startTime = moment(startDate);
            const endTime = moment();
            const duration = moment.duration(endTime.diff(startTime));

            const hours = Math.floor(duration.asHours());
            const minutes = duration.minutes() > 9 ? duration.minutes() : "0" + duration.minutes();
            return { hours, minutes };
      };

      const invoiceRef = useRef();

      useEffect(() => {
            const intervalId = setInterval(() => {
                  const updatedTimers = {};
                  vehicles.forEach((vehicle, index) => {
                        const { hours, minutes } = formatTime(vehicle.startDate);
                        updatedTimers[index] = { hours, minutes };
                  });
                  setTimers(updatedTimers);
            }, 60000);

            return () => clearInterval(intervalId);
      }, [allVehicles]);

      const isOvertime = (hours) => {
            return hours >= hoursLimit && hoursLimit != 0;
      };

      return (
            <>
                  <div className='mx-[9%] h-max-700:mt-[35vh] mt-[25vh] w-[80vw] text-deepBlue'>
                        <div className='flex font-bold gap-4 w-full'>
                              <div className='relative  border-4 shadow-2xl border-deepBlue bg-white min-w-[14vw] flex flex-col justify-center rounded-3xl h-fit gap-2 p-4 py-10'>
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
                                    <button onClick={handleDateSelection} className='m-4 h-12 bg-greenWich hover:scale-95 rounded-2xl p-2 px-4 text-white' >
                                          <FaFilter className='inline' /> MM/DD/YYYY
                                    </button>
                              </div>

                              <div className="border-4 overflow-y-auto min-h-[760px] max-h-[760px] mb-12  border-bloe w-[99%] relative bg-white mx-8 rounded-3xl  flex flex-col px-8 py-4 gap-6 items-center">

                                    <div className='flex mt-10 ml-12 items-center justify-center w-full'>
                                          <div className='flex items-center gap-4'>
                                                <input onChange={e => setSearch(e.target.value)} className=" w-[25vw] border-gray-500 py-2 px-4 rounded-2xl  font-bold text-xl text-center border-4 outline-8 outline-bloe placeholder-deepBlue/50" type="text" placeholder='Search by Plate Number' />
                                                <button onClick={() => { }} className='bg-bloe hover:scale-95 hover:brightness-125 text-white text-xl  font-bold py-2 px-8 rounded-2xl border-2 border-bloe shadow-xl'>Search</button>
                                          </div>
                                    </div>

                                    <table className='w-full text-center mt-16'>
                                          <thead>
                                                <tr className='border-b-4 border-deepBlue'>
                                                      <th className='border-r-4 border-deepBlue'>Ticket No.</th>
                                                      <th className='border-r-4 border-deepBlue'>Date</th>
                                                      <th className='border-r-4 border-deepBlue'>Plate No.</th>
                                                      <th className='border-r-4 border-deepBlue'>Category</th>
                                                      <th className='border-deepBlue'>Total Time</th>

                                                </tr>
                                          </thead>

                                          <tbody>
                                                {displayVehicles.map((vehicle, index) => {
                                                      const { hours, minutes } = timers[index] || formatTime(vehicle.startDate);
                                                      const overtime = isOvertime(hours);
                                                      return (
                                                            <tr key={index} className={`text-center h-10 ${overtime ? '' : ''}  `}>
                                                                  <td className='border-r-4 border-deepBlue'>{vehicle.ticketNumber}</td>
                                                                  < td className='border-r-4 border-deepBlue'>{moment(new Date(vehicle.startDate)).format('DD-MM-YY')}</td>
                                                                  <td className='border-r-4 border-deepBlue'>{vehicle.plateNumber}</td>
                                                                  <td className='border-r-4 border-deepBlue'>{vehicle.category}</td>
                                                                  <td className={`  border-deepBlue ${overtime ? 'text-[#892121]' : ''}`}>
                                                                        {`${hours}:${minutes} hours`}
                                                                  </td>


                                                            </tr>
                                                      )
                                                })}
                                          </tbody>
                                    </table>

                              </div>
                        </div>

                  </div>

                  {
                        showPopup && (
                              <div onClick={() => setShowPopup(false)} className='fixed w-screen h-screen bg-black/40 z-50'>
                                    <div className='fixed inset-0 flex items-center justify-center bg-deepBlue/40'>

                                          <div onClick={e => e.stopPropagation()} className={`relative bg-offWhite shadow-lg rounded-3xl flex flex-col gap-8 items-center p-20 `}>
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
                                                            <p>{durationDisplay()}</p>
                                                            <p>{selectedVehicle.status ? "Parked In" : "Parked Out"}</p>
                                                      </div>

                                                </div>

                                                <div className='flex my-auto items-center gap-6 '>
                                                      <div>
                                                            {
                                                                  (() => {
                                                                        const startDate = moment(selectedVehicle.startDate);
                                                                        const endDate = moment(); // Current time
                                                                        const duration = moment.duration(endDate.diff(startDate));
                                                                        const hoursDifference = duration.asHours(); // Get the total hours as a decimal

                                                                        return (hoursDifference >= hoursLimit && hoursLimit !== 0) ? (
                                                                              <div>
                                                                                    <p>Total Charge: <b> Php.{overTimeFees}.00</b> </p>
                                                                                    <p className='ml-24 font-bold'>(+ overstay)</p>
                                                                              </div>
                                                                        ) : "";
                                                                  })()
                                                            }
                                                      </div>

                                                      <button onClick={handleRemove} className='bg-pink hover:scale-95 border-4 border-bloe hover:bg-[#c73838] py-2 px-8 text-2xl font-bold rounded-2xl text-white'>Remove</button>
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