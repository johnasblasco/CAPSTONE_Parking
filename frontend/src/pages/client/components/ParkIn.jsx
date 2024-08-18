import { IoMdClose } from 'react-icons/io';
import { useState, useContext } from 'react';
import { innerContext } from '../pages/Dashboard';
import axios from 'axios';

// PRINT? 
import React, { useRef } from 'react';

const ParkIn = () => {
      // STEP1: make a refference
      const invoiceRef = useRef();


      const [vehicles, setVehicles, showToast, setShowToast, setShowParkIn, setShowParkOut, setDisplayTicket, setShowVehicleData, setSelectedVehicle, selectedVehicle, todayEarn, setTodayEarn, totalEarnings, setTotalEarnings, earnings, setEarnings] = useContext(innerContext);
      const [plateNo, setPlateNo] = useState("");
      const [selectedOption, setSelectedOption] = useState('');


      const [newVehicle, setNewVehicle] = useState({});

      const handleOptionChange = (event) => {
            setSelectedOption(event.target.value);
      };

      const handleButton = async () => {

            if (vehicles.filter((v) => v.category === "3 Wheels" || v.category === "4 Wheels").length >= 48 && (selectedOption === "3 Wheels" || selectedOption === "4 Wheels")) {
                  console.log("sir puno na 3/4 wheels kupal ka ba")
                  // Reset plateNo
                  setPlateNo("");

                  // close parkIn
                  setShowParkIn(false);
                  return
            }
            if (vehicles.filter((v) => v.category === "2 Wheels").length >= 53 && selectedOption === "2 Wheels") {
                  console.log("sir puno na 2 wheels kupal ka ba")
                  // Reset plateNo
                  setPlateNo("");

                  // close parkIn
                  setShowParkIn(false);
                  return
            }


            console.log("ibbig sabihin meron pa?")
            const now = new Date();
            let randomNumber = Math.floor(Math.random() * 900000) + 100000;

            // Check if randomNumber is already in use
            let meronba = vehicles.filter((vehicle) => vehicle.ticketNumber === randomNumber);

            // Generate a unique random number
            while (meronba.length > 0) {
                  randomNumber = Math.floor(Math.random() * 900000) + 100000;
                  meronba = vehicles.filter((vehicle) => vehicle.ticketNumber === randomNumber);
            }

            try {
                  const newVehicle = {
                        ticketNumber: randomNumber,
                        startDate: now,
                        plateNumber: plateNo.toUpperCase(),
                        category: selectedOption,
                        endDate: null,
                        status: true
                  };
                  //put the new User in the State so that I can get the date and put it in the receipt
                  setNewVehicle(newVehicle)
                  console.log(newVehicle)


                  // print first
                  //print dito
                  handlePrint()

                  // Post the new vehicle to the server
                  await axios.post("http://localhost:8000/vehicle", newVehicle);

                  // Update the earnings to the server
                  const updateEarnings = {
                        currentDate: new Date(),
                        totalEarnings: (totalEarnings + 20),
                        todayEarnings: (todayEarn + 20),
                  }
                  // Make API call to update earnings
                  const response = await axios.put(`http://localhost:8000/earnings/${earnings._id}`, updateEarnings);

                  // Update the earnings state with the new data        
                  setTotalEarnings(updateEarnings.totalEarnings);
                  setTodayEarn(updateEarnings.todayEarnings);

                  // eto lang gagawin to render new vehicle
                  setVehicles((prevVehicles) => [...prevVehicles, newVehicle]);

                  // Set display ticket
                  setDisplayTicket(randomNumber);

                  // Reset plateNo
                  setPlateNo("");

                  // close parkIn
                  setShowParkIn(false);

                  // show ung Toast in
                  setShowToast("in");


            } catch (error) {
                  console.error("Error posting new vehicle:", error);
            }
      };

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
                              <div className={`relative lg:min-w-[45vw] md:max-w-[20vw] sm:max-w-[10vw] bg-[#D9D9D9] shadow-lg rounded-2xl flex flex-col gap-8 items-center p-8 w-full h-5/6`}>
                                    <IoMdClose onClick={() => setShowParkIn(false)} className='text-3xl absolute top-2 right-2 cursor-pointer' />

                                    <h2 className='text-3xl font-bold mb-4 '>Parking in</h2>

                                    <div className='flex gap-12'>
                                          <label htmlFor="2" className='text-lg flex item-center gap-1'>
                                                <input
                                                      className=' m-1 h-6 w-6 placeholder-black/50 '
                                                      type="radio"
                                                      id="2"
                                                      name="parkingOption"
                                                      value="2 Wheels"
                                                      checked={selectedOption === '2 Wheels'}
                                                      onChange={handleOptionChange}
                                                />
                                                2-Wheeler
                                          </label>

                                          <label htmlFor="3" className='text-lg flex item-center gap-1'>
                                                <input
                                                      className='m-1 h-6 w-6'
                                                      type="radio"
                                                      id="3"
                                                      name="parkingOption"
                                                      value="3 Wheels"
                                                      checked={selectedOption === '3 Wheels'}
                                                      onChange={handleOptionChange}
                                                />
                                                3-Wheeler
                                          </label>

                                          <label htmlFor="4" className='text-lg flex item-center gap-1'>
                                                <input
                                                      className='m-1 h-6 w-6'
                                                      type="radio"
                                                      id="4"
                                                      name="parkingOption"
                                                      value="4 Wheels"
                                                      checked={selectedOption === '4 Wheels'}
                                                      onChange={handleOptionChange}
                                                />
                                                4-Wheeler
                                          </label>
                                    </div>

                                    <div className='flex  gap-8 items-center '>
                                          <label htmlFor="plateNo">Plate No. </label>
                                          <input required type="text" className='rounded-xl placeholder-black/50  py-3 px-8 bg-[#D1CBC2] outline-[#53AC5C] text-lg' placeholder='ILY-143' onChange={(e) => setPlateNo(e.target.value)} />
                                    </div>

                                    <button onClick={handleButton} className='mt-auto px-16 py-3 mb-10 bg-[#53AC5C] hover:bg-[#408547] text-white font-bold text-3xl rounded-2xl'>
                                          Park
                                    </button>
                              </div>
                        </div>
                  </div >

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
      );
};

export default ParkIn;
