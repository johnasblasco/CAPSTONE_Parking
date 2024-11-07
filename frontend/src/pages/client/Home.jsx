import { useEffect, useRef, useState, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ManageVehicles from './pages/ManageVehicles';
import Reports from './pages/Reports';
import axios from 'axios';
import Header from './components/Header';
import Navbar from './components/Navbar';
import io from 'socket.io-client';
import Swal from 'sweetalert2';
import 'animate.css'

export const myContext = createContext();
const socket = io('https://capstone-parking.onrender.com');

const Home = () => {
      const [companyName, setCompanyName] = useState('');
      const [parkingRules, setParkingRules] = useState('');
      const [twoWheels, setTwoWheels] = useState(0);
      const [threeAndFourWheels, setThreeAndFourWheels] = useState(0);
      const [hoursLimit, setHoursLimit] = useState(0);
      const [overTimeFees, setOverTimeFees] = useState(0);
      const [ticket2, setTicket2] = useState(0);
      const [ticket34, setTicket34] = useState(0);
      const [vehicles, setVehicles] = useState([]);
      const [allVehicles, setAllVehicles] = useState([]);
      const [loading, setLoading] = useState(true);
      const [myImg, setMyImg] = useState(null);


      useEffect(() => {
            const fetchSettings = async () => {
                  try {
                        const response = await axios.get('https://capstone-parking.onrender.com/settings');
                        setCompanyName(response.data.companyName);
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
                        setTimeout(() => {
                              setLoading(false);
                        }, 1000);
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
            axios.get('https://capstone-parking.onrender.com/upload')
                  .then(response => setMyImg(response.data));
            if (companyName) {
                  setTimeout(() => {
                        Swal.fire({
                              title: `${companyName}`,
                              text: "Welcome to Parking Management System",
                              imageUrl: `/uploads/` + myImg,
                              width: 700,
                              imageWidth: 300,
                              imageHeight: 300,
                              imageAlt: "Custom image",
                              showClass: {
                                    popup: 'animate__animated animate__fadeInUp animate__faster'
                              },
                              hideClass: {
                                    popup: 'animate__animated animate__fadeOutDown animate__faster'
                              }
                        });
                  }, 1500)

            }
      }, [companyName]);

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
                  setVehicles(prevVehicle => prevVehicle.filter(V => V.ticketNumber !== updatedVehicle.ticketNumber));
            });


            return () => {
                  socket.off('vehicles');
                  socket.off('newVehicle');
                  socket.off('updateVehicle');
            };
      }, []);





      const myContextValue = [
            socket,
            allVehicles,
            setAllVehicles,
            vehicles,
            setVehicles,
            companyName,
            parkingRules,
            twoWheels,
            threeAndFourWheels,
            ticket34,
            ticket2,
            hoursLimit,
            overTimeFees,
      ];

      if (loading) {
            return (
                  <div className="bg-[url('/BG.png')] bg-cover flex justify-center items-center h-screen">
                        {/* <PropagateLoader color="#ff5400" size={30} /> */}
                        <img src="/moving-car.gif" alt="" />
                  </div>
            );
      }

      return (
            <div className='bg-no-repeat bg-bottom bg-[url("/BG.png")] bg-cover w-full fixed overflow-auto'>

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
