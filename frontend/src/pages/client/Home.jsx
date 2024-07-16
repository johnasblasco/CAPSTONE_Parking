
import Header from './components/Header'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ManageVehicles from './pages/ManageVehicles';
import Reports from './pages/Reports';
import About from './pages/About';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
      const [vehicles, setVehicles] = useState([])

      useEffect(() => {

            axios.get("http://localhost:8000/vehicle")
                  .then((response) => {
                        setVehicles(response.data)
                  })
                  .catch(err => console.log(err))

      }, [])

      return (
            <div className='min-h-screen'>


                  <Routes>
                        <Route path='/dashboard' element={<Dashboard vehicles={vehicles} />} />
                        <Route path='/manage-vehicles' element={<ManageVehicles vehicles={vehicles} />} />
                        <Route path='/reports' element={<Reports />} />
                        <Route path='/about' element={<About />} />
                  </Routes>





            </div>
      )
}

export default Home