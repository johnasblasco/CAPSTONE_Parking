import React from 'react'

const Slots = ({ vehicles }) => {
      return (
            <div className='flex justify-between text-center p-4 items-center mt-4'>
                  <div>
                        <h2 className='text-pink text-stroke-4 text-stroke-deepBlue text-9xl'>{vehicles.length}</h2>
                        <p>Occupied</p>
                  </div>

                  <div>
                        <h2 className='text-9xl text-lightBlue text-stroke-4 text-stroke-deepBlue'>{101 - vehicles.length}</h2>
                        <p>Available Slots</p>
                  </div>

                  <div className='bg-lightBlue border-4 border-deepBlue rounded-2xl p-8 flex flex-col gap-1'>
                        <p>3/4-Wheeler</p>
                        <p className='text-5xl font-bolder text-deepBlue'>
                              {
                                    vehicles.filter(vehicle => vehicle.category === "4 Wheels" || vehicle.category === "3 Wheels").length
                              }

                        </p>

                        <p>2-Wheeler</p>
                        <p className='text-5xl font-bolder text-deepBlue'>{
                              vehicles.filter(vehicle => vehicle.category === "2 Wheels").length
                        }
                        </p>
                  </div>
            </div>
      )
}

export default Slots