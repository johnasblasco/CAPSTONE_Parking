import { IoMdClose } from 'react-icons/io';
import { useState, useContext, useRef, useEffect } from 'react';
import { innerContext } from '../pages/Dashboard';
import moment from 'moment';
import axios from 'axios';
import Swal from 'sweetalert2';

const ParkIn = ({ companyName, parkingRules, pricePerTicket, twoWheels, threeAndFourWheels }) => {

      const invoiceRef = useRef();
      const [socket, vehicles, setVehicles, setShowParkIn, setShowParkOut, setDisplayTicket, setShowVehicleData, setSelectedVehicle, selectedVehicle] = useContext(innerContext);

      const [plateNo, setPlateNo] = useState("");
      const [selectedOption, setSelectedOption] = useState('');
      const [newVehicle, setNewVehicle] = useState({});
      const [myImg, setMyImg] = useState("");

      const handleOptionChange = (event) => {
            setSelectedOption(event.target.value);
      };

      useEffect(() => {
            axios.get("http://localhost:8000/upload")
                  .then(response => setMyImg(response.data))

      }, [])

      const handleButton = async () => {
            if (vehicles.filter((v) => v.category === "3 Wheels" || v.category === "4 Wheels").length >= threeAndFourWheels && (selectedOption === "3 Wheels" || selectedOption === "4 Wheels")) {
                  Swal.fire("Three and Four Wheels are full!");
                  setPlateNo("");
                  setShowParkIn(false);
                  return;
            }
            if (vehicles.filter((v) => v.category === "2 Wheels").length >= twoWheels && (selectedOption === "2 Wheels")) {
                  Swal.fire("Two Wheels are full!");
                  setPlateNo("");
                  setShowParkIn(false);
                  return;
            }

            console.log("ibbig sabihin meron pa?");
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


                  const vehicleData = {
                        ticketNumber: randomNumber,
                        startDate: now,
                        plateNumber: plateNo.toUpperCase(),
                        category: selectedOption,
                        endDate: null,
                        status: true,
                        extraCharges: 0
                  };

                  // Post the new vehicle to the server
                  await axios.post("http://localhost:8000/vehicle", vehicleData);


                  await axios.post("http://localhost:8000/earnings", {
                        currentDate: new Date().toISOString(),
                        earnings: pricePerTicket
                  })





                  // Set the new vehicle data in state
                  setNewVehicle(vehicleData);

                  // Print the receipt
                  handlePrint(vehicleData); // Pass the vehicle data directly

                  // Set display ticket
                  setDisplayTicket(randomNumber);

                  // Reset plateNo
                  setPlateNo("");

                  // Close parkIn
                  setShowParkIn(false);

            } catch (error) {
                  console.error("Error posting new vehicle:", error);
            }
      };

      const handlePrint = (vehicleData) => {
            if (!vehicleData || !vehicleData.ticketNumber || !vehicleData.startDate || !vehicleData.plateNumber) {
                  alert("Vehicle data is missing");
                  return;
            } else {
                  const printWindow = window.open('', '', 'height=600,width=400');

                  // Convert newlines in parkingRules to <br> tags
                  const formattedParkingRules = parkingRules.replace(/\n/g, '<br>');

                  if (printWindow) {
                        printWindow.document.open();
                        printWindow.document.write(`
                <html>
                <head>
                  <title>Parking Receipt</title>
                  <style>
                    * {
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
                    hr {
                      border: 1px solid gray;
                      margin: 22px 5px 5px;
                    }
                    .heading {
                      gap: 10px;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      margin: 0 4vw;
                      margin-bottom: 20px;
                    }
                    .heading p {
                      text-align: center;
                      font-size: 15px;
                      text-wrap: balance;
                    }
                    .heading img {
                      width: 50px;
                      height: 50px;
                    }
                    .leeg {
                      margin-top: 40px;
                    }
                    .leeg p {
                      margin-left: 20px;
                    }
                    .leeg .big {
                      margin-left: 20px;
                      font-size: 60px;
                      font-weight: bold;
                      letter-spacing: 10px;
                    }
                    .grid {
                      margin: 0px 20px;
                      text-align: center;
                      display: flex;
                      justify-content: space-evenly;
                    }
                    .plate {
                      display: flex;
                      flex-direction: column;
                      align-items: center;
                    }
                    .plate p {
                      margin-top: 20px;
                    }
                    .plate .mejo-malaki {
                      margin: 0;
                      padding: 0;
                      font-size: 25px;
                      font-weight: bold;
                    }
                    .footer {
                      padding : 10px;
                      margin-top: 20px;
                      text-align: center;
                    }
                  </style>
                </head>
                <body>
                  <hr />
                  <div class="heading">
                    <img src="/uploads/${myImg}"    alt="" />
                    <p>${companyName}</p>
                  </div>
          
                  <div class="leeg">
                    <p>Ticket No.</p>
                    <p class="big">${vehicleData.ticketNumber}</p>
                  </div>
          
                  <div class="grid">
                    <div class="left">
                      <p>Park in: <br />
                        <b>Php.${pricePerTicket}.00</b> <br />
                        <b>Paid</b>
                      </p>
                    </div>
          
                    <div class="right">
                      <p>Date: <br />
                        <b>${moment(vehicleData.startDate).format('MM / DD / YY')}</b> <br />
                        ${moment(vehicleData.startDate).format('h:mm A')}
                      </p>
                    </div>
                  </div>
          
                  <div class="plate">
                    <p>Plate Number:</p>
                    <p class="mejo-malaki">${vehicleData.plateNumber}</p>
                  </div>
          
                  <div class="footer">
                    <h6>Parking Rules:</h6>
                    <p>${formattedParkingRules}</p>
                  </div>
                  <br/>
                       <p style='margin-left:5px;'>  ------------------------------------------------------------------- </p>
             
                  <footer class="footer">
                  <h4>Thank You for Parking with us!</p>
                  <p>We look forward to seeing you again!</p>
                  </footer>
                              
                              <hr/>
                </body>
                </html>
              `);
                        printWindow.document.close();
                        printWindow.focus();
                        printWindow.print();
                  } else {
                        console.error("Failed to open print window");
                  }
            }
      };

      return (
            <>
                  <div onClick={() => setShowParkIn(false)} className='fixed w-screen h-screen bg-black/40 z-10'>
                        <div className='fixed inset-0 flex items-center justify-center bg-deepBlue/40'>
                              <div onClick={e => e.stopPropagation()} className={`relative text-bloe border-4 border-darkBloe bg-offWhite shadow-lg rounded-2xl flex flex-col gap-8 items-center p-16 w-fit`}>
                                    <IoMdClose onClick={() => setShowParkIn(false)} className='text-5xl absolute top-4 right-4 cursor-pointer' />
                                    <h2 className='text-3xl font-bold mb-4 '>Parking in</h2>

                                    <div className='flex w-full gap-6 items-center'>
                                          <p className='text-xl'>Wheeler</p>
                                          <div className='flex justify-center gap-12 w-full'>
                                                <label htmlFor="2" className='text-lg flex item-center gap-1'>
                                                      <input
                                                            className='m-1 h-8 w-8 placeholder-black/50'
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
                                                            className='m-1 h-8 w-8'
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
                                                            className='m-1 h-8 w-8'
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

                                    <input
                                          type="text"
                                          className='border-4 border-gray-500 rounded-md p-4 w-96 text-center'
                                          placeholder='Plate Number'
                                          value={plateNo}
                                          onChange={(e) => setPlateNo(e.target.value)}
                                    />

                                    <button className='bg-darkBloe hover:bg-bloe text-white p-4 rounded-lg w-full' onClick={handleButton}>Park</button>
                              </div>
                        </div>
                  </div>
            </>
      );
};

export default ParkIn;
