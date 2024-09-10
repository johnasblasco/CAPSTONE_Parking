import React, { useState, useEffect, useContext } from 'react'
import { myContext } from '../Home'
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { MdLocalPrintshop } from "react-icons/md";
import moment from 'moment';
import { FaFilter } from "react-icons/fa";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { MdCheckBox } from "react-icons/md";

import PropagateLoader from 'react-spinners/PropagateLoader'
const Reports = () => {

      const [socket, allVehicles, totalEarnings, todayEarn, setTodayEarn, yesterdayEarnings, vehicles, setVehicles, setTotalEarnings, earnings, setEarnings] = useContext(myContext)


      const [getVehicles, getSetVehicles] = useState(allVehicles)

      // radio button 
      const [twoWheelsRadio, setTwoWheelsRadio] = useState(false)
      const [threeWheelsRadio, setThreeWheelsRadio] = useState(false)
      const [fourWheelsRadio, setFourWheelsRadio] = useState(false)

      const [IN, setIN] = useState(false)
      const [OUT, setOUT] = useState(false)

      const [search, setSearch] = useState(0);

      // Handle radio button clicks
      const handleIN = () => {
            setIN(true)
            setOUT(false)
      }
      const handleOUT = () => {
            setIN(false)
            setOUT(true)
      }

      const handleTwo = () => {
            setTwoWheelsRadio(true);
            setThreeWheelsRadio(false);
            setFourWheelsRadio(false);
      };

      const handleThree = () => {
            setTwoWheelsRadio(false);
            setThreeWheelsRadio(true);
            setFourWheelsRadio(false);
      };

      const handleFour = () => {
            setTwoWheelsRadio(false);
            setThreeWheelsRadio(false);
            setFourWheelsRadio(true);
      };

      // Update table based on radio button selection
      useEffect(() => {
            let filteredVehicles = allVehicles;
            if (twoWheelsRadio) {
                  filteredVehicles = allVehicles.filter(vehicle => vehicle.category === '2 Wheels');
            } else if (threeWheelsRadio) {
                  filteredVehicles = allVehicles.filter(vehicle => vehicle.category === '3 Wheels');
            } else if (fourWheelsRadio) {
                  filteredVehicles = allVehicles.filter(vehicle => vehicle.category === '4 Wheels');
            }


            IN ? getSetVehicles(filteredVehicles.filter(vehicle => vehicle.status == true))
                  : OUT ? getSetVehicles(filteredVehicles.filter(vehicle => vehicle.status == false))
                        : getSetVehicles(filteredVehicles)


      }, [twoWheelsRadio, threeWheelsRadio, fourWheelsRadio, allVehicles, IN, OUT]);

      // search
      const handleSearch = () => {
            let filteredVehicles = allVehicles;
            search > 0 ? getSetVehicles(filteredVehicles.filter(vehicle => vehicle.ticketNumber == search)) : ""
      }


      if (allVehicles[0] < 0) {
            return <PropagateLoader
                  color="#ff5400"
                  size={30}
                  className='absolute top-[50dvh] left-[50dvw] w-fit'
            />
      }

      const print = () => {
            window.print();
      }
      return (

            <>
                  <Header />

                  <div className='absolute left-[200px] top-[100px] lg:overflow-x-hidden max-lg:hidden'>
                        <div className="mx-4 bg-[#D9D9D9] min-h-screen rounded-3xl" style={{ width: 'calc(100vw - 250px)' }}>

                              <div className='relative'>
                                    <div className="title flex justify-center">
                                          <h2 className='text-5xl my-8 font-extrabold' >Reports</h2>

                                          <div className='absolute right-12 top-12 flex gap-2 items-center' >
                                                <MdLocalPrintshop className='text-2xl' />
                                                <button className='bg-[#53AC5C] py-1 px-3 rounded-xl text-white' onClick={print}>Print</button>
                                          </div>

                                    </div>
                              </div>
                              {/* EARNINGS */}
                              <div className='mx-10 flex items-center gap-6 justify-around font-light'>

                                    {/* left */}
                                    <div className='bg-[#C1B8B8] w-[45dvw] rounded-2xl '>

                                          <div className='bg-[#A89595] mx-4 mt-4 rounded-xl w-fit px-6 py-1'>
                                                <span>Earnings</span>
                                          </div>


                                          <div className='flex text-center justify-center gap-20 mb-10 '>

                                                <div>
                                                      <p className='text-4xl my-2'>PHP <b className='font-extrabold'>{todayEarn}.00</b></p>
                                                      <p>Today</p>
                                                </div>
                                                <div>
                                                      <p className='text-4xl my-2'>PHP <b className='font-extrabold'>{yesterdayEarnings}.00</b></p>
                                                      <p>Yesterday</p>
                                                </div>

                                          </div>
                                    </div>

                                    {/* right */}
                                    <div className='bg-[#9CD2A5] w-[25dvw] rounded-2xl '>
                                          <div className='bg-[#87BB83] mx-4 mt-4 rounded-xl w-fit px-6 py-1'>
                                                <span>Total Earnings</span>
                                          </div>

                                          <div className=' flex items-start text-center mb-10'>
                                                <p className='text-4xl my-5 w-full'>PHP <b className='font-extrabold'>{totalEarnings}.00</b></p>
                                          </div>
                                    </div>

                              </div>



                              {/* vehicle table content */}
                              <div className="bg-[#D6D0C4] m-12 rounded-3xl min-h-screen h-auto flex flex-col py-4 px-4 gap-6 items-center">
                                    <p className=' bg-[#94AB95] py-1 px-10 text-lg rounded-3xl '>Car History</p>

                                    {/* flex between filter and table */}
                                    <div className='flex gap-4 w-full mt-8'>
                                          {/* filter */}
                                          <div className='bg-[#C9B7B7] min-w-[15vw] flex flex-col justify-center rounded-xl h-fit gap-2 p-4'>
                                                <div className='flex justify-center'>
                                                      <FaFilter />
                                                      <p>Filter</p>
                                                </div>
                                                <p className='text-center'>By Category</p>

                                                <div className='flex flex-col gap-4 my-4'>

                                                      <div className='flex justify-center items-center gap-3'>

                                                            {twoWheelsRadio ? (<MdCheckBox onClick={() => setTwoWheelsRadio(!twoWheelsRadio)} className='text-2xl' />) : (<MdCheckBoxOutlineBlank onClick={handleTwo} className='text-2xl' />)}

                                                            <label >2 wheeler</label>
                                                      </div>

                                                      <div className='flex justify-center items-center gap-3'>
                                                            {threeWheelsRadio ? (<MdCheckBox onClick={() => setThreeWheelsRadio(!threeWheelsRadio)} className='text-2xl' />) : (<MdCheckBoxOutlineBlank onClick={handleThree} className='text-2xl' />)}
                                                            <p>3 wheeler</p>
                                                      </div>

                                                      <div className='flex justify-center items-center gap-3'>
                                                            {fourWheelsRadio ? (<MdCheckBox onClick={() => setFourWheelsRadio(!fourWheelsRadio)} className='text-2xl' />) : (<MdCheckBoxOutlineBlank onClick={handleFour} className='text-2xl' />)}
                                                            <p>4 wheeler</p>
                                                      </div>
                                                </div>


                                                <p className='text-center'>By Status</p>

                                                <div className='flex flex-col gap-4 my-4 mx-8 justify-center items-center'>
                                                      <div className='flex items-center gap-3 '>
                                                            {IN ? <MdCheckBox onClick={() => setIN(!IN)} className='text-2xl' /> : <MdCheckBoxOutlineBlank onClick={handleIN} className='text-2xl' />}
                                                            <p>In</p>
                                                      </div>

                                                      <div className='flex items-center gap-3'>
                                                            {OUT ? <MdCheckBox onClick={() => setOUT(!OUT)} className='text-2xl ml-3' /> : <MdCheckBoxOutlineBlank onClick={handleOUT} className='text-2xl ml-3' />}
                                                            <p>Out</p>
                                                      </div>
                                                </div>
                                          </div>

                                          {/* table */}
                                          <div className='w-full'>
                                                {/* header only */}
                                                <div className='flex items-center justify-center gap-4'>
                                                      <p>Search by ticket No.</p>
                                                      <input onChange={e => setSearch(e.target.value)} className="bg-[#C4B9A9] rounded-2xl py-1 px-6 outline-none placeholder-black/50" type="text" placeholder='Please input Ticket No.' />
                                                      <button onClick={handleSearch} className='bg-[#6181D3] text-white py-1 px-2 rounded-xl'>Search</button>
                                                </div>

                                                {/*table  */}
                                                <table className='w-full my-10'>
                                                      <thead>
                                                            <tr className='text-center border-b border-black'>
                                                                  <th>Ticket No.</th>
                                                                  <th>Date</th>
                                                                  <th>Plate No.</th>
                                                                  <th>Category</th>
                                                                  <th>Total Time</th>
                                                                  <th>Status</th>
                                                            </tr>
                                                      </thead>
                                                      <tbody>
                                                            {



                                                                  getVehicles.map((vehicle, index) => {




                                                                        const startDate = moment(vehicle.startDate);
                                                                        const endDate = moment(vehicle.endDate);
                                                                        const currentDate = moment();

                                                                        let duration;
                                                                        // if status OUT 
                                                                        vehicle.status ? duration = moment.duration(currentDate.diff(startDate)) : duration = moment.duration(endDate.diff(startDate))

                                                                        // if status IN then Calculate the difference in hours and minutes


                                                                        const dayDifference = duration.days();
                                                                        const hoursDifference = duration.hours();
                                                                        const minutesDifference = duration.minutes();


                                                                        return (
                                                                              <tr key={index} className="text-center">
                                                                                    <td>{vehicle.ticketNumber}</td>
                                                                                    <td>{moment(vehicle.startDate).format("DD-MM-YY")}</td>
                                                                                    <td>{vehicle.plateNumber}</td>
                                                                                    <td>{vehicle.category}</td>
                                                                                    <td>
                                                                                          {

                                                                                                dayDifference > 0 ? `${dayDifference} days ${hoursDifference} hours ${minutesDifference} mins` : hoursDifference > 0 ? `${hoursDifference} hours  ${minutesDifference} mins` : `${minutesDifference} mins`
                                                                                          }

                                                                                    </td>
                                                                                    <td>{vehicle.status ? "In" : "Out"}</td>
                                                                              </tr>
                                                                        );
                                                                  })

                                                            }
                                                      </tbody>
                                                </table>



                                          </div>
                                    </div>

                              </div>

                        </div>
                  </div >
                  <Navbar />
            </>
      )
}

export default Reports