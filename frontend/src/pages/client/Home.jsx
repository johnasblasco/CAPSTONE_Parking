import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ManageVehicles from './pages/ManageVehicles';
import Reports from './pages/Reports';
import axios from 'axios';
import PropagateLoader from 'react-spinners/PropagateLoader';
import Header from './components/Header';
import Navbar from './components/Navbar';



// SOCKET IO
import io from 'socket.io-client';
const socket = io('http://localhost:8000');

import { useEffect, useState, createContext } from 'react';
export const myContext = createContext();

const Home = () => {
      const [vehicles, setVehicles] = useState([]);
      const [allVehicles, setAllVehicles] = useState([]);
      const [totalEarnings, setTotalEarnings] = useState({});
      const [todayEarn, setTodayEarn] = useState(0);
      const [yesterdayEarnings, setYesterdayEarnings] = useState(0);
      const [earnings, setEarnings] = useState({});
      const now = new Date();
      const [currentEarningDate, setCurrentEarningDate] = useState();

      const [loading, setLoading] = useState(true); // New loading state

      const myContextValue = [
            socket,
            allVehicles,
            totalEarnings,
            todayEarn,
            setTodayEarn,
            yesterdayEarnings,
            vehicles,
            setVehicles,
            setTotalEarnings,
            earnings,
            setEarnings,
      ];

      // Use socket to get vehicles data
      useEffect(() => {
            socket.on('vehicles', (vehicles) => {
                  setAllVehicles(vehicles);

                  const vehicleTrue = vehicles.filter(vehicle => vehicle.status === true);
                  setVehicles(vehicleTrue);

                  setLoading(false);  // Data is fetched, stop loading
            });

            socket.on('newVehicle', (newVehicle) => {
                  setVehicles(prevVehicle => [...prevVehicle, newVehicle]);
            });

            socket.on('updateVehicle', (updatedVehicle) => {
                  setVehicles(prevVehicle => prevVehicle.filter(V => V.ticketNumber !== updatedVehicle.ticketNumber));
            });

            socket.on('updateEarnings', (newEarnings) => {
                  setTotalEarnings(newEarnings.totalEarnings);
                  setTodayEarn(newEarnings.todayEarnings);
                  console.log("NEW EARNINGS", newEarnings)
            })

            return () => {
                  if (socket) {
                        socket.off('vehicles');
                        socket.off('newVehicle');
                        socket.off('updateVehicle');
                        socket.off('updateEarnings');
                  }
            };
      }, []);


      // Fetch Vehicle Data
      useEffect(() => {
            axios.get('http://localhost:8000/vehicle')
                  .then((response) => {
                        console.log("RESPONSE DATA", response.data)
                        setAllVehicles(response.data);

                        const vehicleTrue = response.data.filter(vehicle => vehicle.status === true);
                        setVehicles(vehicleTrue);

                        setLoading(false);  // Data is fetched, stop loading
                  })

      }, [])

      // Fetch earnings data
      useEffect(() => {
            axios.get('http://localhost:8000/earnings')
                  .then((response) => {
                        setEarnings(response.data[0]);
                        setCurrentEarningDate(new Date(response.data[0].currentDate));
                        setTotalEarnings(response.data[0].totalEarnings);
                        setTodayEarn(response.data[0].todayEarnings);
                        setYesterdayEarnings(response.data[0].yesterdayEarnings);

                        // setLoading(false); // Data is fetched, stop loading
                  })
                  .catch(err => console.log(err));
      }, []);

      // Reset earnings if needed
      // useEffect(() => {
      //       if (currentEarningDate) {
      //             if (
      //                   now.getFullYear() !== currentEarningDate.getFullYear() ||
      //                   now.getMonth() !== currentEarningDate.getMonth() ||
      //                   now.getDay() !== currentEarningDate.getDay()
      //             ) {
      //                   setEarnings(prevEarnings => {
      //                         axios.put(`http://localhost:8000/earnings/${prevEarnings._id}`, {
      //                               ...prevEarnings,
      //                               currentDate: now.toISOString(),
      //                               todayEarnings: 0,
      //                               yesterdayEarnings: prevEarnings.todayEarnings,
      //                         })
      //                               .then(response => {
      //                                     setYesterdayEarnings(response.data.yesterdayEarnings);
      //                                     setTodayEarn(0);
      //                               })
      //                               .catch(err => console.error('Error updating earnings:', err));
      //                         return prevEarnings;
      //                   });
      //             } else {
      //                   console.log("Earnings data for today is already up to date.");
      //             }
      //       }
      // }, [currentEarningDate, now]);

      // Show loading spinner until data is fetched
      if (loading) {
            return (
                  <PropagateLoader
                        color="#ff5400"
                        size={30}
                        className='absolute top-[50dvh] left-[50dvw] w-fit'
                  />
            );
      }


      return (
            <div className='bg-no-repeat bg-bottom bg-[url("BG.png")] bg-cover w-full fixed overflow-auto'>
                  <myContext.Provider value={myContextValue}>
                        <Header />
                        <div className='h-screen overflow-y-auto overflow-x-hidden'>
                              <Routes>
                                    <Route path='/dashboard' element={<Dashboard />} />
                                    <Route path='/manage-vehicles' element={<ManageVehicles />} />
                                    <Route path='/reports' element={<Reports />} />
                              </Routes>
                        </div>
                        <Navbar />
                  </myContext.Provider>
            </div>

      );
};

export default Home;
