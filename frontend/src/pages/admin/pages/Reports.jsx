import { useRef, useEffect, useState } from 'react';
import { Doughnut, Line } from 'react-chartjs-2';
import { FaMotorcycle, FaBicycle, FaCar } from 'react-icons/fa';
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

      const CHART_COLORS = {
            red: 'rgb(255, 99, 132)',
            green: 'rgb(75, 192, 192)',
            blue: 'rgb(54, 162, 235)',
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
            labels: earningsData.map(entry => entry.date),
            datasets: [
                  {
                        label: 'Daily Total Earnings',
                        data: earningsData.map(entry => entry.totalEarnings),
                        fill: true,
                        borderColor: 'rgb(75, 192, 192)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        tension: 0.4,
                        borderWidth: 2,
                        pointRadius: 4,
                        pointBackgroundColor: 'rgb(75, 192, 192)'
                  }
            ]
      };

      useEffect(() => {
            axios.get("http://localhost:8000/vehicle")
                  .then(response => {
                        setTotalVehicles(response.data.length);
                        setTwoWheels(response.data.filter(vehicle => vehicle.category === '2 Wheels').length);
                        setThreeWheels(response.data.filter(vehicle => vehicle.category === '3 Wheels').length);
                        setFourWheels(response.data.filter(vehicle => vehicle.category === '4 Wheels').length);
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

                        const sumOfTotal = earningsArray.reduce((acc, item) => acc + item.totalEarnings, 0);
                        setTotalEarnings(sumOfTotal);
                  });
      }, []);


      return (
            <>
                  <div className='mx-[10%] pb-12 h-max-700:mt-[35vh] mt-[25vh] w-[80vw] text-deepBlue'>


                        {/* Chart and User List */}
                        <div className='flex gap-4 max-h-[700px]'>
                              <div className="flex relative pt-24 p-12 shadow-2xl border-4 min-w-[70%] border-bloe bg-white rounded-3xl">
                                    <p className='border-4 border-deepBlue font-bold absolute left-[-35px] top-2 bg-yeelow py-1 px-8 text-lg rounded-3xl'>Total Vehicle Reports</p>

                                    <div className="flex flex-row items-center justify-evenly w-full">
                                          {TwoWheels + ThreeWheels + FourWheels > 0 ? (
                                                <>
                                                      <Doughnut className='w-96 h-96' ref={chartRef} data={data} />

                                                      {/* Right Side Text Section with Icons */}
                                                      <div className="flex flex-col gap-8 ml-4">
                                                            <div className="flex items-center text-xl font-semibold text-gray-800 mb-2">
                                                                  <img src="/motorcycle.png" className='w-32 h-32' alt="" />
                                                                  <p>Total Two-Wheel Vehicles: <span className="font-bold text-6xl text-red-400">{TwoWheels}</span></p>
                                                            </div>
                                                            <div className="flex items-center text-xl font-semibold text-gray-800 mb-2">
                                                                  <img src="/tricycle.png" className='w-32 h-32' alt="" />
                                                                  <p>Total Three-Wheel Vehicles: <span className="font-bold text-6xl text-green-600">{ThreeWheels}</span></p>
                                                            </div>
                                                            <div className="flex items-center text-xl font-semibold text-gray-800 mb-2">
                                                                  <img src="/car.png" className='w-32 h-32' alt="" />
                                                                  <p>Total Four-Wheel Vehicles: <span className="font-bold text-6xl text-blue-500">{FourWheels}</span></p>
                                                            </div>
                                                      </div>
                                                </>
                                          ) : (
                                                <p className="text-center text-lg font-semibold text-gray-700">No data available</p>
                                          )}
                                    </div>
                              </div>



                              <div className="h-max-700:hidden relative p-4 w-full shadow-2xl border-4 border-bloe bg-white rounded-3xl overflow-y-auto">
                                    <p className='border-4 border-deepBlue font-bold mx-auto w-fit bg-yeelow py-1 px-4 text-lg rounded-3xl'>Employee Accounts</p>

                                    <table className='mt-12 w-full text-center border border-bloe rounded-lg overflow-hidden shadow-lg'>
                                          <thead className='bg-deepBlue text-white'>
                                                <tr>
                                                      <th className='py-3 px-4 border-b-2 border-bloe'>Name</th>
                                                      <th className='py-3 px-4 border-b-2 border-bloe'>Status</th>
                                                </tr>
                                          </thead>

                                          <tbody>
                                                {users.map((user, index) => (
                                                      <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} transition-colors hover:bg-gray-200`}>
                                                            <td className='py-3 px-4 border-b border-bloe'>{user.name}</td>
                                                            <td className={`py-3 px-4 border-b border-bloe font-bold ${user.status ? 'text-green-500' : 'text-red-500'}`}>
                                                                  {user.status ? (
                                                                        <span className='flex items-center justify-center'>
                                                                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                              </svg>
                                                                              ACTIVATED
                                                                        </span>
                                                                  ) : (
                                                                        <span className='flex items-center justify-center'>
                                                                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                                              </svg>
                                                                              DEACTIVATED
                                                                        </span>
                                                                  )}
                                                            </td>
                                                      </tr>
                                                ))}
                                          </tbody>
                                    </table>


                              </div>
                        </div>

                        {/* END OF CHARTS AND TABLE */}

                        {/* CHARTS OF EARNINGS*/}
                        <div className=" relative h-[450px] mt-12 shadow-2xl border-4 border-bloe bg-white rounded-3xl p-6">

                              <p className='border-4 border-deepBlue font-bold absolute left-[-35px] top-2 bg-yeelow py-1 px-8 text-lg rounded-3xl'>All-time Earnings</p>
                              <Line className='w-mt-6 mt-4' data={earningsChartData} />
                        </div>
                        {/* END OF CHARTS OF EARNINGS*/}


                        {/* TOTALS REPORTS */}
                        <div className='flex m-12 gap-5 justify-center ml-[3%] w-[75vw] h-[20vh]'>
                              {/* Total Vehicles */}
                              <div className='h-max-700:p-16 flex gap-4 items-center pt-10 justify-center relative border-4 border-deepBlue shadow-2xl rounded-3xl bg-offWhite p-2 w-[30%]'>
                                    <p className='border-4 border-deepBlue font-bold absolute left-[-35px] top-2 bg-yeelow py-1 px-4 text-lg rounded-3xl'>Total Parked Vehicles</p>
                                    <p className='h-max-700:text-4xl text-6xl font-bold text-deepBlue'>{totalVehicles}</p>
                              </div>
                              {/* Total Earnings */}
                              <div className='h-max-700:p-16 flex gap-4 items-center pt-10 justify-center relative border-4 border-deepBlue shadow-2xl rounded-3xl bg-offWhite p-2 w-[30%]'>
                                    <p className='border-4 border-deepBlue font-bold absolute left-[-35px] top-2 bg-yeelow py-1 px-4 text-lg rounded-3xl'>Total Earnings</p>
                                    <p className='h-max-700:text-3xl text-5xl font-bold text-deepBlue'>PHP</p>
                                    <p className='h-max-700:text-4xl text-6xl font-bold text-deepBlue'>{totalEarnings}.00</p>
                              </div>
                              {/* Total Employees */}
                              <div className='h-max-700:p-16 flex gap-4 items-center pt-10 justify-center relative border-4 border-deepBlue shadow-2xl rounded-3xl bg-offWhite p-2 w-[30%]'>
                                    <p className='border-4 border-deepBlue font-bold absolute left-[-35px] top-2 bg-yeelow py-1 px-4 text-lg rounded-3xl'>Total Employees</p>
                                    <p className='h-max-700:text-4xl text-6xl font-bold text-deepBlue'>{users.length}</p>
                              </div>
                        </div>
                        {/* END OF TOTALS REPORTS */}








                  </div>
            </>
      );

}

export default Reports;
