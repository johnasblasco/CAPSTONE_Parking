import { Routes, Route } from 'react-router-dom'
import Admin from '../pages/admin/Admin';
import Home from '../pages/admin/Home';
const AdminRoutes = () => {
      return (
            <Routes>
                  <Route path='/' element={<Admin />} />
                  <Route path='/home/*' element={<Home />} />
            </Routes>
      )
}

export default AdminRoutes