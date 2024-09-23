import { IoMdClose } from 'react-icons/io';
import { useEffect, useState, useContext } from 'react';
import { innerContext } from '../pages/Dashboard';
import moment from 'moment';


const ParkOut = () => {
      const [socket, vehicles, setVehicles, showToast, setShowToast, setShowParkIn, setShowParkOut, setDisplayTicket, setShowVehicleData, setSelectedVehicle, selectedVehicle, todayEarn, setTodayEarn, totalEarnings, setTotalEarnings, earnings, setEarnings] = useContext(innerContext)

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
            <div className='fixed w-screen h-screen bg-black/40 z-50'>
                  <div className='fixed inset-0 flex items-center justify-center bg-deepBlue/40'>
                        <div className={`relative bg-offWhite shadow-lg rounded-3xl flex flex-col gap-8 items-center p-16 `}>
                              <IoMdClose onClick={() => setShowParkOut(false)} className='text-5xl absolute top-4 right-4 cursor-pointer' />

                              <h2 className='ml-8 text-center text-6xl font-bold text-bloe'>Parking Out</h2>

                              <div className='flex justify-center items-center gap-4 w-full '>
                                    <label htmlFor="ticket" className='text-nowrap'>Ticket No.</label>
                                    <input type="number" className='bg-vanilla text-lg font-bold py-3 px-8 rounded-3xl w-[100%] placeholder-bloe/50  outline-[#6181D3] border-4 border-bloe' placeholder='Please input Ticket No.' onChange={(e) => setInputTicket(e.target.value)} />
                              </div>

                              {/* conditional rendering here */}
                              {
                                    hasVehicle &&

                                    <div className='w-full bg-[#DAD3BB] py-4 rounded-2xl'>
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
                                                            <td><button onClick={handleView} className='bg-lightBlue hover:bg-bloe hover:text-white hover:border-black text-darkBloe border-4 border-bloe py-1 px-6 rounded-2xl'>Select</button></td>
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


                              <button onClick={handleSearch} className=' px-14 py-3  bg-greenWich text-bloe border-4 border-darkBloe font-bold text-2xl rounded-full '>
                                    Search
                              </button>
                        </div>
                  </div>

            </div>
      );
};

export default ParkOut;




