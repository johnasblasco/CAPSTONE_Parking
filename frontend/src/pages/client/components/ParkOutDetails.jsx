import { IoMdClose } from 'react-icons/io';
import { useEffect, useState, useContext } from 'react';
import { innerContext } from '../pages/Dashboard';
import moment from 'moment';
import axios from 'axios';

// PRINT? 
import React, { useRef } from 'react';

const ParkOutDetails = () => {

      // STEP1: make a refference
      const invoiceRef = useRef();

      const [vehicles, setVehicles, showToast, setShowToast, setShowParkIn, setShowParkOut, setDisplayTicket, setShowVehicleData, setSelectedVehicle, selectedVehicle, todayEarn, setTodayEarn, totalEarnings, setTotalEarnings, earnings, setEarnings] = useContext(innerContext)

      const startDate = moment(selectedVehicle.startDate);
      const currentDate = moment();

      // Calculate the difference in hours and minutes
      const duration = moment.duration(currentDate.diff(startDate));

      const dayDifference = duration.days();
      const hoursDifference = duration.hours();
      const minutesDifference = duration.minutes();

      console.log("Difference in hours:", hoursDifference);
      console.log("Difference in minutes:", minutesDifference);
      console.log("Difference in Days:", dayDifference);

      const handleRemove = async () => {

            const vehicleUpdateData = {
                  ...selectedVehicle,
                  endDate: moment(),
                  status: false
            };

            try {
                  await axios.put(`http://localhost:8000/vehicle/${selectedVehicle._id}`, vehicleUpdateData)


                  // render the updates
                  setVehicles(prevVehicles =>
                        prevVehicles.filter(vehicle =>
                              vehicle._id != selectedVehicle._id

                        )
                  );



                  setShowVehicleData(false)
                  setShowToast("out")
                  handlePrint()


            } catch (error) {
                  console.log(error)
            }


      }

      //STEP 2: Print Function here
      const handlePrint = () => {
            const printWindow = window.open('', '', 'height=600,width=400');
            const invoiceContent = invoiceRef.current.innerHTML;

            printWindow.document.open();
            printWindow.document.write(`
                  <html>
                  <head>
                  <title>Invoice</title>
                  <style>
                        body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 0;
                        width: 3in; /* Set width to 3 inches */
                        overflow: hidden; /* Hide overflow content */
                        }
                        table {
                        width: 100%;
                        border-collapse: collapse;
                        }
                        th, td {
                        border: 1px solid black;
                        padding: 4px;
                        text-align: left;
                        }
                        th {
                        background-color: #f2f2f2;
                        }
                        @media print {
                        body {
                        margin: 0;
                        width: 3in; /* Ensure the width is 3 inches for printing */
                        }
                        
                        }
                  </style>
                  </head>
                  <body>
                  ${invoiceContent}
                  </body>
                  </html>
                  `);
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
      };

      return (
            <>
                  <div className='fixed w-screen h-screen bg-black/40 z-50'>
                        <div className='fixed inset-0 flex items-center justify-center bg-black/40'>

                              <div className={`relative lg:min-w-[45vw] md:max-w-[20vw] sm:max-w-[10vw] bg-[#D9D9D9] shadow-lg rounded-2xl flex flex-col gap-8  p-8 w-full h-5/6`}>
                                    <IoMdClose onClick={() => setShowVehicleData(false)} className='text-3xl absolute top-2 right-2 cursor-pointer' />

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

                  {/*STEP 3: RECEIPT HERE HIDDEN */}
                  < div ref={invoiceRef} className="mt-4 hidden" >
                        <table className="border-2 border-black w-full">
                              <thead>
                                    <tr>
                                          <th className="p-2">No</th>
                                          <th className="p-2">Description</th>
                                          <th className="p-2">Amount</th>
                                    </tr>
                              </thead>
                              <tbody>
                                    <tr>
                                          <td className="p-2">1</td>
                                          <td className="p-2">Service Fee</td>
                                          <td className="p-2">$200</td>
                                    </tr>
                              </tbody>
                        </table>
                  </div >
            </>
      )
}

export default ParkOutDetails