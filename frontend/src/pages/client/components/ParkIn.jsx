import { IoMdClose } from 'react-icons/io';
import { useState, useContext } from 'react';
import { innerContext } from '../pages/Dashboard';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';
import axios from 'axios';

// PRINT? 
import React, { useRef } from 'react';

const ParkIn = () => {
      // STEP1: make a refference
      const invoiceRef = useRef();


      const [socket, vehicles, setVehicles, showToast, setShowToast, setShowParkIn, setShowParkOut, setDisplayTicket, setShowVehicleData, setSelectedVehicle, selectedVehicle, todayEarn, setTodayEarn, totalEarnings, setTotalEarnings, earnings, setEarnings] = useContext(innerContext);
      const [plateNo, setPlateNo] = useState("");
      const [selectedOption, setSelectedOption] = useState('');


      //just for the print 
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
                  setShowParkIn(false)
                  toast.error('3 and 4 wheels is Full!');
                  return
            }
            if (vehicles.filter((v) => v.category === "2 Wheels").length >= 53 && selectedOption === "2 Wheels") {
                  console.log("sir puno na 2 wheels kupal ka ba")
                  // Reset plateNo
                  setPlateNo("");

                  // close parkIn
                  setShowParkIn(false);
                  toast.error('2 wheels is Full!');
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


                  // Post the new vehicle to the server
                  await axios.post("http://localhost:8000/vehicle", newVehicle)



                  //put the new User in the State so that I can get the date and put it in the receipt
                  setNewVehicle(newVehicle)

                  // Update the earnings to the server
                  const updateEarnings = {
                        currentDate: new Date(),
                        totalEarnings: (totalEarnings + 25),
                        todayEarnings: (todayEarn + 25),
                  }
                  // Make API call to update earnings
                  const response = await axios.put(`http://localhost:8000/earnings/${earnings._id}`, updateEarnings);

                  // Update the earnings state with the new data        



                  // print first lagi para iwas bug
                  //print dito
                  handlePrint()


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
            if (!invoiceRef.current) {
                  console.error("Invoice reference is missing");
                  return;
            }

            const printWindow = window.open('', '', 'height=600,width=400');
            const invoiceContent = invoiceRef.current.innerHTML;

            if (printWindow) {
                  printWindow.document.open();
                  printWindow.document.write(`
                <html>
                <head>
                  <title>Parking Receipt</title>
                  <style>
                    *{
                      margin: 0;
                      padding: 0;
                  }
                    body {
                      text-wrap: balance;
                      border: 1px solid black;
                      font-family: Arial, sans-serif;
                  
                      width: 3in;
                      overflow: hidden;
                      box-sizing: border-box;
                    }
                      p {
                      font-size: 12px;
                    }
                    @media print {
                      body {
                        width: 3in;
                        margin: 0;
                      }
                    }
                      hr{
                        border: 1px solid gray;
                        margin: 22px 5px 5px;
                      }
                        

                    .heading {
                      gap: 10px;
                      display: flex;
                      align-items: center;
                      justify-content: space-center;
                      margin: 0 4vw;
                      margin-bottom: 20px;
                    }
                   .heading p{
                     text-align: center;
                      font-size: 15px; 
                      text-wrap: balance;
                  }
                   .heading img {
                        width: 50px;
                        height: 50px;
                        border: 1px solid black;
                   }
                  .leeg{margin-top: 40px;}
                  .leeg p{
      
                        margin-left: 20px;
                  }
                  .leeg .big {
                      margin-left: 20px;
                      font-size: 60px;
                      font-weight: bold;
                      letter-spacing: 10px;
                    }

                  .grid{
                        margin: 0px 20px;
                        text-align: center;
                        display: flex;
                        justify-content: space-evenly;
                  }
                  
                  .plate{
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                  }
                  .plate p{
                  margin-top: 20px; 
                        }
                  .plate .mejo-malaki{
                        margin: 0; 
                        padding: 0;
                      font-size: 25px;
                      font-weight: bold;
                  }
                    
                  .footer{
                        margin-top: 20px;
                        text-align: center;
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
            } else {
                  console.error("Failed to open print window");
            }
      };



      return (
            <>

                  <div className='fixed w-screen h-screen bg-black/40 z-10'>
                        <div className='fixed inset-0 flex items-center justify-center bg-deepBlue/40'>
                              <div className={`relative bg-offWhite shadow-lg rounded-2xl flex flex-col gap-4 items-center p-8 w-fit `}>
                                    <IoMdClose onClick={() => setShowParkIn(false)} className='text-4xl absolute top-4 right-4 cursor-pointer' />

                                    <h2 className='text-3xl font-bold mb-4 '>Parking in</h2>

                                    <div className='flex w-full gap-6 items-center'>
                                          <p>Wheeler</p>
                                          <div className='flex justify-center gap-12 w-full'>
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
                                                      2
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
                                                      3
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
                                                      4
                                                </label>
                                          </div>
                                    </div>

                                    <div className='flex gap-8 items-center '>
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
                  < div ref={invoiceRef} className="hidden" >

                        <hr />
                        <div className='heading'>
                              <img src="/logo.jpeg" alt="" />
                              <p>immaculate Conception Parish Cathedral and Minor Basilica, <b>Diose of Malolos</b> </p>
                        </div>

                        <div className='leeg'>
                              <p>Ticket No.</p>
                              <p className='big'>{newVehicle.ticketNumber}</p>
                        </div>

                        <div className='grid'>
                              <div className='left'>
                                    <p>Park in: <br />
                                          <b>Php. 25.00</b> <br />
                                          <b>Paid</b>
                                    </p>
                              </div>

                              <div className='right'>
                                    <p>Date: <br />
                                          <b>{moment(newVehicle.startDate).format('MM / DD / YY')}</b> <br />
                                          {moment(newVehicle.startDate).format('h:mm A')}
                                    </p>
                              </div>
                        </div>

                        <div className='plate'>
                              <p>Plate:</p>
                              <p className='mejo-malaki'>{newVehicle.plateNumber}</p>
                        </div>

                        {/* footer na */}
                        <div className='footer'>
                              <p>Paunawa.</p>
                              <p>Walang pananagutan ang Parokya sa anumang mawawala o masisira habang nakaparada sa patio <br /><br />
                                    Ang na iyo ang magsisilbing<b>Acknowledgement Receipt</b> ng Parokya. <br /><br />
                                    Sa pagkawala ng resibo o ticket na ito. Kailangan ipakita ang rihistro ng sasakyan at magbabayad ng <b>Php 50.00</b>
                                    para sa kaukulang multa. <br /><br /> Mangyaring <b>iwanan itong resibo</b> o ticket paglabas ng paradahan ng Parokya.
                              </p>

                        </div>
                        <hr />
                  </div >


            </>
      );
};

export default ParkIn;
