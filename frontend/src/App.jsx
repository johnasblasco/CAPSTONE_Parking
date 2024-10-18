import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ClientRoutes from './routes/ClientRoutes';
import AdminRoutes from './routes/AdminRoutes';
import Pages from './get-started/Pages';
import GetStarted from './get-started/components/GetStarted';
import AOS from 'aos';
import 'aos/dist/aos.css';

const App = () => {

      useEffect(() => {
            AOS.init({ duration: 700, easing: 'linear', once: true });

      }, []);

      return (
            <>
                  <Routes>
                        <Route path='/' element={<Pages />} />
                        <Route path='/get-started' element={<GetStarted />} />
                        <Route path='/login' element={<Home />} />
                        <Route path="/admin/*" element={<AdminRoutes />} />
                        <Route path="/user/*" element={<ClientRoutes />} />
                  </Routes>
            </>
      );
};

export default App;
