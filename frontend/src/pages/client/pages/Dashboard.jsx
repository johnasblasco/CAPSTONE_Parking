import React, { useEffect, useState, useContext, createContext } from 'react'
import { myContext } from '../Home';
import Clock from '../components/Clock';
import { FaCarSide } from "react-icons/fa6";
import CurrentlyParked from '../components/CurrentlyParked';
import Toast from '../components/Toast';
import Slots from '../components/Slots';

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

      const [socket, allVehicles, totalEarnings, todayEarn, setTodayEarn, yesterdayEarnings, vehicles, setVehicles, setTotalEarnings, earnings, setEarnings] = useContext(myContext)

      const [showParkIn, setShowParkIn] = useState(false)
      const [showParkOut, setShowParkOut] = useState(false)
      const [showToast, setShowToast] = useState("")


      // if meron na vehicle sa PARKOUT TO
      const [showVehicleData, setShowVehicleData] = useState(false)

      // kunin yung selected vehicle
      const [selectedVehicle, setSelectedVehicle] = useState({})
      // kunin yung ticket display sa parkin
      const [displayTicket, setDisplayTicket] = useState(0);



      // loading muna mga par
      const [loading, setLoading] = useState(true);

      if (loading[0] < 0) {
            return <PropagateLoader
                  color="#ff5400"
                  size={30}
                  className='absolute top-[50dvh] left-[50dvw] w-fit'
            />
      }




      const innerContextValue = [socket, vehicles, setVehicles, showToast, setShowToast, setShowParkIn, setShowParkOut, setDisplayTicket, setShowVehicleData, setSelectedVehicle, selectedVehicle, todayEarn, setTodayEarn, totalEarnings, setTotalEarnings, earnings, setEarnings]


      return (
            <>
                  <div className='mx-[10%] h-max-700:mt-[35vh] mt-[25vh] w-[80vw] text-deepBlue'>
                        {/* CONTENT GRID LEFT AND RIGHT */}
                        <div className='py-1 px-4 grid grid-cols-2 gap-10'>

                              {/* LEFT */}
                              <div className="left max-[1150px]:hidden flex flex-col gap-4">

                                    {/* IN AND OUT */}
                                    <div className='flex gap-8 justify-center bg-[#FEF6E4] p-6   rounded-3xl border-4 border-deepBlue'>

                                          <button onClick={() => setShowParkIn(!showParkIn)} className='bg-greenWich w-[40%] h-[280px] border-4 border-deepBlue rounded-2xl  hover:bg-[#6a9c71] p-10 flex flex-col items-center justify-center  '>
                                                <div className='flex gap-2'>
                                                      <FaCarSide className='text-7xl' />
                                                      <FaArrowRightToBracket className='text-7xl' />
                                                </div>
                                                <p className='text-4xl font-[600]'>In</p>
                                                <FaPlus className='text-4xl font-[600]' />
                                          </button>

                                          <button onClick={() => setShowParkOut(!showParkOut)} className='bg-pink w-[40%] h-[280px] border-4 border-deepBlue rounded-2xl hover:bg-[#a15c5c] p-10 flex flex-col items-center  justify-center '>
                                                <div className='flex gap-2'>
                                                      <FaCarSide className='text-7xl' />
                                                      <FaArrowRightFromBracket className='text-7xl' />
                                                </div>
                                                <p className='text-4xl font-[600]'>Out</p>
                                                <FaMinus className='text-4xl font-bold' />
                                          </button>
                                    </div>


                                    {/* SLOTS */}
                                    <div className='relative mt-8  rounded-3xl bg-offWhite border-4 border-deepBlue p-4 shadow-2xl'>
                                          <span className='absolute px-8 py-2 bg-yeelow border-4 border-deepBlue text-xl font-bold left-[-35px] rounded-full'>Slots</span>
                                          <Slots vehicles={vehicles} />


                                    </div>

                              </div>


                              {/* RIGHT */}
                              <div className="right flex flex-col gap-4">
                                    {/* CLOCK */}
                                    <div className='bg-offWhite p-8 rounded-2xl w-full border-4 border-deepBlue'>
                                          <Clock />
                                    </div>

                                    {/* PARKED */}

                                    <CurrentlyParked vehicles={vehicles} />

                              </div>
                        </div>
                        {/*end of content*/}


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