import { useEffect, useState, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import axios from 'axios';
import Header from './components/Header';
import io from 'socket.io-client';
import Swal from 'sweetalert2';
import 'animate.css';

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


      const [myImg, setMyImg] = useState('');

      useEffect(() => {
            const fetchLatestImage = async () => {
                  try {
                        const response = await axios.get('https://capstone-parking.onrender.com/latest-image');
                        const latestImageUrl = response.data.imageUrl;

                        if (latestImageUrl) {
                              setMyImg(latestImageUrl); // Update state with the fetched image URL
                        } else {
                              console.warn("No latest image found.");
                        }
                  } catch (err) {
                        console.error("Error fetching latest image:", err);
                  }
            };



            fetchLatestImage();
      }, []);


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
                        setLoading(false);
                  }
            };

            fetchSettings();
      }, []);

      // Display welcome modal
      useEffect(() => {
            console.log("myImg value in Home.jsx:", myImg);
            if (companyName && myImg) {
                  Swal.fire({
                        title: companyName,
                        text: "Welcome to Parking Management System",
                        imageUrl: myImg,
                        width: 700,
                        imageWidth: 300,
                        imageHeight: 300,
                        imageAlt: "Welcome image",
                  });
            }
      }, [companyName, myImg]);


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
                        <img src="/moving-car.gif" alt="Loading animation" />
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
                              </Routes>
                        </div>
                  </myContext.Provider>
            </div>
      );
};

export default Home;
