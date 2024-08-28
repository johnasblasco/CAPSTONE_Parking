import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ClientRoutes from './routes/ClientRoutes';
import AdminRoutes from './routes/AdminRoutes';

//SOCKET IO
import io from 'socket.io-client';
const socket = io('http://localhost:8000');

const App = () => {

      return (

            <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path="/admin/*" element={<AdminRoutes />} />
                  <Route path="/user/*" element={<ClientRoutes />} />
            </Routes>

      );
};

export default App;
