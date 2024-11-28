import React, { useEffect, useState, useContext, createContext } from 'react'
import { myContext } from '../Home';
import Clock from '../components/Clock';
import { FaCarSide } from "react-icons/fa6";
import CurrentlyParked from '../components/CurrentlyParked';
import Slots from '../components/Slots';

import Swal from 'sweetalert2';
// in
import ParkIn from '../components/ParkIn'
import { FaArrowRightToBracket } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";

// out
import ParkOut from '../components/ParkOut'
import ParkOutDetails from '../components/ParkOutDetails';
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";

export const innerContext = createContext()

const Dashboard = () => {

      const [
            socket,
            allVehicles,
            setAllVehicles,
            vehicles,
            setVehicles,
            companyName,
            parkingRules,
            twoWheels,
            threeAndFourWheels,
            ticket34,
            ticket2,
            hoursLimit,
            overTimeFees,
      ] = useContext(myContext)

      const [showParkIn, setShowParkIn] = useState(false)
      const [showParkOut, setShowParkOut] = useState(false)


      // if meron na vehicle sa PARKOUT TO
      const [showVehicleData, setShowVehicleData] = useState(false)

      // kunin yung selected vehicle
      const [selectedVehicle, setSelectedVehicle] = useState({})
      // kunin yung ticket display sa parkin
      const [displayTicket, setDisplayTicket] = useState(0);


      const innerContextValue = [socket, vehicles, setVehicles, setShowParkIn, setShowParkOut, setDisplayTicket, setShowVehicleData, setSelectedVehicle, selectedVehicle]

      const handleParkIn = () => {
            console.log(vehicles.length, twoWheels, threeAndFourWheels)
            if (vehicles.length < (threeAndFourWheels + twoWheels)) {
                  setShowParkIn(!showParkIn)
                  return
            }
            else {
                  Swal.fire({
                        title: 'Parking Lot Full!',
                        text: 'No spots are available right now. Please try again later.',
                        icon: 'warning',
                        confirmButtonText: 'Got it!',
                        backdrop: true
                  });

                  return
            }

      }

      return (
            <>

                  <div className='mx-[10%] h-max-700:mt-[25vh] mt-[15vh] w-[80vw] text-deepBlue'>
                        {/* CONTENT GRID LEFT AND RIGHT */}
                        <div className='py-1 px-4 grid grid-cols-2 gap-10'>

                              {/* LEFT */}
                              <div className="left max-[1150px]:hidden flex flex-col gap-4">

                                    {/* IN AND OUT */}
                                    <div className='flex gap-8 justify-center bg-[#FEF6E4] p-6 rounded-3xl border-4 border-deepBlue'>

                                          <button onClick={handleParkIn} className=' w-[40%] h-[280px] border-4 border-deepBlue rounded-2xl hover:scale-95 bg-greenWich/70 hover:backdrop-brightness-200 contrast-200 p-10 flex flex-col items-center justify-center  '>
                                                <div className='flex gap-2'>
                                                      <FaCarSide className='text-7xl' />
                                                      <FaArrowRightToBracket className='text-7xl' />
                                                </div>
                                                <p className='text-4xl font-[600]'>In</p>
                                                <FaPlus className='text-4xl font-[600]' />
                                          </button>

                                          <button onClick={() => setShowParkOut(!showParkOut)} className=' w-[40%] h-[280px] border-4 border-deepBlue rounded-2xl hover:scale-95 bg-pink hover:backdrop-brightness-200  contrast-200 p-10 flex flex-col items-center  justify-center '>
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
                                          <Slots vehicles={vehicles} twoWheels={twoWheels} threeAndFourWheels={threeAndFourWheels} />


                                    </div>

                              </div>


                              {/* RIGHT */}
                              <div className="right flex flex-col gap-4">
                                    {/* CLOCK */}
                                    <div className='bg-offWhite p-8 rounded-2xl w-full border-4 border-deepBlue'>
                                          <Clock />
                                    </div>

                                    {/* PARKED */}

                                    <CurrentlyParked vehicles={vehicles} hoursLimit={hoursLimit} />

                              </div>
                        </div>
                        {/*end of content*/}


                  </div>



                  {/* CONDITIONAL RENDERING HERE */}

                  <innerContext.Provider value={innerContextValue}>
                        {
                              showParkIn && <ParkIn companyName={companyName} parkingRules={parkingRules} ticket2={ticket2} ticket34={ticket34} twoWheels={twoWheels} threeAndFourWheels={threeAndFourWheels} />
                        }
                        {
                              showParkOut && <ParkOut />
                        }
                        {
                              showVehicleData && <ParkOutDetails ticket2={ticket2} ticket34={ticket34} overTimeFees={overTimeFees} hoursLimit={hoursLimit} setAllVehicles={setAllVehicles} />
                        }

                  </innerContext.Provider>
            </>

      )
}

export default Dashboard