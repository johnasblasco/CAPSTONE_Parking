
import Header from './components/Header'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ManageVehicles from './pages/ManageVehicles';
import Reports from './pages/Reports';
import About from './pages/About';

const Home = () => {

      return (
            <div className='min-h-screen'>

                  <Routes>
                        <Route path='/dashboard' element={<Dashboard />} />
                        <Route path='/manage-vehicles' element={<ManageVehicles />} />
                        <Route path='/reports' element={<Reports />} />
                        <Route path='/about' element={<About />} />
                  </Routes>
                  <Header />
                  <Navbar />



            </div>
      )
}

export default Home