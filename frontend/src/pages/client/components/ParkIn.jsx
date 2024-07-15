import { IoMdClose } from 'react-icons/io';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ParkIn = ({ setShowParkIn }) => {
      const [plateNo, setPlateNo] = useState("");
      const [selectedOption, setSelectedOption] = useState('');

      const handleOptionChange = (event) => {
            setSelectedOption(event.target.value);
      };

      const handleButton = async () => {
            const now = new Date();
            let randomNumber = Math.floor(Math.random() * 900000) + 100000;

            let vehicles;
            try {
                  // Fetch all vehicles from the server
                  const response = await axios.get("http://localhost:8000/vehicle");
                  vehicles = response.data;
            } catch (error) {
                  console.error("Error fetching vehicles:", error);
                  return;
            }

            // Check if randomNumber is already in use
            let meronba = vehicles.filter((vehicle) => vehicle.ticketNumber === randomNumber);

            // Ensure randomNumber is unique
            while (meronba.length > 0) {
                  randomNumber = Math.floor(Math.random() * 900000) + 100000;
                  meronba = vehicles.filter((vehicle) => vehicle.ticketNumber === randomNumber);
            }

            try {
                  const newVehicle = {
                        ticketNumber: randomNumber,
                        startDate: now,
                        plateNumber: plateNo,
                        category: selectedOption,
                        endDate: null,
                        status: true
                  };

                  // Post the new vehicle to the server
                  await axios.post("http://localhost:8000/vehicle", newVehicle);

                  // Reset plateNo
                  setPlateNo("");

                  setShowParkIn(false)
                  window.location.reload();

            } catch (error) {
                  console.error("Error posting new vehicle:", error);
            }
      };

      return (
            <div className='fixed w-screen h-screen bg-black/40 z-50'>
                  <div className='fixed top-0 inset-0 flex items-center justify-center bg-black/40'>
                        <div className={`relative lg:min-w-[45vw] md:max-w-[20vw] sm:max-w-[10vw] bg-[#D9D9D9] shadow-lg rounded-2xl pointer-events-auto flex flex-col gap-10 justify-center items-center p-10 ring-1 ring-black ring-opacity-5`}>
                              <IoMdClose onClick={() => setShowParkIn(false)} className='text-3xl absolute top-2 right-2 cursor-pointer' />

                              <h2 className='text-3xl font-bold mb-4'>Parking in</h2>

                              <div className='flex gap-12'>
                                    <label htmlFor="2" className='text-lg flex item-center gap-1'>
                                          <input
                                                className='m-1 border-[#6200EE] h-6 w-6'
                                                type="radio"
                                                id="2"
                                                name="parkingOption"
                                                value="2 Wheels"
                                                checked={selectedOption === '2 Wheels'}
                                                onChange={handleOptionChange}
                                          />
                                          2-Wheeler
                                    </label>

                                    <label htmlFor="3" className='text-lg flex item-center gap-1' >
                                          <input
                                                className='m-1 border-[#6200EE] h-6 w-6'
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
                                                className='m-1 border-[#6200EE] h-6 w-6'
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
                                    <input required type="text" className='rounded-xl p-3 bg-[#D1CBC2] text-lg' onChange={(e) => setPlateNo(e.target.value)} />
                              </div>

                              <button onClick={handleButton} className=' px-16 py-3 mb-10 bg-[#53AC5C] text-white font-bold text-3xl rounded-2xl '>
                                    Park
                              </button>
                        </div>
                  </div>
            </div>
      );
};

export default ParkIn; 
