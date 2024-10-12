import React from 'react'

const Slots = ({ vehicles, twoWheels, threeAndFourWheels }) => {
      return (
            <div className='flex justify-between text-center p-4 items-center mt-4'>
                  <div>
                        <h2 className='text-pink text-stroke-4 text-stroke-deepBlue text-9xl'>{vehicles.length}</h2>
                        <p>Occupied</p>
                  </div>

                  <div>
                        <h2 className='text-9xl text-greenWich contrast-150 text-stroke-4 text-stroke-deepBlue'>{(twoWheels + threeAndFourWheels) - vehicles.length}</h2>
                        <p>Available Slots</p>
                  </div>

                  <div className=' bg-deepBlue text-white border-4 border-deepBlue rounded-2xl p-8 flex flex-col gap-4'>
                        <p>3/4-Wheeler</p>
                        <p className='text-4xl font-bolder text-pink'>
                              {
                                    vehicles.filter(vehicle => vehicle.category === "4 Wheels" || vehicle.category === "3 Wheels").length === threeAndFourWheels ? "FULL" :
                                          vehicles.filter(vehicle => vehicle.category === "4 Wheels" || vehicle.category === "3 Wheels").length
                              }
                              /
                              {
                                    threeAndFourWheels
                              }

                        </p>

                        <p>2-Wheeler</p>
                        <p className='text-4xl font-bolder text-pink'>{
                              vehicles.filter(vehicle => vehicle.category === "2 Wheels").length === twoWheels ? "FULL" :
                                    vehicles.filter(vehicle => vehicle.category === "2 Wheels").length
                        }
                              /
                              {
                                    twoWheels
                              }
                        </p>
                  </div>
            </div>
      )
}

export default Slots