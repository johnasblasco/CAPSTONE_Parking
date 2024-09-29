import React, { useState, useEffect, useContext, useRef } from 'react';
import { myContext } from '../Home';
import { MdLocalPrintshop } from "react-icons/md";
import moment from 'moment';
import { FaFilter } from "react-icons/fa";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import PropagateLoader from 'react-spinners/PropagateLoader';
import axios from 'axios';

const Reports = () => {
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
            pricePerTicket,
            hoursLimit,
            overTimeFees,
      ] = useContext(myContext);

      const [getVehicles, getSetVehicles] = useState(allVehicles);
      const [twoWheelsRadio, setTwoWheelsRadio] = useState(false);
      const [threeWheelsRadio, setThreeWheelsRadio] = useState(false);
      const [fourWheelsRadio, setFourWheelsRadio] = useState(false);
      const [IN, setIN] = useState(false);
      const [OUT, setOUT] = useState(false);
      const [search, setSearch] = useState(0);

      const [timers, setTimers] = useState({});

      // Handle radio button clicks
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
                  getVehicles.forEach((vehicle, index) => {
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

            getSetVehicles(filteredVehicles);
      }, [twoWheelsRadio, threeWheelsRadio, fourWheelsRadio, allVehicles, IN, OUT]);

      // Search
      const handleSearch = () => {
            let filteredVehicles = allVehicles;
            if (search > 0) {
                  getSetVehicles(filteredVehicles.filter(vehicle => vehicle.ticketNumber.toString() === search.toString()));
            } else {
                  getSetVehicles(allVehicles); // Reset to all vehicles if search is empty
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

      // Print function
      const carPrint = () => {
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

            printWindow.document.open();
            printWindow.document.write(`
            <html>
                <head>
                    <title>Print Invoice</title>
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
                    ${invoiceContent}
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
                              {/* today earnings */}
                              <div className='h-max-700:p-16 flex gap-4 items-center pt-10 justify-center relative border-4 border-deepBlue shadow-2xl rounded-3xl bg-offWhite p-2 w-[30%]'>
                                    <p className='border-4 border-deepBlue font-bold absolute left-[-35px] top-2 bg-yeelow py-1 px-4 text-lg rounded-3xl'>Today's Earnings</p>
                                    <p className='h-max-700:text-3xl text-5xl font-bold text-deepBlue'>PHP</p>
                                    <p className='h-max-700:text-4xl text-6xl font-bold text-deepBlue'>00.00</p>
                              </div>

                              <div className='h-max-700:p-16 flex gap-4 items-center pt-10 justify-center relative border-4 border-deepBlue shadow-2xl rounded-3xl bg-offWhite p-2 w-[30%]'>
                                    <p className='border-4 border-deepBlue font-bold absolute left-[-35px] top-2 bg-yeelow py-1 px-4 text-lg rounded-3xl'>Total Earnings</p>
                                    <p className='h-max-700:text-3xl text-5xl font-bold text-deepBlue'>PHP</p>
                                    <p className='h-max-700:text-4xl text-6xl font-bold text-deepBlue'>00.00</p>
                              </div>

                              {/* Filter */}
                              <div className='h-max-700:p-16 flex flex-col gap-4 items-center pt-10 justify-center relative border-4 border-deepBlue shadow-2xl rounded-3xl bg-offWhite p-2 w-[25%]'>
                                    <p className='border-4 border-deepBlue font-bold absolute left-[-35px] top-2 bg-yeelow py-1 px-4 text-lg rounded-3xl'>Filter</p>
                                    <p className='text-3xl font-bold text-deepBlue'>By Date</p>
                                    <div className='flex'>
                                          <button className='m-4 h-12 bg-pink hover:scale-95 rounded-2xl p-2 px-4 text-white' >
                                                <FaFilter className='inline' /> MM/DD
                                          </button>
                                          <button className='m-4 h-12 bg-bloe hover:scale-95 rounded-2xl p-2 text-white'>
                                                <MdLocalPrintshop className='inline' /> Print Earnings
                                          </button>
                                    </div>
                              </div>
                        </div>

                        {/* flex filter and table */}
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
                              <div className=' border-4 border-deepBlue shadow-2xl max-h-[68vh] overflow-y-auto rounded-3xl bg-offWhite p-6 min-w-[70vw] mt-32'>
                                    <button className='m-4 h-12 bg-bloe hover:scale-95 rounded-2xl p-2 text-white' onClick={carPrint}>
                                          <MdLocalPrintshop className='inline' /> Print Report
                                    </button>
                                    <div ref={invoiceRef}>
                                          <table className='table-fixed border-collapse w-full'>
                                                <thead>
                                                      <tr>
                                                            <th className='border-2 border-deepBlue p-2'>Ticket Number</th>
                                                            <th className='border-2 border-deepBlue p-2'>Category</th>
                                                            <th className='border-2 border-deepBlue p-2'>Status</th>
                                                            <th className='border-2 border-deepBlue p-2'>In Time</th>
                                                            <th className='border-2 border-deepBlue p-2'>Out Time</th>
                                                            <th className='border-2 border-deepBlue p-2'>Duration</th>
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
                                                                        <td className='border-2 border-deepBlue p-2'>{vehicle.category}</td>
                                                                        <td className='border-2 border-deepBlue p-2'>{vehicle.status ? "In" : "Out"}</td>
                                                                        <td className='border-2 border-deepBlue p-2'>{moment(vehicle.startDate).format(' hh:mm A')}</td>
                                                                        <td className='border-2 border-deepBlue p-2'>{vehicle.endDate ? moment(vehicle.outTime).format(' hh:mm A') : '-'}</td>
                                                                        <td className='border-2 border-deepBlue p-2'>
                                                                              {

                                                                                    dayDifference > 0 ? `${dayDifference} days ${hoursDifference} hours ${minutesDifference} mins` : hoursDifference > 0 ? `${hoursDifference} hours  ${minutesDifference} mins` : `${minutesDifference} mins`
                                                                              }
                                                                        </td>
                                                                        <td className='border-2 border-deepBlue p-2'>{hoursDifference > hoursLimit ? `+${overTimeFees}.00` : '0.00'}</td>
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
