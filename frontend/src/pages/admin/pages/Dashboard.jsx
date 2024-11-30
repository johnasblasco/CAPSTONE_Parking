import { useRef, useEffect, useState } from 'react';
import { Doughnut, Line } from 'react-chartjs-2';
import { FaMotorcycle, FaBicycle, FaCar, FaFilter } from 'react-icons/fa';
import { FaUser } from "react-icons/fa";
import { MdLocalPrintshop } from "react-icons/md";
import { GiMoneyStack } from "react-icons/gi";
import DoughnutComponents from '../components/DoughnutComponents';
import Print from '../components/Print';
import {
      Chart as ChartJS,
      ArcElement,
      Tooltip,
      Legend
} from 'chart.js/auto';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
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
      const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]); // Set today as default
      const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]); // Set today as default for endDate
      const [showPrint, setShowPrint] = useState(false);



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
            // Fetch all vehicles, users, and earnings on component mount
            const fetchData = async () => {
                  try {
                        const vehiclesResponse = await axios.get("https://capstone-parking.onrender.com/vehicle");

                        setVehicles(vehiclesResponse.data);
                        setFilteredVehicles(vehiclesResponse.data);
                        updateVehicleCounts(vehiclesResponse.data);
                        setTotalVehicles(vehiclesResponse.data.length);

                        const usersResponse = await axios.get("https://capstone-parking.onrender.com/user");

                        setUsers(usersResponse.data.filter(user => user.status == true))

                        const earningsResponse = await axios.get("https://capstone-parking.onrender.com/earnings");

                        const earningsByDate = {};
                        earningsResponse.data.forEach(item => {
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
                        setFilteredData(earningsArray);

                        const sumOfTotal = earningsArray.reduce((acc, item) => acc + item.totalEarnings, 0);
                        setTotalEarnings(sumOfTotal);
                  } catch (error) {
                        console.error("Error fetching data:", error);
                  }
            };

            fetchData();
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


      return (
            <>
                  <div className='mx-[10%] pb-12 h-max-700:mt-[35vh] mt-[25vh] w-[80vw] text-deepBlue'>


                        {/* TOTALS REPORTS */}
                        <div className='flex  mb-12 gap-5 justify-start w-full h-[20vh]'>
                              {/* Total Vehicles */}
                              <div className='h-max-700:p-16 flex gap-4 items-center pt-10 justify-center relative border-4 border-deepBlue shadow-2xl rounded-3xl bg-white p-2 w-[30%]'>
                                    <p className='border-4 border-deepBlue font-bold absolute left-[-35px] top-2 bg-yeelow py-1 px-4 text-lg rounded-3xl'>Total Parked Vehicles</p>
                                    <FaCar className='text-7xl ' />
                                    <p className='h-max-700:text-4xl text-6xl font-bold text-deepBlue'> {totalVehicles}</p>
                              </div>
                              {/* Total Earnings */}
                              <div className='h-max-700:p-16 flex gap-4 items-center pt-10 justify-center relative border-4 border-deepBlue shadow-2xl rounded-3xl bg-white p-2 w-[30%]'>
                                    <p className='border-4 border-deepBlue font-bold absolute left-[-35px] top-2 bg-yeelow py-1 px-4 text-lg rounded-3xl'>Total Earnings</p>
                                    <GiMoneyStack className='text-7xl' />

                                    <p className='h-max-700:text-4xl text-6xl font-bold text-deepBlue'>₱{totalEarnings}.00</p>
                              </div>
                              {/* Total Employees */}
                              <div className='h-max-700:p-16 flex gap-4 items-center pt-10 justify-center relative border-4 border-deepBlue shadow-2xl rounded-3xl bg-white p-2 w-[30%]'>
                                    <p className='border-4 border-deepBlue font-bold absolute left-[-35px] top-2 bg-yeelow py-1 px-4 text-lg rounded-3xl'>Total Employees</p>
                                    <FaUser className='text-6xl' />
                                    <p className='h-max-700:text-4xl text-6xl font-bold text-deepBlue'>{users.length}</p>
                              </div>

                              <div className=' h-max-700:p-16 flex gap-4 items-center  justify-center relative border-4 border-deepBlue shadow-2xl rounded-3xl bg-white w-[20%]'>
                                    <button onClick={() => setShowPrint(!showPrint)} className='font-extrabold text-end bg-bloe hover:scale-95 rounded-2xl p-2 text-2xl text-white'>
                                          <MdLocalPrintshop className='inline text-7xl' />
                                    </button>

                              </div>


                        </div>
                        {/* END OF TOTALS REPORTS */}
                        {/* -------------------------------------------------------------- */}
                        <div className='flex gap-4'>

                              {/* DOUGHNUT CHART */}
                              <DoughnutComponents TwoWheels={TwoWheels} ThreeWheels={ThreeWheels} FourWheels={FourWheels} vehicles={vehicles} filteredVehicles={filteredVehicles} setFilteredVehicles={setFilteredVehicles} />
                              {/* EMPLOYEE TABLE */}
                              <div className="text-xl max-h-[700px] relative w-[40%] shadow-2xl border-4 border-bloe bg-white rounded-3xl overflow-y-auto p-4">
                                    <p className=' border-4 border-deepBlue font-bold mx-auto w-fit my-8 bg-yeelow py-1 px-8 text-lg rounded-xl'>Employee Accounts</p>

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

                                                            <td className={`px-6 py-4 font-semibold ${user.login ? 'text-green-600' : 'text-red-600'}`}>
                                                                  {user.login ? "ONLINE" : "OFFLINE"}
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

export default Dashboard;
