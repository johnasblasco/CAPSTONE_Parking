import React, { useState, useEffect, useContext, useRef } from 'react';
import { myContext } from '../Home';
import { MdLocalPrintshop } from "react-icons/md";
import moment from 'moment';
import { FaFilter } from "react-icons/fa";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import PropagateLoader from 'react-spinners/PropagateLoader';
import axios from 'axios';
import Swal from 'sweetalert2';

const Reports = () => {

      const [currentUser, setCurrentUser] = useState("eyy");
      const [todaysEarnings, setTodaysEarnings] = useState(0);
      const [allEarnings, setAllEarnings] = useState([]);
      const [selectedDateEarnings, setSelectedDateEarnings] = useState(0);
      const [selectedDate, setSelectedDate] = useState(null);
      const [todaysVehicles, setTodaysVehicles] = useState([]);
      const [selectedDateVehicle, setSelectedDateVehicle] = useState([]);
      const [getVehicles, setGetVehicles] = useState([]);

      useEffect(() => {
            const fetchEarnings = async () => {
                  const res = await axios.get('https://capstone-parking.onrender.com/earnings');
                  setAllEarnings(res.data);

                  // Calculate today's earnings
                  const today = new Date().toISOString().split('T')[0];
                  const todaysData = res.data.filter(earning => earning.currentDate.startsWith(today));
                  setTodaysEarnings(todaysData.reduce((sum, earning) => sum + earning.earnings, 0));

                  // Fetch today's vehicles
                  await fetchSelectedVehicles(today); // Fetch vehicles for today
            };
            fetchEarnings();
      }, []);

      const fetchSelectedVehicles = async (date) => {
            try {
                  const res = await axios.get('https://capstone-parking.onrender.com/vehicle');
                  // Check if vehicles have startDate and filter them
                  const filteredVehicles = res.data.filter(vehicle => {
                        if (vehicle.startDate) {
                              const vehicleDate = new Date(vehicle.startDate).toISOString().split('T')[0]; // Extract the date part

                              return vehicleDate === date; // Compare with selected date
                        }
                        return false; // Skip if startDate is missing
                  });

                  // Set today's vehicles state based on the selected date
                  setTodaysVehicles(filteredVehicles.length); // Set today's vehicles to the count of filtered vehicles
                  setSelectedDateVehicle(filteredVehicles); // Keep the filtered vehicles for the selected date
                  setGetVehicles(filteredVehicles); // Keep the filtered vehicles for the selected date so that it can be used in the table
            } catch (error) {
                  console.error('Error fetching vehicles:', error);
            }
      };

      useEffect(() => {
            axios.get('https://capstone-parking.onrender.com/user')
                  .then(response => {
                        const currentUser = response.data.find(user => user.login === true);
                        setCurrentUser(currentUser.name);
                  })
                  .catch(error => {
                        console.error('Error fetching user:', error);
                  });
      }, []);



      const handleDateSelection = async () => {
            const pastMinimumDate = new Date('2024-01-01').toISOString().split('T')[0];

            const { value: date } = await Swal.fire({
                  title: "Select Date",
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
                  const earningsForSelectedDate = filteredEarnings.reduce((sum, earning) => sum + earning.earnings, 0);

                  // Set the selected date earnings
                  setTodaysEarnings(earningsForSelectedDate); // This updates today's earnings display
                  setSelectedDateEarnings(earningsForSelectedDate);
                  setSelectedDate(date);

                  // Fetch vehicles for the selected date
                  await fetchSelectedVehicles(date);

                  Swal.fire("SELECTED DATE", date);
            }
      };




      const invoiceRef = useRef();
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
            ticket34,
            ticket2,
            hoursLimit,
            overTimeFees,
      ] = useContext(myContext);

      const [search, setSearch] = useState(0);

      const [timers, setTimers] = useState({});

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

      // Update timers every minute
      useEffect(() => {
            const intervalId = setInterval(() => {
                  const updatedTimers = {};
                  selectedDateVehicle.forEach((vehicle, index) => {
                        const startDate = moment(vehicle.startDate);
                        const duration = moment().diff(startDate, 'minutes'); // Calculate duration in minutes
                        const hours = Math.floor(duration / 60);
                        const minutes = duration % 60;
                        updatedTimers[index] = { hours, minutes };
                  });
                  setTimers(updatedTimers);
            }, 60000); // Update every minute

            return () => clearInterval(intervalId);
      }, [getVehicles]);

      // Update table based on radio button selection
      useEffect(() => {
            let filteredVehicles = selectedDateVehicle;

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

            setGetVehicles(filteredVehicles);
      }, [twoWheelsRadio, threeWheelsRadio, fourWheelsRadio, allVehicles, IN, OUT]);

      // Search
      const handleSearch = () => {
            let filteredVehicles = selectedDateVehicle;
            if (search > 0) {
                  setGetVehicles(filteredVehicles.filter(vehicle => vehicle.ticketNumber.toString() === search.toString()));
            } else {
                  setGetVehicles(allVehicles); // Reset to all vehicles if search is empty
            }
      };

      if (!allVehicles || allVehicles.length === 0) {
            return (
                  <PropagateLoader
                        color="#ff5400"
                        size={30}
                        className='absolute top-[50dvh] left-[50dvw] w-fit'
                  />
            );
      }

      // Earnings Print function
      const earningsPrint = () => {
            if (!invoiceRef.current) {
                  console.error("Invoice reference is missing");
                  return;
            }

            const printWindow = window.open('', '', 'height=842,width=595');
            const invoiceContent = invoiceRef.current.innerHTML;

            if (!printWindow) {
                  console.error("Failed to open print window");
                  return;
            }

            // Determine the display date
            const displayDate = selectedDate ? moment(selectedDate).format('MMMM Do YYYY') : 'Today';

            // Structure the earnings and vehicle information
            const earningsDetails = `
          <div style="padding: 20px; font-family: Arial, sans-serif;">
            <h1 style="text-align: center;">Daily Reports</h1>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; margin-left:10px">
              <tr>
                <th style="border: 1px solid black; padding: 8px; text-align: left;">Printed By</th>
                <td style="border: 1px solid black; padding: 8px;">ADMIN</td>
              </tr>
              <tr>
                <th style="border: 1px solid black; padding: 8px; text-align: left;">Total Earnings</th>
                <td style="border: 1px solid black; padding: 8px;">PHP ${todaysEarnings}.00</td>
              </tr>
              <tr>
                <th style="border: 1px solid black; padding: 8px; text-align: left;">Selected Date</th>
                <td style="border: 1px solid black; padding: 8px;">${displayDate}</td>
              </tr>
            </table>
            ${invoiceContent}
          </div>
      `;

            printWindow.document.open();
            printWindow.document.write(`
          <html>
            <head>
              <title>Print Earnings Report</title>
              <style>
                @media print {
                  @page {
                    size: A4;
                    margin: 20mm;
                  }
                  body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                  }
                  table {
                    width: 100%;
                    border-collapse: collapse;
                  }
                  th, td {
                    border: 1px solid black;
                    padding: 8px;
                    text-align: center;
                  }
                  th {
                    background-color: #f2f2f2;
                  }
                }
              </style>
            </head>
            <body>
              ${earningsDetails}
              <script>
                window.onload = function() {
                  window.print();
                };
              </script>
            </body>
          </html>
      `);
            printWindow.document.close();
            printWindow.focus();
      };



      return (
            <>
                  <div className='mx-[10%] h-max-700:mt-[35vh] mt-[25vh] w-[82vw] text-deepBlue'>
                        {/* EARNINGS */}
                        <div className='flex justify-between ml-[3%] w-[75vw] h-[20vh]'>
                              {/* today's vehicle */}
                              <div className='h-max-700:p-16 flex gap-4 items-center pt-10 justify-center relative border-4 border-deepBlue shadow-2xl rounded-3xl bg-white p-2 w-[30%]'>
                                    <p className='border-4 border-deepBlue font-bold absolute left-[-35px] top-2 bg-yeelow py-1 px-4 text-lg rounded-3xl'>Today's Vehicle</p>
                                    <p className='h-max-700:text-4xl text-6xl font-bold text-deepBlue'>{todaysVehicles}</p>
                              </div>
                              {/* today earnings */}
                              <div className='h-max-700:p-16 flex gap-4 items-center pt-10 justify-center relative border-4 border-deepBlue shadow-2xl rounded-3xl bg-white p-2 w-[30%]'>
                                    <p className='border-4 border-deepBlue font-bold absolute left-[-35px] top-2 bg-yeelow py-1 px-4 text-lg rounded-3xl'>Today's Earnings</p>
                                    <p className='h-max-700:text-3xl text-5xl font-bold text-deepBlue'>PHP</p>
                                    <p className='h-max-700:text-4xl text-6xl font-bold text-deepBlue'>{todaysEarnings}.00</p>
                              </div>

                              {/* Filter */}
                              <div className='font-bold h-max-700:p-16 flex flex-col gap-4 items-center pt-10 justify-center relative border-4 border-deepBlue shadow-2xl rounded-3xl bg-white p-2 w-[25%]'>
                                    <p className='border-4 border-deepBlue font-bold absolute left-[-40px] top-2 bg-yeelow py-1 px-4 text-lg rounded-3xl'>Filter Earnings</p>
                                    <p className='text-3xl font-bold text-deepBlue'>By Date</p>
                                    <div className='flex'>
                                          <button onClick={handleDateSelection} className='m-4 h-12 bg-greenWich hover:scale-95 rounded-2xl p-2 px-4 text-white' >
                                                <FaFilter className='inline mr-2' /> MM/DD
                                          </button>
                                          <button onClick={earningsPrint} className='font-extrabold m-4 h-12 bg-bloe hover:scale-95 rounded-2xl p-2 text-white'>
                                                <MdLocalPrintshop className='inline text-2xl' /> Print Reports
                                          </button>
                                    </div>
                              </div>
                        </div>

                        {/* flex filter and table */}
                        <div className='flex font-bold gap-4 w-full mb-14'>
                              {/* filter */}
                              <div className='relative mt-16 border-4 shadow-2xl border-deepBlue bg-white min-w-[14vw] flex flex-col justify-center rounded-3xl h-fit gap-2 p-4 py-10'>
                                    <p className='flex border-4 border-deepBlue absolute left-[-35px] top-2 font-bold bg-yeelow py-1 px-12 text-lg rounded-3xl'><FaFilter />Filter Vehicle</p>

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
                                    <div className='flex flex-col mt-12'>
                                          <input
                                                type="number"
                                                className='w-full h-12 border-2 border-gray-300 rounded-2xl px-4'
                                                placeholder='Search by Ticket Number'
                                                onChange={(e) => setSearch(e.target.value)}
                                          />
                                          <button
                                                className='mt-4 h-12 bg-deepBlue rounded-2xl hover:scale-95 hover:brightness-125 text-white'
                                                onClick={handleSearch}
                                          >
                                                Search
                                          </button>
                                    </div>
                              </div>

                              {/* Table */}
                              <div className=' relative border-4 border-deepBlue shadow-2xl max-h-[68vh] overflow-y-auto rounded-3xl bg-white p-6 max-w-[63vw] mt-16'>

                                    <div ref={invoiceRef} className='mt-12'>
                                          <table className='table-fixed border-collapse w-full'>
                                                <thead>
                                                      <tr>
                                                            <th className='border-2 border-deepBlue p-2'>Ticket Number</th>
                                                            <th className='border-2 border-deepBlue p-2'>Plate Number</th>
                                                            <th className='border-2 border-deepBlue p-2'>Category</th>
                                                            <th className='border-2 border-deepBlue p-2'>Status</th>
                                                            <th className='border-2 border-deepBlue p-2'>In Time</th>
                                                            <th className='border-2 border-deepBlue p-2'>Out Time</th>
                                                            <th className='border-2 border-deepBlue p-2'>Duration</th>
                                                            <th className='border-2 border-deepBlue p-2'>Charges</th>
                                                            <th className='border-2 border-deepBlue p-2'>Extra Charges</th>
                                                      </tr>
                                                </thead>
                                                <tbody>
                                                      {getVehicles.map((vehicle, index) => {
                                                            const startDate = moment(vehicle.startDate);
                                                            const endDate = moment(vehicle.endDate);
                                                            const currentDate = moment();

                                                            let duration;
                                                            // if status OUT 
                                                            vehicle.status ? duration = moment.duration(currentDate.diff(startDate)) : duration = moment.duration(endDate.diff(startDate))

                                                            // if status IN then Calculate the difference in hours and minutes


                                                            const dayDifference = duration.days();
                                                            const hoursDifference = duration.hours();
                                                            const minutesDifference = duration.minutes();

                                                            return (
                                                                  <tr key={index} className='text-center'>
                                                                        <td className='border-2 border-deepBlue p-2'>{vehicle.ticketNumber}</td>
                                                                        <td className='border-2 border-deepBlue p-2'>{vehicle.plateNumber}</td>
                                                                        <td className='border-2 border-deepBlue p-2'>{vehicle.category}</td>
                                                                        <td className='border-2 border-deepBlue p-2'>{vehicle.status ? "In" : "Out"}</td>
                                                                        <td className='border-2 border-deepBlue p-2'>{moment(vehicle.startDate).format(' hh:mm A')}</td>
                                                                        <td className='border-2 border-deepBlue p-2'>{vehicle.endDate ? moment(vehicle.endDate).format(' hh:mm A') : '-'}</td>
                                                                        <td className='border-2 border-deepBlue p-2'>
                                                                              {
                                                                                    dayDifference > 0 ? `${dayDifference} days ${hoursDifference} hours ${minutesDifference} mins` : hoursDifference > 0 ? `${hoursDifference} hours  ${minutesDifference} mins` : `${minutesDifference} mins`
                                                                              }
                                                                        </td>

                                                                        <td className='border-2 border-deepBlue p-2'>{vehicle.charges}</td>
                                                                        <td className='border-2 border-deepBlue p-2'>{hoursDifference > hoursLimit && hoursLimit != 0 ? `+${overTimeFees}.00` : '0.00'}</td>
                                                                  </tr>
                                                            )
                                                      })
                                                      }
                                                </tbody>
                                          </table>
                                    </div>
                              </div>
                        </div>


                  </div>
            </>
      );
};

export default Reports;
