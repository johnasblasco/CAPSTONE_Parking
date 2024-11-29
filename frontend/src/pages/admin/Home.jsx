import { useEffect, useState, createContext } from "react"

// PAGES HERE
import ManageAccount from "./pages/ManageAccount"
import ManageVehicles from "./pages/ManageVehicles"
import Dashboard from "./pages/Dashboard"
import Reports from "./pages/Reports"
import io from 'socket.io-client';
import 'animate.css';

import axios from "axios"
import { Routes, Route } from 'react-router-dom'

import Header from './components/Header'
import Navbar from "./components/Navbar"

export const myContext = createContext();

const socket = io('https://capstone-parking.onrender.com');

const Home = () => {
      const [loading, setLoading] = useState(true)

      useEffect(() => {
            setTimeout(() => {
                  setLoading(false);
            }, 1000);
      }, []);


      // Testing 
      const [parkingRules, setParkingRules] = useState('');
      const [twoWheels, setTwoWheels] = useState(0);
      const [threeAndFourWheels, setThreeAndFourWheels] = useState(0);
      const [hoursLimit, setHoursLimit] = useState(0);
      const [overTimeFees, setOverTimeFees] = useState(0);
      const [ticket2, setTicket2] = useState(0);
      const [ticket34, setTicket34] = useState(0);



      const [vehicles, setVehicles] = useState([]);
      const [allVehicles, setAllVehicles] = useState([]);




      useEffect(() => {
            const fetchSettings = async () => {
                  try {
                        const response = await axios.get('https://capstone-parking.onrender.com/settings');
                        setParkingRules(response.data.parkingRules);
                        setTwoWheels(response.data.twoWheels);
                        setTicket34(response.data.ticket34);
                        setTicket2(response.data.ticket2);
                        setThreeAndFourWheels(response.data.threeAndFourWheels);
                        setHoursLimit(response.data.hoursLimit);
                        setOverTimeFees(response.data.overtimeFees);
                  } catch (err) {
                        console.error(err);
                  } finally {
                        setLoading(false);
                  }
            };

            fetchSettings();
      }, []);



      useEffect(() => {
            const fetchVehicles = async () => {
                  try {
                        const response = await axios.get('https://capstone-parking.onrender.com/vehicle');
                        setAllVehicles(response.data);
                        setVehicles(response.data.filter(vehicle => vehicle.status === true));
                  } catch (error) {
                        console.error(error);
                  } finally {
                        setTimeout(() => {
                              setLoading(false);
                        }, 1000);
                  }
            };

            fetchVehicles();
      }, []);

      useEffect(() => {
            console.log('Socket connected:', socket.connected);

            socket.on('vehicles', (vehicles) => {
                  setAllVehicles(vehicles);
                  setVehicles(vehicles.filter(vehicle => vehicle.status === true));
                  setLoading(false);
            });

            socket.on('newVehicle', (newVehicle) => {
                  setVehicles(prevVehicles => [...prevVehicles, newVehicle]);
                  setAllVehicles(prevVehicles => [...prevVehicles, newVehicle]);
            });

            socket.on('updateVehicle', (updatedVehicle) => {
                  setVehicles(prevVehicles =>
                        prevVehicles.filter(v => v.ticketNumber !== updatedVehicle.ticketNumber)
                  );
                  setAllVehicles(prevAllVehicles =>
                        prevAllVehicles.map(v =>
                              v.ticketNumber === updatedVehicle.ticketNumber ? updatedVehicle : v
                        )
                  );
            });

            return () => {
                  socket.off('vehicles');
                  socket.off('newVehicle');
                  socket.off('updateVehicle');
            };
      }, []);

      const myContextValue = [
            // socket,
            allVehicles,
            setAllVehicles,
            vehicles,
            setVehicles,
            // companyName,
            // parkingRules,
            // twoWheels,
            // threeAndFourWheels,
            // ticket34,
            // ticket2,
            hoursLimit,
            overTimeFees,
      ];

      if (loading) {
            return (
                  <div className="bg-[url('/BG.png')] bg-cover flex justify-center items-center h-screen">
                        <img src="/moving-car.gif" alt="Loading animation" />
                  </div>
            );
      }




      return (
            <div className='bg-no-repeat bg-bottom bg-[url("/BG.png")] bg-cover w-full fixed overflow-auto'>

                  <Header />
                  <myContext.Provider value={myContextValue}>
                        <div className='h-screen overflow-y-auto overflow-x-hidden'>
                              <Routes>
                                    <Route path="/manage-account" element={<ManageAccount />} />
                                    <Route path="/manage-vehicles" element={<ManageVehicles />} />
                                    <Route path="/dashboard" element={<Dashboard />} />
                                    <Route path="/reports" element={<Reports />} />
                              </Routes>
                        </div>
                  </myContext.Provider>
                  <Navbar />
            </div>

      )
}

export default Home