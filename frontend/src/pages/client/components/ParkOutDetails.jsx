import { IoMdClose } from 'react-icons/io';
import { useEffect, useState, useContext } from 'react';
import { innerContext } from '../pages/Dashboard';
import moment from 'moment';
import axios from 'axios';
import Swal from 'sweetalert2';


const ParkOutDetails = ({ pricePerTicket, overTimeFees, hoursLimit }) => {


      const [socket, vehicles, setVehicles, setShowParkIn, setShowParkOut, setDisplayTicket, setShowVehicleData, setSelectedVehicle, selectedVehicle] = useContext(innerContext)

      const startDate = moment(selectedVehicle.startDate);
      const currentDate = moment();

      // Calculate the difference in hours and minutes
      const duration = moment.duration(currentDate.diff(startDate));

      const dayDifference = duration.days();
      const hoursDifference = duration.hours();
      const minutesDifference = duration.minutes();
      const [ifOverStay, setIfOverStay] = useState(false)

      const handleRemove = async () => {
            let vehicleUpdateData = {

            };

            // if overstay logic.
            if (dayDifference > 0 || hoursDifference > hoursLimit) {
                  setIfOverStay(true)
                  console.log("overstay to boy")
                  vehicleUpdateData = {
                        ...selectedVehicle,
                        extraCharges: overTimeFees,
                        endDate: moment(),
                        status: false
                  };


                  await axios.post("http://localhost:8000/earnings", {
                        currentDate: new Date().toISOString(),
                        earnings: overTimeFees
                  })

                  console.log("newvehicle here:", vehicleUpdateData)

            }
            else {
                  setIfOverStay(false)
                  console.log("not overstay to boy")
                  vehicleUpdateData = {
                        ...selectedVehicle,
                        endDate: moment(),
                        status: false
                  };
                  console.log("newvehicle here:", vehicleUpdateData)

            }



            try {
                  await axios.put(`http://localhost:8000/vehicle/${selectedVehicle._id}`, vehicleUpdateData)


                  // render the updates
                  setVehicles(prevVehicles =>
                        prevVehicles.filter(vehicle =>
                              vehicle._id != selectedVehicle._id

                        )
                  );



                  setShowVehicleData(false)
                  parkOutAlert()


            } catch (error) {
                  console.log(error)
            }


      }
      const parkOutAlert = () => {
            Swal.fire({
                  title: "Parkout successful!",
                  width: 600,
                  padding: "3em",
                  color: "#716add",
                  background: "#fff",
                  backdrop: `
                    rgba(0,0,123,0.4)
                    url("/moving-car.gif")
                    left top
                    no-repeat
                  `
            });
      }

      return (
            <>
                  <div className='fixed w-screen h-screen bg-black/40 z-50'>
                        <div className='fixed inset-0 flex items-center justify-center bg-deepBlue/40'>

                              {/* FORM */}
                              <div className={`relative bg-offWhite shadow-lg rounded-3xl flex flex-col gap-8 items-center p-20 `}>
                                    <IoMdClose onClick={() => setShowVehicleData(false)} className='text-5xl absolute top-4 right-4 cursor-pointer' />

                                    <h2 className='text-6xl text-bloe font-bold text-center '>Parking Out</h2>

                                    <div className='bg-[#EEE4E4] w-full rounded-2xl gap-8 flex justify-between p-8 font-bold'>
                                          <div>
                                                <p>Ticket Number</p>
                                                <p>Date</p>
                                                <p>Vehicle Type</p>
                                                <p>Time Duration</p>
                                                <p>Status</p>
                                          </div>

                                          <div className='border border-[#0000004F] my-2'></div>

                                          <div className='text-right'>
                                                <p>{selectedVehicle.ticketNumber}</p>
                                                <p>{moment(new Date(selectedVehicle.startDate)).format("DD-MM-YY")}</p>
                                                <p>{selectedVehicle.category}</p>
                                                <p>{
                                                      dayDifference != 0 ?
                                                            `${dayDifference} days ${hoursDifference} hours and ${minutesDifference} mins`
                                                            :
                                                            `${hoursDifference} hours and ${minutesDifference} mins`
                                                }</p>
                                                <p>{selectedVehicle.status ? "Parked In" : "Parked Out"}</p>
                                          </div>

                                    </div>

                                    <div className='flex my-auto items-center gap-6 '>
                                          <div>
                                                <p>Total Charge: <b> Php.{pricePerTicket}.00</b> </p>
                                                {hoursDifference >= hoursLimit && <p className='ml-24 font-bold'>(+ overstay)</p>}
                                          </div>

                                          <button onClick={handleRemove} className='bg-pink border-4 border-bloe hover:bg-[#c73838] py-2 px-8 text-2xl font-bold rounded-2xl text-white'>Remove</button>
                                    </div>


                              </div>
                        </div>
                  </div>

            </>
      )
}

export default ParkOutDetails