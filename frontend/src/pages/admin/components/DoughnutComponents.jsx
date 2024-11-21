import { useRef, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Doughnut } from 'react-chartjs-2';

const DoughnutComponents = ({ vehicles, filteredVehicles, setFilteredVehicles }) => {
      const chartRef = useRef(null);
      const [startDate, setStartDate] = useState("");
      const [endDate, setEndDate] = useState("");
      const [selectedRange, setSelectedRange] = useState("daily");

      const CHART_COLORS = {
            red: 'rgb(220 38 38)',
            green: 'rgb(34 197 94)',
            blue: 'rgb(0 53 102)',
      };

      const calculateTotals = () => {
            const twoWheels = filteredVehicles.filter(v => v.category === "2 Wheels").length;
            const threeWheels = filteredVehicles.filter(v => v.category === "3 Wheels").length;
            const fourWheels = filteredVehicles.filter(v => v.category === "4 Wheels").length;

            return { twoWheels, threeWheels, fourWheels };
      };


      // Calculate totals first
      const { twoWheels, threeWheels, fourWheels } = calculateTotals();

      // Now use them in the chart data
      const data = {
            labels: ['TwoWheels', 'ThreeWheels', 'FourWheels'],
            datasets: [
                  {
                        label: 'Vehicle Categories',
                        data: [twoWheels, threeWheels, fourWheels],
                        backgroundColor: [CHART_COLORS.red, CHART_COLORS.green, CHART_COLORS.blue],
                  },
            ],
      };


      const handleRangeChange = (e) => {
            const range = e.target.value;
            setSelectedRange(range);
            let today = new Date();
            let start, end;

            switch (range) {
                  case 'daily':
                        start = new Date(today.setDate(today.getDate() - 1)).toISOString().split('T')[0];
                        end = new Date().toISOString().split('T')[0];
                        break;
                  case 'weekly':
                        start = new Date(today.setDate(today.getDate() - 7)).toISOString().split('T')[0];
                        end = new Date().toISOString().split('T')[0];
                        break;
                  case 'monthly':
                        start = new Date(today.setMonth(today.getMonth() - 1)).toISOString().split('T')[0];
                        end = new Date().toISOString().split('T')[0];
                        break;
                  case 'yearly':
                        start = new Date(today.setFullYear(today.getFullYear() - 1)).toISOString().split('T')[0];
                        end = new Date().toISOString().split('T')[0];
                        break;
                  case 'custom':
                        handleCustomDateSelection();
                        return;
                  default:
                        break;
            }
            setStartDate(start);
            setEndDate(end);
            filterVehiclesByStartDate(start, end);
      };

      const handleCustomDateSelection = async () => {
            const { value: dateRange } = await Swal.fire({
                  title: "Select Date Range",
                  html: `<input type="date" id="startDate" required> to <input type="date" id="endDate" required>`,
                  focusConfirm: true,
                  width: 500,
                  preConfirm: () => {
                        const start = document.getElementById('startDate').value;
                        const end = document.getElementById('endDate').value;
                        if (!start || !end) {
                              Swal.showValidationMessage("Both dates are required.");
                              return false;
                        }
                        return { start, end };
                  },
                  showCancelButton: true,
                  confirmButtonText: "Submit",
            });

            if (dateRange) {
                  const { start, end } = dateRange;
                  setStartDate(start);
                  setEndDate(end);
                  filterVehiclesByStartDate(start, end);
            }
      };

      const filterVehiclesByStartDate = (start, end) => {
            const filtered = vehicles.filter(vehicle => {
                  const vehicleDate = new Date(vehicle.startDate).toISOString().split('T')[0]; // Convert to YYYY-MM-DD
                  return vehicleDate >= start && vehicleDate <= end; // Compare within the range
            });
            console.log('Filtered Vehicles:', filtered); // Debug
            setFilteredVehicles(filtered);
      };

      return (
            <div className="max-h-[700px] flex relative pt-24 p-12 shadow-2xl border-4 min-w-[70%] border-bloe bg-white rounded-3xl">
                  <p className='border-4 border-deepBlue font-bold absolute left-[-35px] top-2 bg-yeelow py-1 px-8 text-lg rounded-3xl'>Total Vehicle Reports</p>

                  <div className="flex flex-row items-center justify-evenly w-full">
                        {filteredVehicles.length > 0 ? (
                              <>
                                    <Doughnut className='w-96 h-96' ref={chartRef} data={data} />
                                    <div className="flex flex-col gap-8 ml-4">
                                          <p className='border-4 border-deepBlue font-bold w-fit bg-yeelow py-1 px-12 text-lg rounded-2xl'>Filter By Date</p>

                                          <select
                                                value={selectedRange}
                                                onChange={handleRangeChange}
                                                className="border-2 border-blue-900 h-12 text-xl font-semibold bg-deepBlue text-white hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg shadow-lg p-2 px-4 mb-4 transition-all duration-300 ease-in-out"
                                          >
                                                <option value="daily">Daily Vehicles</option>
                                                <option value="weekly">Weekly Vehicles</option>
                                                <option value="monthly">Monthly Vehicles</option>
                                                <option value="yearly">Yearly Vehicles</option>
                                                <option value="custom">Custom Date</option>
                                          </select>


                                          <div className="flex items-center text-xl font-semibold text-gray-800 mb-2">
                                                <img src="/motorcycle.png" className="w-32 h-32" alt="" />
                                                <p>Total Two-Wheel Vehicles: <span className="font-bold text-6xl text-red-600">{twoWheels}</span></p>
                                          </div>
                                          <div className="flex items-center text-xl font-semibold text-gray-800 mb-2">
                                                <img src="/tricycle.png" className="w-32 h-32" alt="" />
                                                <p>Total Three-Wheel Vehicles: <span className="font-bold text-6xl text-greenWich">{threeWheels}</span></p>
                                          </div>
                                          <div className="flex items-center text-xl font-semibold text-gray-800 mb-2">
                                                <img src="/car.png" className="w-32 h-32" alt="" />
                                                <p>Total Four-Wheel Vehicles: <span className="font-bold text-6xl text-bloe">{fourWheels}</span></p>
                                          </div>
                                    </div>
                              </>
                        ) : (
                              <p>No vehicles available.</p>
                        )}
                  </div>
            </div>
      );
};

export default DoughnutComponents;
