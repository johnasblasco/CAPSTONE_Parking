import React, { useState, useEffect, useContext } from 'react'
import { myContext } from '../Home'
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

      return (

            <>
                  <div className='mx-[10%] h-max-700:mt-[35vh] mt-[25vh] w-[82vw] text-deepBlue'>


                        {/* EARNINGS */}
                        <div className='flex justify-between  ml-[3%] w-[75vw] h-[20vh]'>

                              {/* today earnings */}
                              <div className='h-max-700:p-16 flex gap-4 items-center pt-10 justify-center relative border-4 border-deepBlue shadow-2xl rounded-3xl  bg-offWhite p-2 w-[30%]'>
                                    <p className='border-4 border-deepBlue font-bold absolute left-[-35px] top-2 bg-yeelow py-1 px-4 text-lg rounded-3xl '>Today's Earnings</p>
                                    <p className='h-max-700:text-3xl text-5xl font-bold text-deepBlue'>PHP</p>
                                    <p className='h-max-700:text-4xl text-6xl font-bold text-deepBlue'>{todayEarn}.00</p>
                              </div>

                              <div className='h-max-700:p-16 flex gap-4 items-center pt-10 justify-center relative border-4 border-deepBlue shadow-2xl  rounded-3xl bg-offWhite p-2 w-[30%]'>
                                    <p className='border-4 border-deepBlue font-bold absolute left-[-35px] top-2 bg-yeelow py-1 px-4 text-lg rounded-3xl '>Total Earnings</p>
                                    <p className='h-max-700:text-3xl text-5xl font-bold text-deepBlue'>PHP</p>
                                    <p className='h-max-700:text-4xl  text-6xl font-bold text-deepBlue'>{totalEarnings}.00</p>
                              </div>
                              {/* Filter */}
                              <div className='h-max-700:p-16 flex flex-col gap-4 items-center pt-10 justify-center relative border-4 border-deepBlue shadow-2xl  rounded-3xl bg-offWhite p-2 w-[25%]'>
                                    <p className='border-4 border-deepBlue font-bold absolute left-[-35px] top-2 bg-yeelow py-1 px-4 text-lg rounded-3xl '>Filter</p>
                                    <p className='text-3xl font-bold text-deepBlue'>By Date</p>
                                    <div className='flex gap-4'>
                                          <button className='p-2 font-bold rounded-full border-4 border-deepBlue bg-lightBlue'>MM / YYYY</button>
                                          <button className='py-2 px-6 font-bold rounded-full border-4 border-deepBlue bg-pink'>Print</button>
                                    </div>
                              </div>
                        </div>


                        {/* flex filter and table */}
                        <div className='flex font-bold gap-4 w-full'>

                              {/* filter */}
                              <div className='relative mt-32 border-4 shadow-2xl border-deepBlue bg-offWhite min-w-[14vw] flex flex-col justify-center rounded-3xl h-fit gap-2 p-4 py-10'>
                                    <p className='flex border-4 border-deepBlue absolute left-[-35px] top-2 font-bold bg-yeelow py-1 px-12 text-lg rounded-3xl '><FaFilter />Filter</p>

                                    <p className='mt-12 text-center text-2xl font-bold'>By Wheels</p>

                                    <div className='flex justify-center gap-4 my-4'>
                                          <div className='flex justify-center items-center gap-3'>

                                                {twoWheelsRadio ? (<MdCheckBox onClick={() => setTwoWheelsRadio(!twoWheelsRadio)} className='text-4xl' />) : (<MdCheckBoxOutlineBlank onClick={handleTwo} className='text-4xl' />)}

                                                <label>2</label>
                                          </div>

                                          <div className='flex justify-center items-center gap-3'>
                                                {threeWheelsRadio ? (<MdCheckBox onClick={() => setThreeWheelsRadio(!threeWheelsRadio)} className='text-4xl' />) : (<MdCheckBoxOutlineBlank onClick={handleThree} className='text-4xl' />)}
                                                <p>3 </p>
                                          </div>

                                          <div className='flex justify-center items-center gap-3'>
                                                {fourWheelsRadio ? (<MdCheckBox onClick={() => setFourWheelsRadio(!fourWheelsRadio)} className='text-4xl' />) : (<MdCheckBoxOutlineBlank onClick={handleFour} className='text-4xl' />)}
                                                <p>4 </p>
                                          </div>
                                    </div>


                                    <p className='mt-12 text-center text-2xl font-bold'>By Status</p>

                                    <div className='flex gap-4 my-4 mx-8 justify-center items-center'>
                                          <div className='flex items-center gap-2 '>
                                                {IN ? <MdCheckBox onClick={() => setIN(!IN)} className='text-4xl' /> : <MdCheckBoxOutlineBlank onClick={handleIN} className='text-4xl' />}
                                                <p className='text-xl'>IN</p>
                                          </div>

                                          <div className='flex items-center gap-1'>
                                                {OUT ? <MdCheckBox onClick={() => setOUT(!OUT)} className='text-4xl ml-3' /> : <MdCheckBoxOutlineBlank onClick={handleOUT} className='text-4xl ml-3' />}
                                                <p className='text-xl'>OUT</p>
                                          </div>
                                    </div>

                                    <p className='mt-12 text-center text-2xl font-bold'>By Date</p>
                                    <button className='p-2 m-auto text-xl w-[80%] font-bold rounded-full border-4 border-deepBlue bg-lightBlue'>MM / YYYY</button>
                              </div>



                              {/* vehicle table content */}
                              <div className="relative border-4 border-deepBlue bg-offWhite m-12 rounded-3xl min-h-screen h-auto flex flex-col w-full py-4 px-4 gap-6 items-center">
                                    <p className='border-4 border-deepBlue absolute left-[-35px] top-2 font-bold bg-yeelow py-1 px-12 text-lg rounded-3xl '>Car History</p>
                                    {/* table */}
                                    <div className='w-full'>
                                          {/* header only */}
                                          <div className='flex items-center justify-end gap-4 '>
                                                <p>Search by ticket No.</p>
                                                <input onChange={e => setSearch(e.target.value)} className=" w-[25vw] bg-lightBlue py-2 px-4 rounded-3xl font-bold text-xl text-center border-4 border-deepBlue outline-none placeholder-deepBlue/50" type="text" placeholder='Please Input Ticket No.' />
                                                <button onClick={handleSearch} className='bg-greenWich text-deepBlue font-bold py-2 px-8 rounded-3xl border-4 border-deepBlue'>Search</button>
                                                <button onClick={handleSearch} className='bg-pink text-deepBlue justify-self-end font-bold py-2 px-8 rounded-3xl border-4 ml-14 border-deepBlue'>Print</button>
                                          </div>


                                          {/*table  */}
                                          <table className='w-full my-10'>
                                                <thead>
                                                      <tr className='text-center border-b-4 border-deepBlue'>
                                                            <th className='border-r-4 border-deepBlue'>Ticket No.</th>
                                                            <th className='border-r-4 border-deepBlue'>Date</th>
                                                            <th className='border-r-4 border-deepBlue'>Plate No.</th>
                                                            <th className='border-r-4 border-deepBlue'>Category</th>
                                                            <th className='border-r-4 border-deepBlue'>Total Time</th>
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
                                                                              <td className='border-r-4 border-deepBlue' >{vehicle.ticketNumber}</td>
                                                                              <td className='border-r-4 border-deepBlue'>{moment(vehicle.startDate).format("DD-MM-YY")}</td>
                                                                              <td className='border-r-4 border-deepBlue'>{vehicle.plateNumber}</td>
                                                                              <td className='border-r-4 border-deepBlue'>{vehicle.category}</td>
                                                                              <td className='border-r-4 border-deepBlue'>
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



            </>
      )
}

export default Reports