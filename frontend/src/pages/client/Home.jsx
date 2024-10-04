import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ManageVehicles from './pages/ManageVehicles';
import Reports from './pages/Reports';
import axios from 'axios';
import PropagateLoader from 'react-spinners/PropagateLoader';
import Header from './components/Header';
import Navbar from './components/Navbar';
import io from 'socket.io-client';
import { useEffect, useState, createContext } from 'react';
import Swal from 'sweetalert2';
import 'animate.css';

export const myContext = createContext();
const socket = io('http://localhost:8000');

const Home = () => {
      // SETTINGS
      const [companyName, setCompanyName] = useState('');
      const [parkingRules, setParkingRules] = useState('');
      const [twoWheels, setTwoWheels] = useState(0);
      const [threeAndFourWheels, setThreeAndFourWheels] = useState(0);
      const [pricePerTicket, setPricePerTicket] = useState(0);
      const [hoursLimit, setHoursLimit] = useState(0);
      const [overTimeFees, setOverTimeFees] = useState(0);

      const [vehicles, setVehicles] = useState([]);
      const [allVehicles, setAllVehicles] = useState([]);
      const [loading, setLoading] = useState(true);

      // Fetch Settings data
      useEffect(() => {
            const fetchSettings = async () => {
                  try {
                        const response = await axios.get('http://localhost:8000/settings');
                        setCompanyName(response.data.companyName);
                        setParkingRules(response.data.parkingRules);
                        setTwoWheels(response.data.twoWheels);
                        setThreeAndFourWheels(response.data.threeAndFourWheels);
                        setPricePerTicket(response.data.pricePerTicket);
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

      // Fetch Vehicle Data
      useEffect(() => {
            const fetchVehicles = async () => {
                  try {
                        const response = await axios.get('http://localhost:8000/vehicle');
                        setAllVehicles(response.data);
                        setVehicles(response.data.filter(vehicle => vehicle.status === true));
                  } catch (error) {
                        console.error(error);
                  } finally {
                        setLoading(false);
                  }
            };

            fetchVehicles();
      }, []);

      // SweetAlert only when companyName is available
      useEffect(() => {
            if (companyName) {
                  Swal.fire({
                        title: `${companyName}`,
                        text: "Welcome to Parking Management System",
                        imageUrl: "/uploads/uploaded-image.jpeg",
                        width: 700,
                        imageWidth: 400,
                        imageHeight: 300,
                        imageAlt: "Custom image",
                        showClass: {
                              popup: 'animate__animated animate__fadeInUp animate__faster'
                        },
                        hideClass: {
                              popup: 'animate__animated animate__fadeOutDown animate__faster'
                        }
                  });
            }
      }, [companyName]);

      // Socket handling for vehicle data
      useEffect(() => {
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
                  setVehicles(prevVehicles => prevVehicles.filter(v => v.ticketNumber !== updatedVehicle.ticketNumber));
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
            pricePerTicket,
            hoursLimit,
            overTimeFees,
      ];

      if (loading) {
            return (
                  <div className="flex justify-center items-center h-screen">
                        <PropagateLoader color="#ff5400" size={30} />
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
