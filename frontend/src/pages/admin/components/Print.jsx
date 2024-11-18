import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaFilter } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import Swal from 'sweetalert2';
import moment from 'moment';

const Print = ({ setShowPrint, showPrint }) => {
      const [selectedOption, setSelectedOption] = useState('');
      const [selectedDate, setSelectedDate] = useState('');
      const [data, setData] = useState([]);
      const [error, setError] = useState('');

      const handleSelectChange = (e) => {
            setSelectedOption(e.target.value);
            setData([]); // Clear data when changing option
      };

      useEffect(() => {
            if (selectedOption) {
                  let url = '';
                  switch (selectedOption) {
                        case 'vehicles':
                              url = `https://capstone-parking.onrender.com/vehicle`; // Fetch all vehicles
                              break;
                        case 'earnings':
                              url = `https://capstone-parking.onrender.com/earnings`; // Fetch all earnings
                              break;
                        case 'employeeAccounts':
                              url = `https://capstone-parking.onrender.com/user`; // Fetch all user accounts
                              break;
                        default:
                              return;
                  }

                  axios.get(url)
                        .then(response => {
                              setData(response.data);
                              setError(''); // Clear previous errors
                        })
                        .catch(error => {
                              console.error("Error fetching data:", error);
                              setError('Failed to fetch data. Please try again.');
                        });
            }
      }, [selectedOption]);

      const handleDateSelection = async () => {
            const pastMinimumDate = new Date('2024-01-01').toISOString().split('T')[0];

            const { value: date } = await Swal.fire({
                  title: 'Select Date',
                  input: 'date',
                  inputAttributes: {
                        required: true,
                        min: pastMinimumDate,
                  },
                  showCancelButton: true,
                  confirmButtonText: 'Submit',
            });

            if (date) {
                  setSelectedDate(date);
                  Swal.fire('Date Selected', date, 'success');
            }
      };

      const handlePrint = () => {
            if (!data.length) {
                  Swal.fire('No Data', 'Please ensure data is available before printing.', 'warning');
                  return;
            }

            // Get the printable content's HTML
            const printContent = document.getElementById('printableContent').innerHTML;

            // Open a new window and write the content for printing
            const printWindow = window.open('', '_blank');
            printWindow.document.open();
            printWindow.document.write(`
                  <html>
                        <head>
                              <title>Print</title>
                              <style>
                                    body { font-family: Arial, sans-serif; }
                                    table { width: 100%; border-collapse: collapse; }
                                    th, td { border: 1px solid #ddd; padding: 8px; text-align: center; }
                                    th { background-color: #f2f2f2; }
                              </style>
                        </head>
                        <body>
                              ${printContent}
                        </body>
                  </html>
            `);
            printWindow.document.close();

            // Trigger the print
            printWindow.print();

            // Close the print window after printing
            printWindow.onafterprint = () => printWindow.close();
      };



      const renderTable = () => {
            if (error) return <p>{error}</p>; // Display error message

            // Log the selectedDate and vehicle startDate for debugging
            console.log("Selected Date: ", selectedDate);

            // Filter data based on the selected date
            const filteredData = data.filter(item => {
                  if (selectedOption === 'vehicles') {
                        const vehicleStartDate = moment.utc(item.startDate).format('YYYY-MM-DD');
                        console.log("Vehicle Start Date: ", vehicleStartDate);

                        // Daily filter
                        if (selectedDate === 'daily') {
                              return vehicleStartDate === moment().format('YYYY-MM-DD');
                        }

                        // Weekly filter
                        if (selectedDate === 'weekly') {
                              const startOfWeek = moment().startOf('week').format('YYYY-MM-DD');
                              const endOfWeek = moment().endOf('week').format('YYYY-MM-DD');
                              return moment(vehicleStartDate).isBetween(startOfWeek, endOfWeek, null, '[]');
                        }

                        // Monthly filter
                        if (selectedDate === 'monthly') {
                              const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
                              const endOfMonth = moment().endOf('month').format('YYYY-MM-DD');
                              return moment(vehicleStartDate).isBetween(startOfMonth, endOfMonth, null, '[]');
                        }

                        // Yearly filter
                        if (selectedDate === 'yearly') {
                              const startOfYear = moment().startOf('year').format('YYYY-MM-DD');
                              const endOfYear = moment().endOf('year').format('YYYY-MM-DD');
                              return moment(vehicleStartDate).isBetween(startOfYear, endOfYear, null, '[]');
                        }

                        // Default case: specific date filter
                        return vehicleStartDate === selectedDate;
                  } else if (selectedOption === 'earnings') {
                        return moment.utc(item.currentDate).isSame(moment.utc(selectedDate), 'day');
                  }
                  return true;
            });

            if (!filteredData.length) return <p>No data available for the selected date.</p>; // Check if data is empty

            switch (selectedOption) {
                  case 'vehicles':
                        return (
                              <table className='text-center min-w-full table-auto'>
                                    <thead>
                                          <tr>
                                                <th className='border-2 border-deepBlue p-2'>Ticket Number</th>
                                                <th className='border-2 border-deepBlue p-2'>Plate Number</th>
                                                <th className='border-2 border-deepBlue p-2'>Category</th>
                                                <th className='border-2 border-deepBlue p-2'>Status</th>
                                                <th className='border-2 border-deepBlue p-2'>In Time</th>
                                                <th className='border-2 border-deepBlue p-2'>Out Time</th>
                                                <th className='border-2 border-deepBlue p-2'>Duration</th>
                                                <th className='border-2 border-deepBlue p-2'>Charges</th>
                                                <th className='border-2 border-deepBlue p-2'>Extra Charges</th>
                                          </tr>
                                    </thead>
                                    <tbody>
                                          {filteredData.map((vehicle, index) => (
                                                <tr key={vehicle._id}>
                                                      <td className='border-2 border-deepBlue p-2'>{vehicle.ticketNumber}</td>
                                                      <td className='border-2 border-deepBlue p-2'>{vehicle.plateNumber}</td>
                                                      <td className='border-2 border-deepBlue p-2'>{vehicle.category}</td>
                                                      <td className='border-2 border-deepBlue p-2'>{vehicle.status ? "In" : "Out"}</td>
                                                      <td className='border-2 border-deepBlue p-2'>{moment(vehicle.startDate).format('hh:mm A')}</td>
                                                      <td className='border-2 border-deepBlue p-2'>{vehicle.endDate ? moment(vehicle.endDate).format('hh:mm A') : '-'}</td>
                                                      <td className='border-2 border-deepBlue p-2'>
                                                            {(() => {
                                                                  const startDate = new Date(vehicle.startDate);
                                                                  const endDate = vehicle.endDate ? new Date(vehicle.endDate) : new Date();
                                                                  const duration = endDate - startDate;
                                                                  const hours = Math.floor(duration / 3600000);
                                                                  const minutes = Math.floor((duration % 3600000) / 60000);
                                                                  return hours > 0 ? `${hours} hours ${minutes} mins` : `${minutes} mins`;
                                                            })()}
                                                      </td>
                                                      <td className='border-2 border-deepBlue p-2'>{vehicle.charges}</td>
                                                      <td className='border-2 border-deepBlue p-2'>{vehicle.extraCharges}</td>
                                                </tr>
                                          ))}
                                    </tbody>
                              </table>
                        );
                  case 'earnings':
                        return (
                              <>
                                    <table className='text-center min-w-full table-auto mb-10'>
                                          <thead>
                                                <tr>
                                                      <th className='border-2 border-deepBlue p-2'>Total Earnings</th>
                                                      <th className='border-2 border-deepBlue p-2'>PHP {filteredData.reduce((sum, item) => sum + item.earnings, 0)}</th>
                                                </tr>
                                          </thead>
                                    </table>
                                    <table className='text-center min-w-full table-auto'>
                                          <thead>
                                                <tr>
                                                      <th className='border-2 border-deepBlue p-2'>Date</th>
                                                      <th className='border-2 border-deepBlue p-2'>Earnings Per Vehicle</th>
                                                </tr>
                                          </thead>
                                          <tbody>
                                                {filteredData.map((earning, index) => (
                                                      <tr key={earning._id}>
                                                            <td className='border-2 border-deepBlue p-2'>{moment(earning.currentDate).format('YYYY-MM-DD')}</td>
                                                            <td className='border-2 border-deepBlue p-2'>{earning.earnings}</td>
                                                      </tr>
                                                ))}
                                          </tbody>
                                    </table>
                              </>
                        );
                  case 'employeeAccounts':
                        return (
                              <table className='text-center min-w-full table-auto'>
                                    <thead>
                                          <tr>
                                                <th className='border-2 border-deepBlue p-2'>Name</th>
                                                <th className='border-2 border-deepBlue p-2'>Username</th>
                                                <th className='border-2 border-deepBlue p-2'>Status</th>
                                          </tr>
                                    </thead>
                                    <tbody>
                                          {filteredData.map((employee, index) => (
                                                <tr key={employee._id}>
                                                      <td className='border-2 border-deepBlue p-2'>{employee.name}</td>
                                                      <td className='border-2 border-deepBlue p-2'>{employee.username}</td>
                                                      <td className='border-2 border-deepBlue p-2'>{employee.status ? "Activated" : "Deactivated"}</td>
                                                </tr>
                                          ))}
                                    </tbody>
                              </table>
                        );
                  default:
                        return null;
            }
      };


      return (
            <div onClick={() => setShowPrint(!showPrint)} className='z-1 fixed bg-black/50 inset-0 flex items-center justify-center z-50'>
                  <div data-aos="zoom-out" data-aos-duration="200">
                        <div onClick={(e) => e.stopPropagation()} className='relative text-xl z-10 border-4 border-gray-300 bg-white p-8 rounded-2xl shadow-xl max-w-3xl w-[40rem]'>

                              <p className='text-4xl font-bold text-bloe mb-6'>Print Settings</p>
                              <IoMdClose onClick={() => setShowPrint(!showPrint)} className='text-3xl absolute top-4 right-4 cursor-pointer hover:text-red-600' />

                              <div className='mb-8'>
                                    <div className='bg-gray-100 p-6 rounded-lg mb-8'>
                                          <p className='text-xl font-semibold text-gray-700 mb-4'>Overview</p>
                                          <p className='text-md text-gray-600'>Selected Date: <span className='font-bold'>{selectedDate || 'Not selected'}</span></p>
                                          <p className='text-md text-gray-600'>Category: <span className='font-bold'>{selectedOption ? selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1) : 'None'}</span></p>
                                    </div>

                                    <div>
                                          <p className="font-semibold text-lg text-gray-800">Filter By Date:</p>
                                          <select
                                                value={selectedDate}
                                                onChange={async (e) => {
                                                      const value = e.target.value;

                                                      if (value === "custom") {
                                                            const pastMinimumDate = new Date('2024-01-01').toISOString().split('T')[0];

                                                            const { value: date } = await Swal.fire({
                                                                  title: 'Select a Date',
                                                                  input: 'date',
                                                                  inputAttributes: { required: true, min: pastMinimumDate },
                                                                  showCancelButton: true,
                                                                  confirmButtonText: 'Submit',
                                                            });

                                                            if (date) {
                                                                  setSelectedDate(date);
                                                                  Swal.fire('Date Selected', date, 'success');
                                                            }
                                                      } else {
                                                            setSelectedDate(value);
                                                      }
                                                }}
                                                className="mt-4 mb-6 w-full h-12 text-white font-semibold rounded-lg border-2 border-solid focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-blue-800 transition duration-300 ease-in-out hover:bg-blue-900 bg-deepBlue px-4"
                                          >
                                                <option value="daily">Daily</option>
                                                <option value="weekly">Weekly</option>
                                                <option value="monthly">Monthly</option>
                                                <option value="yearly">Yearly</option>
                                                <option value="custom">Custom</option>
                                          </select>

                                    </div>

                                    <div className='mt-4'>
                                          <label htmlFor="dropdown" className="block text-md font-medium text-gray-700 mb-2">Choose a category:</label>
                                          <select id="dropdown" value={selectedOption} onChange={handleSelectChange} className="w-full p-3 bg-gray-200 border rounded-md focus:border-blue-500 transition">
                                                <option value="">--Select an option--</option>
                                                <option value="employeeAccounts">Accounts Reports</option>
                                                <option value="vehicles">Vehicles Reports</option>
                                                <option value="earnings">Earnings Reports</option>
                                          </select>
                                    </div>

                                    {selectedOption && (
                                          <p className="mt-4 text-sm text-gray-600">
                                                You selected: <span className="font-semibold text-indigo-600">{selectedOption === 'employeeAccounts' ? 'Employee Accounts' : selectedOption === 'vehicles' ? 'Vehicles' : 'Earnings'}</span>
                                          </p>
                                    )}
                              </div>

                              {/* Data Table */}
                              <div id="printableContent" className='hidden mt-8'>
                                    <h2 className='text-xl font-bold text-indigo-600 mb-4'>{selectedOption ? selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1) + ' Report' : ''}</h2>
                                    {renderTable()}
                              </div>

                              {/* Action Buttons */}
                              <div className='mt-10 flex justify-end gap-4'>
                                    <button onClick={() => setShowPrint(!showPrint)} className='py-3 px-6 bg-gray-400 hover:bg-gray-500 text-white rounded-lg transition'>
                                          Cancel
                                    </button>
                                    <button onClick={handlePrint} className='py-3 px-8 bg-bloe hover:brightness-90 text-white rounded-lg transition'>
                                          Print
                                    </button>
                              </div>
                        </div>
                  </div>
            </div>
      );


}

export default Print;