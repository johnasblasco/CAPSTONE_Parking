import React, { useEffect, useState, useContext, createContext } from 'react'
import { myContext } from '../Home';
import Clock from '../components/Clock';
import { FaCarSide } from "react-icons/fa6";
import CurrentlyParked from '../components/CurrentlyParked';
import Toast from '../components/Toast';
import Header from '../components/Header';
import Navbar from '../components/Navbar';

import { ToastContainer, toast } from 'react-toastify';
// in
import ParkIn from '../components/ParkIn'
import { FaArrowRightToBracket } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";

// out
import ParkOut from '../components/ParkOut'
import ParkOutDetails from '../components/ParkOutDetails';
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";


import PropagateLoader from 'react-spinners/PropagateLoader'
export const innerContext = createContext()

const Dashboard = () => {

      const [allVehicles, totalEarnings, todayEarn, setTodayEarn, yesterdayEarnings, vehicles, setVehicles, setTotalEarnings, earnings, setEarnings] = useContext(myContext)

      const [showParkIn, setShowParkIn] = useState(false)
      const [showParkOut, setShowParkOut] = useState(false)
      const [showToast, setShowToast] = useState("")


      // if meron na vehicle sa PARKOUT TO
      const [showVehicleData, setShowVehicleData] = useState(false)

      // kunin yung selected vehicle
      const [selectedVehicle, setSelectedVehicle] = useState({})
      // kunin yung ticket display sa parkin
      const [displayTicket, setDisplayTicket] = useState(0);

      if (allVehicles[0] < 0) {
            return <PropagateLoader
                  color="#ff5400"
                  size={30}
                  className='absolute top-[50dvh] left-[50dvw] w-fit'
            />
      }




      const innerContextValue = [vehicles, setVehicles, showToast, setShowToast, setShowParkIn, setShowParkOut, setDisplayTicket, setShowVehicleData, setSelectedVehicle, selectedVehicle, todayEarn, setTodayEarn, totalEarnings, setTotalEarnings, earnings, setEarnings]


      return (
            <>
                  <Header />
                  <div className='absolute left-[200px] top-[100px] lg:overflow-x-hidden max-sm:hidden'>
                        <div className="mx-4 bg-[#D9D9D9] min-h-screen rounded-3xl" style={{ width: 'calc(100vw - 250px)' }}>

                              {/* CONTENT */}
                              <div className='py-12 px-4 grid grid-cols-2 gap-10'>
                                    <div className="left flex flex-col gap-4">
                                          <div className='bg-[#C6C8CD] p-8 rounded-2xl w-full'>
                                                <Clock />
                                          </div>

                                          <CurrentlyParked vehicles={vehicles} />

                                    </div>

                                    <div className="right max-[1150px]:hidden flex flex-col gap-4">

                                          <div className='flex gap-4 justify-evenly'>
                                                <button onClick={() => setShowParkIn(!showParkIn)} className='bg-[#81B489] border-2 rounded-2xl border-[#44833A] hover:bg-[#6a9c71] p-10 flex flex-col items-center w-[17vw]'>
                                                      <div className='flex gap-2'>
                                                            <FaCarSide className='text-5xl' />
                                                            <FaArrowRightToBracket className='text-5xl' />
                                                      </div>
                                                      <p className='text-2xl font-[600]'>In</p>
                                                      <FaPlus className='text-2xl font-[600]' />

                                                </button>
                                                <button onClick={() => setShowParkOut(!showParkOut)} className='bg-[#B96F6F] border-2 rounded-2xl border-[#833C3C] hover:bg-[#a15c5c] p-10 flex flex-col items-center w-[17vw]'>
                                                      <div className='flex gap-2'>
                                                            <FaCarSide className='text-5xl' />
                                                            <FaArrowRightFromBracket className='text-5xl' />
                                                      </div>
                                                      <p className='text-2xl font-[600]'>Out</p>
                                                      <FaMinus className='text-2xl font-bold' />
                                                </button>
                                          </div>

                                          <div className='relative min-h-[44vh] rounded-3xl bg-[#C6C8CD] p-4'>
                                                <span className='absolute px-4 py-1 bg-[#B0ADBC] rounded-lg'>Slots</span>

                                                {/* content */}
                                                <div className='flex justify-between text-center p-4 items-center mt-4'>
                                                      <div>
                                                            <h2 className='text-[#B94242] text-8xl'>{vehicles.length}</h2>
                                                            <p>Occupied</p>
                                                      </div>

                                                      <div>
                                                            <h2 className='text-8xl text-[#307629]'>{101 - vehicles.length}</h2>
                                                            <p>Available Slots</p>
                                                      </div>

                                                      <div className='bg-[#AFB6C6] rounded-2xl p-8 flex flex-col gap-1'>
                                                            <p>3/4-Wheeler</p>
                                                            <p className='text-[#9F5D2D] text-3xl font-light'>
                                                                  {
                                                                        vehicles.filter(vehicle => vehicle.category === "3 Wheels" || vehicle.category === "4 Wheels").length
                                                                  }
                                                                  /48
                                                            </p>
                                                            <p>2-Wheeler</p>
                                                            <p className='text-[#9F5D2D] text-3xl font-light'>{
                                                                  vehicles.filter(vehicle => vehicle.category === "2 Wheels").length
                                                            }
                                                                  /53</p>
                                                      </div>
                                                </div>

                                          </div>
                                    </div>
                              </div>
                        </div>
                        <ToastContainer
                              position="bottom-right"
                              autoClose={2000}
                              hideProgressBar={false}
                              newestOnTop={false}
                              closeOnClick
                              rtl={false}
                              pauseOnFocusLoss
                              draggable
                              pauseOnHover
                              theme="light"
                              transition:Bounce
                        />
                  </div >

                  {/* CONDITIONAL RENDERING HERE */}

                  <innerContext.Provider value={innerContextValue}>
                        {
                              showParkIn && <ParkIn />
                        }
                        {
                              showParkOut && <ParkOut />
                        }
                        {
                              showVehicleData && <ParkOutDetails />
                        }

                  </innerContext.Provider>

                  <Navbar />

                  {
                        showToast == "out" && (<Toast setShowToast={setShowToast} title={"Vehicle removed!"} disc={"Vehicle has been removed to the database."} />)
                  }
                  {
                        showToast == "in" && (<Toast showToast={showToast} setShowToast={setShowToast} displayTicket={displayTicket} title={"Vehicle Added!"} disc={"Vehicle has been added to the database."} />)
                  }
            </>

      )
}

export default Dashboard