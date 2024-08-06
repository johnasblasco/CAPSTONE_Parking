
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
      const [earnings, setEarnings] = useState(0)

      const myContextValue = [allVehicles, totalEarnings, todayEarn, setTodayEarn, vehicles, setVehicles, setTotalEarnings, earnings, setEarnings]


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
                        setTotalEarnings(response.data[0].totalEarnings);
                        setTodayEarn(response.data[0].todayEarnings)
                  })
                  .catch(err => console.log(err));
      }, [])


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