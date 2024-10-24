
import { useRef, useEffect, useState } from 'react';
import { Doughnut, Line } from 'react-chartjs-2';
import { FaMotorcycle, FaBicycle, FaCar, FaFilter } from 'react-icons/fa';
import { FaRegCalendar } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { MdLocalPrintshop } from "react-icons/md";
import { GiMoneyStack } from "react-icons/gi";
import Swal from 'sweetalert2';
import Print from '../components/Print';
import {
      Chart as ChartJS,
      ArcElement,
      Tooltip,
      Legend
} from 'chart.js/auto';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend);

const Reports = () => {
      const chartRef = useRef(null);
      const [totalEarnings, setTotalEarnings] = useState(0);
      const [totalVehicles, setTotalVehicles] = useState(0);
      const [TwoWheels, setTwoWheels] = useState(0);
      const [ThreeWheels, setThreeWheels] = useState(0);
      const [FourWheels, setFourWheels] = useState(0);
      const [users, setUsers] = useState([]);
      const [earningsData, setEarningsData] = useState([]);
      const [filteredData, setFilteredData] = useState([]);
      const [vehicles, setVehicles] = useState([]);
      const [filteredVehicles, setFilteredVehicles] = useState([]);
      const [startDate, setStartDate] = useState('');
      const [endDate, setEndDate] = useState('');
      const [showPrint, setShowPrint] = useState(false);



      const CHART_COLORS = {
            red: 'rgb(220 38 38)',
            green: 'rgb(34 197 94)',
            blue: 'rgb(0 53 102)',
      };

      const data = {
            labels: ['TwoWheels', 'ThreeWheels', 'FourWheels'],
            datasets: [
                  {
                        label: 'Vehicle Categories',
                        data: [TwoWheels, ThreeWheels, FourWheels],
                        backgroundColor: [
                              CHART_COLORS.red,
                              CHART_COLORS.green,
                              CHART_COLORS.blue,
                        ],
                  },
            ],
      };

      const earningsChartData = {
            labels: filteredData.map(entry => entry.date),
            datasets: [
                  {
                        label: 'Daily Total Earnings',
                        data: filteredData.map(entry => entry.totalEarnings),
                        fill: true,
                        borderColor: 'rgb(34 197 94)',
                        backgroundColor: 'rgba(34, 197, 94, 0.3)',
                        tension: 0.4,
                        borderWidth: 2,
                        pointRadius: 4,
                        pointBackgroundColor: 'rgb(75, 192, 192)'
                  }
            ]
      };

      useEffect(() => {
            // Fetch all vehicles and users on component mount
            axios.get("http://localhost:8000/vehicle")
                  .then(response => {
                        setVehicles(response.data);
                        setFilteredVehicles(response.data); // Initially, show all vehicles
                        updateVehicleCounts(response.data); // Update counts initially
                        setTotalVehicles(response.data.length);
                  });

            axios.get("http://localhost:8000/user")
                  .then(response => {
                        setUsers(response.data);
                  });

            axios.get("http://localhost:8000/earnings")
                  .then(response => {
                        const earningsByDate = {};
                        response.data.forEach(item => {
                              const date = new Date(item.currentDate).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit'
                              });
                              if (!earningsByDate[date]) {
                                    earningsByDate[date] = 0;
                              }
                              earningsByDate[date] += item.earnings;
                        });

                        const earningsArray = Object.keys(earningsByDate).map(date => ({
                              date,
                              totalEarnings: earningsByDate[date]
                        }));

                        setEarningsData(earningsArray);
                        setFilteredData(earningsArray); // Initially, filtered data is the same as all earnings data

                        const sumOfTotal = earningsArray.reduce((acc, item) => acc + item.totalEarnings, 0);
                        setTotalEarnings(sumOfTotal);
                  });
      }, []);

      const updateVehicleCounts = (vehicles) => {
            const twoWheelsCount = vehicles.filter(vehicle => vehicle.category === '2 Wheels').length;
            const threeWheelsCount = vehicles.filter(vehicle => vehicle.category === '3 Wheels').length;
            const fourWheelsCount = vehicles.filter(vehicle => vehicle.category === '4 Wheels').length;

            setTwoWheels(twoWheelsCount);
            setThreeWheels(threeWheelsCount);
            setFourWheels(fourWheelsCount);
      };

      const handleFilter = () => {
            if (startDate && endDate) {
                  const filtered = earningsData.filter(entry => {
                        const entryDate = new Date(entry.date);
                        return entryDate >= new Date(startDate) && entryDate <= new Date(endDate);
                  });
                  setFilteredData(filtered);
            } else {
                  setFilteredData(earningsData); // Reset filter if no dates are selected
            }
      };

      const handleDateSelection = async () => {
            const { value: date } = await Swal.fire({
                  title: "Select Date",
                  html: `<input type="date" id="startDate" required>`,
                  focusConfirm: true,
                  width: 500,
                  preConfirm: () => {
                        const start = document.getElementById('startDate').value;
                        return { start };
                  },
                  showCancelButton: true,
                  confirmButtonText: "Submit",
            });

            if (date) {
                  const { start } = date;
                  setStartDate(start);
                  filterVehiclesByStartDate(start);
            }
      };

      const filterVehiclesByStartDate = (start) => {
            const filtered = vehicles.filter(vehicle => {
                  const vehicleStartDate = new Date(vehicle.startDate);
                  return vehicleStartDate >= new Date(start); // Compare dates
            });
            setFilteredVehicles(filtered);
            updateVehicleCounts(filtered); // Update counts based on filtered vehicles
      };


      return (
            <>
                  <div className='mx-[10%] pb-12 h-max-700:mt-[35vh] mt-[25vh] w-[80vw] text-deepBlue'>


                        {/* TOTALS REPORTS */}
                        <div className='flex  mb-12 gap-5 justify-start w-full h-[20vh]'>
                              {/* Total Vehicles */}
                              <div className='h-max-700:p-16 flex gap-4 items-center pt-10 justify-center relative border-4 border-deepBlue shadow-2xl rounded-3xl bg-offWhite p-2 w-[30%]'>
                                    <p className='border-4 border-deepBlue font-bold absolute left-[-35px] top-2 bg-yeelow py-1 px-4 text-lg rounded-3xl'>Total Parked Vehicles</p>
                                    <FaCar className='text-7xl ' />
                                    <p className='h-max-700:text-4xl text-6xl font-bold text-deepBlue'> {totalVehicles}</p>
                              </div>
                              {/* Total Earnings */}
                              <div className='h-max-700:p-16 flex gap-4 items-center pt-10 justify-center relative border-4 border-deepBlue shadow-2xl rounded-3xl bg-offWhite p-2 w-[30%]'>
                                    <p className='border-4 border-deepBlue font-bold absolute left-[-35px] top-2 bg-yeelow py-1 px-4 text-lg rounded-3xl'>Total Earnings</p>
                                    <GiMoneyStack className='text-7xl' />

                                    <p className='h-max-700:text-4xl text-6xl font-bold text-deepBlue'>₱{totalEarnings}.00</p>
                              </div>
                              {/* Total Employees */}
                              <div className='h-max-700:p-16 flex gap-4 items-center pt-10 justify-center relative border-4 border-deepBlue shadow-2xl rounded-3xl bg-offWhite p-2 w-[30%]'>
                                    <p className='border-4 border-deepBlue font-bold absolute left-[-35px] top-2 bg-yeelow py-1 px-4 text-lg rounded-3xl'>Total Employees</p>
                                    <FaUser className='text-6xl' />
                                    <p className='h-max-700:text-4xl text-6xl font-bold text-deepBlue'>{users.length}</p>
                              </div>

                              <div className=' h-max-700:p-16 flex gap-4 items-center  justify-center relative border-4 border-deepBlue shadow-2xl rounded-3xl bg-offWhite w-[20%]'>
                                    <button onClick={() => setShowPrint(!showPrint)} className='font-extrabold text-end bg-bloe hover:scale-95 rounded-2xl p-2 text-2xl text-white'>
                                          <MdLocalPrintshop className='inline text-7xl' />
                                    </button>

                              </div>


                        </div>
                        {/* END OF TOTALS REPORTS */}
                        {/* -------------------------------------------------------------- */}
                        <div className='flex gap-4'>

                              <div className="max-h-[700px] flex relative pt-24 p-12 shadow-2xl border-4 min-w-[70%] border-bloe bg-white rounded-3xl">
                                    <p className='border-4 border-deepBlue font-bold absolute left-[-35px] top-2 bg-yeelow py-1 px-8 text-lg rounded-3xl'>Total Vehicle Reports</p>

                                    <div className="flex flex-row items-center justify-evenly w-full">
                                          {TwoWheels + ThreeWheels + FourWheels > 0 ? (
                                                <>
                                                      <Doughnut className='w-96 h-96' ref={chartRef} data={data} />


                                                      {/* Right Side Text Section with Icons */}
                                                      <div className=" flex flex-col gap-8 ml-4">
                                                            <p className='border-4 border-deepBlue font-bold w-fit bg-yeelow py-1 px-12 text-lg rounded-2xl'>Filter By Date</p>

                                                            <button onClick={handleDateSelection} className='border-2 border-green-500 h-12 text-xl font-bold bg-greenWich hover:scale-95 rounded-2xl p-2 px-4 text-white' >
                                                                  <FaFilter className='inline ' />  MM / DD / YYYY <FaRegCalendar className='ml-36 inline text-2xl' />
                                                            </button>



                                                            <div className="flex items-center text-xl font-semibold text-gray-800 mb-2">
                                                                  <img src="/motorcycle.png" className='w-32 h-32' alt="" />
                                                                  <p>Total Two-Wheel Vehicles: <span className="font-bold text-6xl text-red-600">{TwoWheels}</span></p>
                                                            </div>
                                                            <div className="flex items-center text-xl font-semibold text-gray-800 mb-2">
                                                                  <img src="/tricycle.png" className='w-32 h-32' alt="" />
                                                                  <p>Total Three-Wheel Vehicles: <span className="font-bold text-6xl text-greenWich">{ThreeWheels}</span></p>
                                                            </div>
                                                            <div className="flex items-center text-xl font-semibold text-gray-800 mb-2">
                                                                  <img src="/car.png" className='w-32 h-32' alt="" />
                                                                  <p>Total Four-Wheel Vehicles: <span className="font-bold text-6xl text-bloe">{FourWheels}</span></p>
                                                            </div>
                                                      </div>
                                                </>
                                          ) : (
                                                <div>
                                                      <button
                                                            onClick={() => {
                                                                  setStartDate(''); // Clear the start date
                                                                  setEndDate('');   // Clear the end date
                                                                  setFilteredVehicles(vehicles); // Reset the filtered vehicles to the original data
                                                                  updateVehicleCounts(vehicles); // Optionally update counts based on original vehicles
                                                            }}
                                                            className="text-2xl bg-gray-200 text-bloe font-semibold py-2 mt-2 rounded-xl border-4 border-gray-200 transition-transform duration-400 hover:scale-95 hover:bg-gray-300"
                                                      >
                                                            Reset Filter
                                                      </button>
                                                      {filteredVehicles.length === 0 && (
                                                            <p className="text-center text-lg font-semibold text-gray-700">No data available</p>
                                                      )}
                                                </div>
                                          )}
                                    </div>
                              </div>

                              {/* EMPLOYEE TABLE */}
                              <div className="text-xl max-h-[700px] relative w-[40%] shadow-2xl border-4 border-bloe bg-white rounded-3xl overflow-y-auto p-4">
                                    <p className='border-4 border-deepBlue font-bold mx-auto w-fit my-4 bg-yeelow py-1 px-8 text-lg rounded-3xl'>Employee Accounts</p>

                                    <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
                                          <thead className="bg-deepBlue text-white text-center">
                                                <tr>
                                                      <th className="px-6 py-4 text-sm font-semibold">Name</th>
                                                      <th className="px-6 py-4 text-sm font-semibold">Status</th>
                                                </tr>
                                          </thead>
                                          <tbody className='text-center'>
                                                {users.map((user, index) => (
                                                      <tr key={index} className={`transition-transform duration-300 hover:scale-105 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} border-b border-gray-200 hover:bg-gray-200`}>
                                                            <td className="px-6 py-4 text-deepBlue font-semibold">{user.name}</td>
                                                            <td className={`px-6 py-4 font-semibold ${user.status ? 'text-green-600' : 'text-pink'}`}>
                                                                  {user.status ? "ACTIVATED" : "DEACTIVATED"}
                                                            </td>
                                                      </tr>
                                                ))}
                                          </tbody>
                                    </table>
                              </div>


                        </div>



                        {/* Chart and User List */}
                        <div className='mt-8 flex gap-4 max-h-[700px]'>

                              {/* CHARTS OF EARNINGS*/}
                              <div className=" relative w-full  shadow-2xl border-4 border-bloe bg-white rounded-3xl p-6">

                                    <p className='border-4 border-deepBlue font-bold absolute left-[-35px] top-2 bg-yeelow py-1 px-8 text-lg rounded-3xl'>All-time Earnings</p>
                                    <Line className='w-mt-6 mt-4' data={earningsChartData} />
                              </div>
                              {/* END OF CHARTS OF EARNINGS*/}


                              {/* FILTER */}
                              <div className="text-2xl relative p-6 w-[40%] shadow-2xl border-4 border-bloe bg-white rounded-3xl overflow-y-auto">
                                    <p className=' border-4 border-deepBlue font-bold mx-auto w-fit bg-yeelow py-1 px-8 text-lg rounded-3xl'>Filter By Date</p>
                                    <div className="flex flex-col gap-4">
                                          <label className='flex flex-col'>
                                                <span className="font-semibold text-deepBlue">Start Date:</span>
                                                <input
                                                      type="date"
                                                      className="border-4 border-deepBlue p-2 rounded-2xl focus:ring-2 focus:ring-bloe focus:outline-none transition-transform duration-400 hover:scale-95"
                                                      value={startDate}
                                                      onChange={(e) => setStartDate(e.target.value)}
                                                />
                                          </label>
                                          <label className='flex flex-col'>
                                                <span className="font-semibold text-deepBlue">End Date:</span>
                                                <input
                                                      type="date"
                                                      className="border-4 border-deepBlue p-2 rounded-2xl focus:ring-2 focus:ring-bloe focus:outline-none transition-transform duration-400 hover:scale-95"
                                                      value={endDate}
                                                      onChange={(e) => setEndDate(e.target.value)}
                                                />
                                          </label>
                                          <button
                                                onClick={handleFilter}
                                                className="bg-greenWich/90 text-white font-semibold py-2 mt-2 rounded-xl transition-transform duration-400 hover:scale-95 "
                                          >
                                                Apply Filter
                                          </button>
                                          <button
                                                onClick={() => {
                                                      setStartDate('');
                                                      setEndDate('');
                                                      setFilteredData(earningsData); // Reset the filtered data to the original data
                                                }}
                                                className="bg-gray-200 text-bloe font-semibold py-2 mt-2 rounded-xl border-4 border-gray-200 transition-transform duration-400 hover:scale-95 hover:bg-gray-300"
                                          >
                                                Reset Filter
                                          </button>
                                    </div>
                              </div>

                        </div>

                        {/* END OF CHARTS AND TABLE */}


                        {/* Show Print */}
                        {
                              showPrint && <Print setShowPrint={setShowPrint} showPrint={showPrint} />

                        }
                  </div>



            </>
      );

}

export default Reports;
