import { IoMdClose } from 'react-icons/io';
import { useEffect, useState } from 'react';
import moment from 'moment';

const ParkOut = ({ setShowParkOut, vehicles }) => {

      const [hasVehicle, setHasVehicle] = useState(false)
      const [selectedVehicle, setSelectedVehicle] = useState({})
      const [inputTicket, setInputTicket] = useState();

      const handleSearch = () => {
            const found = vehicles.find((vehicle) => vehicle.ticketNumber == inputTicket)
            if (found) {
                  setSelectedVehicle(found)
                  console.log("meron vehicle")
                  setHasVehicle(true)



            }
            else {
                  console.log("wala vehicle")
                  setHasVehicle(false)

            }

      }
      return (
            <div className='fixed w-screen h-screen bg-black/40 z-50'>
                  <div className='fixed inset-0 flex items-center justify-center bg-black/40'>

                        <div className={`relative lg:min-w-[45vw] md:max-w-[20vw] sm:max-w-[10vw] bg-[#D9D9D9] shadow-lg rounded-2xl flex flex-col gap-4 items-center p-8 w-full h-5/6`}>
                              <IoMdClose onClick={() => setShowParkOut(false)} className='text-3xl absolute top-2 right-2 cursor-pointer' />

                              <h2 className='ml-8 text-center text-3xl font-bold mb-4'>Parking Out</h2>

                              <div className='flex justify-center items-center gap-4 w-full '>
                                    <label htmlFor="ticket">Search by Ticket No.</label>
                                    <input type="number" value={inputTicket} className='bg-[#D1CBC2] py-3 px-8 rounded-xl w-[65%] outline-[#6181D3]' placeholder='Please input Ticket No.' onChange={(e) => setInputTicket(e.target.value)} />
                              </div>

                              {/* conditional rendering here */}
                              {
                                    hasVehicle &&

                                    <div className='w-full bg-[#DAD3BB] py-2 rounded-2xl'>
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
                                                            <td><button className='bg-[#61A470] hover:bg-[#548f61] text-white py-1 px-6 rounded-lg'>View</button></td>
                                                      </tr>
                                                </tbody>
                                          </table>
                                    </div>

                              }


                              <button onClick={handleSearch} className='mt-auto px-14 py-3 mb-10 bg-[#6181D3] hover:bg-[#4d66a7] text-white font-bold text-3xl rounded-2xl '>
                                    Search
                              </button>
                        </div>

                  </div>

                  {/* small paper */}{
                        !hasVehicle &&
                        <div className='overflow-y-auto absolute bottom-0 right-14 w-[380px] h-[300px] bg-white p-4'>
                              <hr className='border-black my-2' />

                              <div className='flex flex-wrap justify-center'>
                                    <p className='px-6 text-center text-pretty'>immaculate conception parish Cathedral and Minor Basilica, Diocese of Malolos</p>
                              </div>

                              <p className='text-sm mt-8 ml-6'>Ticket no.</p>
                              <p className='text-center text-6xl tracking-widest font-bold'>000001</p>
                              <p className='text-center mt-3 mx-20 text-sm'>valid for 3 hours parking. overtime will be fined.</p>

                        </div>
                  }

            </div>
      );
};

export default ParkOut;




