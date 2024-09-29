import React, { useState } from 'react'
import axios from 'axios'

const Settings = () => {

      const [companyName, setCompanyName] = useState("")
      const [parkingRules, setParkingRules] = useState("")
      const [twoWheels, setTwoWheels] = useState(0)
      const [threeAndFourWheels, setThreeAndFourWheels] = useState(0)
      const [pricePerTicket, setPricePerTicket] = useState(0)
      const [hoursLimit, setHoursLimit] = useState(0)
      const [overTimeFees, setOverTimeFees] = useState(0)

      // Function to format parking rules
      const formatParkingRules = (rules) => {
            // Example formatting: split into lines and add bullet points
            return rules.split('\n').map(line => `• ${line.trim()}`).join('\n');
      }

      const handleButton = () => {
            // Format the parking rules before submitting
            const formattedParkingRules = formatParkingRules(parkingRules);

            const data = {
                  companyName,
                  parkingRules: formattedParkingRules, // Use formatted rules here
                  twoWheels,
                  threeAndFourWheels,
                  pricePerTicket,
                  hoursLimit,
                  overTimeFees
            }

            axios.put('http://localhost:8000/settings', data)
                  .then(res => {
                        console.log(res.data)
                  })
                  .catch(err => {
                        console.log(err)
                  })
      }

      return (
            <div className='mx-[10%] h-max-700:mt-[35vh] mt-[25vh] w-[80vw] text-deepBlue'>
                  <div className="font-bold relative pt-12 shadow-2xl border-4 border-bloe bg-white mx-8  rounded-3xl min-h-screen h-auto ">
                        <div className='flex min-h-screen justify-center p-20'>
                              {/* left */}
                              <div className='px-16 flex flex-col items-center'>
                                    <p className='text-6xl text-bloe '>DETAILS</p>
                                    <img src="/capture.png" className='cursor-pointer' />
                                    <input onChange={e => setCompanyName(e.target.value)} type="text" className='text-center rounded-3xl w-[90%] py-4 border-4 border-bloe' placeholder='Company Name' />
                                    <textarea onChange={e => setParkingRules(e.target.value)} className='overflow-y-auto rounded-3xl p-4 text-pretty text-center border-4 m-4 border-bloe' rows="9" cols="40" placeholder='Company Rules'></textarea>
                              </div>

                              {/* right */}
                              <div className=' mx-auto px-40  text-center'>
                                    <p className='text-3xl text-bloe my-4 '>Total Parking Spaces</p>

                                    <div className='flex gap-4 justify-center'>
                                          <input onChange={e => setTwoWheels(e.target.value)} type="number" className='border-4 p-4 w-40 rounded-3xl text-center border-bloe' placeholder='2 wheels' />
                                          <input onChange={e => setThreeAndFourWheels(e.target.value)} type="number" className='border-4 p-4 w-40 rounded-3xl text-center border-bloe' placeholder='3/4 wheels' />
                                    </div>

                                    <p className='mt-8 text-3xl'>Price per ticket</p>
                                    <input onChange={e => setPricePerTicket(e.target.value)} type="number" className='rounded-3xl  m-2 w-full text-4xl text-center py-4 border-4 border-bloe' placeholder='PHP 30.00' />

                                    <p className='mt-8 text-3xl'>(Optional) Hours Limit </p>
                                    <input onChange={e => setHoursLimit(e.target.value)} type="number" className='rounded-3xl  m-2 w-full text-4xl text-center py-4 border-4 border-bloe' placeholder='3 HOURS' />

                                    <p className='mt-8 text-3xl'>(Optional) Overtime Ticket</p>
                                    <input onChange={e => setOverTimeFees(e.target.value)} type="number" className='rounded-3xl  m-2 w-full text-4xl text-center py-4 border-4 border-bloe' placeholder='PHP 20.00' />

                                    <button onClick={handleButton} className='mt-12 bg-greenWich border-4 border-bloe hover:bg-[#75d397] text-bloe py-4 px-8 rounded-3xl text-lg font-bold'>Save Changes</button>
                              </div>
                        </div>
                  </div>
            </div>
      )
}

export default Settings
