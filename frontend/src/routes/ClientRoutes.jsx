import Client from '../pages/client/Client';
import Home from '../pages/client/Home';
import { Routes, Route } from 'react-router-dom'
const ClientRoutes = () => {
      return (
            <Routes>
                  <Route path='/' element={<Client />} />
                  <Route path='/home/*' element={<Home />} />

            </Routes>
      )
}

export default ClientRoutes