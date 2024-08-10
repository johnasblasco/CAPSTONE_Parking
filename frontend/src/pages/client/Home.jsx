
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ManageVehicles from './pages/ManageVehicles';
import Reports from './pages/Reports';
import About from './pages/About';
import axios from 'axios';


import { useEffect, useState, createContext } from 'react';
export const myContext = createContext()




const Home = () => {
      const [vehicles, setVehicles] = useState([-1])
      const [allVehicles, setAllVehicles] = useState([-1])
      const [totalEarnings, setTotalEarnings] = useState({})
      const [todayEarn, setTodayEarn] = useState(0);
      const [yesterdayEarnings, setYesterdayEarnings] = useState(0)
      const [earnings, setEarnings] = useState({})
      const now = new Date();
      const [currentEarningDate, setCurrentEarningDate] = useState();

      const myContextValue = [allVehicles, totalEarnings, todayEarn, setTodayEarn, yesterdayEarnings, vehicles, setVehicles, setTotalEarnings, earnings, setEarnings]



      useEffect(() => {

            // Fetch Vehicles
            axios.get("http://localhost:8000/vehicle")
                  .then((response) => {
                        const allVehicle = response.data
                        setAllVehicles(allVehicle)

                        const vehicleTrue = response.data.filter(vehicle => vehicle.status == true)
                        setVehicles(vehicleTrue)
                  })
                  .catch(err => console.log(err))


            // Fetch total earnings
            axios.get('http://localhost:8000/earnings')
                  .then((response) => {

                        setEarnings(response.data[0])
                        setCurrentEarningDate(new Date(response.data[0].currentDate))
                        setTotalEarnings(response.data[0].totalEarnings);
                        setTodayEarn(response.data[0].todayEarnings)
                        setYesterdayEarnings(response.data[0].yesterdayEarnings)
                  })
                  .catch(err => console.log(err));


      }, [todayEarn])


      useEffect(() => {
            if (currentEarningDate) {
                  // RESET EARNINGS IF NEW DAY, MONTH, YEAR
                  if (now.getFullYear() !== currentEarningDate.getFullYear() ||
                        now.getMonth() !== currentEarningDate.getMonth() ||
                        now.getDay() !== currentEarningDate.getDay()) {

                        // Update earnings and reset today’s earnings
                        setEarnings(prevEarnings => {
                              axios.put(`http://localhost:8000/earnings/${prevEarnings._id}`, {
                                    ...prevEarnings,
                                    currentDate: now.toISOString(),
                                    todayEarnings: 0,
                                    yesterdayEarnings: prevEarnings.todayEarnings,
                              })
                                    .then(response => {
                                          // Handle success
                                          // Reset todayEarn after updating yesterdayEarnings
                                          console.log("what the cfuck1", response.data)

                                    })
                                    .catch(err => {
                                          console.error('Error updating earnings:', err);
                                    });
                              return prevEarnings; // Return the current earnings to avoid updating state incorrectly
                        });
                  } else {
                        console.log("Earnings data for today is already up to date.");
                  }
            }
      }, [currentEarningDate, now]);


      return (
            <div className='min-h-screen'>

                  <myContext.Provider value={myContextValue}>
                        <Routes>


                              <Route path='/dashboard' element={<Dashboard />} />
                              <Route path='/manage-vehicles' element={<ManageVehicles />} />
                              <Route path='/reports' element={<Reports />} />
                              <Route path='/about' element={<About />} />

                        </Routes>

                  </myContext.Provider>




            </div>
      )
}

export default Home