import { IoMdClose } from 'react-icons/io';
import { useEffect, useState, useContext } from 'react';
import { innerContext } from '../pages/Dashboard';
import moment from 'moment';


const ParkOut = () => {
      const [socket, vehicles, setVehicles, setShowParkIn, setShowParkOut, setDisplayTicket, setShowVehicleData, setSelectedVehicle, selectedVehicle] = useContext(innerContext)

      const [hasVehicle, setHasVehicle] = useState(false)

      const [inputTicket, setInputTicket] = useState(0);

      const [found, setFound] = useState(true);

      const handleView = () => {
            setShowParkOut(false)
            setShowVehicleData(true)
      }


      const handleSearch = () => {
            const found = vehicles.find((vehicle) => vehicle.ticketNumber == inputTicket)
            if (found) {
                  console.log(found)
                  setSelectedVehicle(found)
                  setHasVehicle(true)
                  setFound(true)



            }
            else {
                  console.log("wala vehicle")
                  setHasVehicle(false)
                  setFound(false)
            }

      }
      console.log(selectedVehicle)

      return (
            <div onClick={() => setShowParkOut(false)} className='fixed w-screen h-screen bg-black/40 z-50'>
                  <div className='fixed inset-0 flex items-center justify-center bg-deepBlue/40'>

                        <div onClick={e => e.stopPropagation()} className={`relative text-bloe border-4 border-darkBloe bg-offWhite shadow-lg rounded-2xl flex flex-col gap-8 items-center p-16 w-[600px]`}>
                              <IoMdClose onClick={() => setShowParkOut(false)} className='text-5xl absolute top-4 right-4 cursor-pointer' />

                              <h2 className='text-3xl font-bold mb-4 '>Parking Out</h2>

                              <div className='flex justify-center items-center gap-4 w-full '>
                                    <input type="number" className='border-4 border-gray-500 rounded-md p-4 w-full text-center text-lg font-bold py-3 px-8  placeholder-bloe/50  outline-[#6181D3]' placeholder='Please input Ticket No.' onChange={(e) => setInputTicket(e.target.value)} />
                              </div>

                              {/* conditional rendering here */}
                              {
                                    hasVehicle &&

                                    <div className='w-full bg-[#DAD3BB] py-8 text-lg font-bold rounded-2xl'>
                                          <table className='w-full text-center'>
                                                <thead>
                                                      <tr>
                                                            <th>Ticket No.</th>
                                                            <th>Date</th>
                                                            <th>Plate No.</th>
                                                            <th>Action</th>
                                                      </tr>
                                                </thead>
                                                <tbody>

                                                      <tr>
                                                            <td>{selectedVehicle.ticketNumber}</td>
                                                            <td>{moment(new Date(selectedVehicle.startDate)).format('DD-MM-YY')}</td>
                                                            <td>{selectedVehicle.plateNumber}</td>
                                                            <td><button onClick={handleView} className='bg-green-400 hover:bg-green-500 hover:scale-95 p-4  shadow-xl text-white py-1 px-6 rounded-xl'>Select</button></td>
                                                      </tr>
                                                </tbody>
                                          </table>
                                    </div>

                              }
                              {
                                    !found &&
                                    <div>
                                          <p className='text-red-600'>no vehicle found!</p>
                                    </div>
                              }


                              <button onClick={handleSearch} className=' bg-darkBloe hover:bg-bloe text-white p-4  rounded-lg w-full'>
                                    Search
                              </button>
                        </div>
                  </div>

            </div>
      );
};

export default ParkOut;




