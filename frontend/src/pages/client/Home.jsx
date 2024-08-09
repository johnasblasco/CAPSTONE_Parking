
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
      const [currentEarningDate, setCurrentEarningDate] = useState(null);

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
                  })
                  .catch(err => console.log(err));






      }, [])

      if (currentEarningDate) {
            // RESET EARNINGS IF NEW DAY, MONTH, YEAR

            // Check if the year, month, or day are different
            if (now.getFullYear() !== currentEarningDate.getFullYear() ||
                  now.getMonth() !== currentEarningDate.getMonth() ||
                  now.getDate() !== currentEarningDate.getDate()) {

                  // Update the earnings and reset today’s earnings
                  axios.put('http://localhost:8000/earnings', {
                        ...earnings,
                        currentDate: now.toISOString(), // Convert date to ISO string for consistency
                        todayEarnings: 0,
                        yesterdayEarnings: todayEarn,
                  })
                        .then(response => {
                              // Handle success
                              setEarnings(response.data);
                              setCurrentEarningDate(now);
                              setTodayEarn(0);
                        })
                        .catch(err => {
                              console.error('Error updating earnings:', err);
                        });
            } else {
                  console.log("Earnings data for today is already up to date.");
            }
      }


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