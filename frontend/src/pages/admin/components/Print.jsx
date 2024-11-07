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

            const printContent = document.getElementById('printableContent').innerHTML;
            const originalContent = document.body.innerHTML;

            document.body.innerHTML = printContent;
            window.print();
            document.body.innerHTML = originalContent;
            window.location.reload(); // Reload the page to restore the original content
      };

      const renderTable = () => {
            if (error) return <p>{error}</p>; // Display error message

            // Filter data based on the selected date
            const filteredData = data.filter(item => {
                  if (selectedOption === 'vehicles') {
                        return new Date(item.startDate).toLocaleDateString() === new Date(selectedDate).toLocaleDateString();
                  } else if (selectedOption === 'earnings') {
                        return new Date(item.currentDate).toLocaleDateString() === new Date(selectedDate).toLocaleDateString();
                  }
                  return true; // For employee accounts, no date filter
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
                                    </table >
                              </>
                        );
                  case 'employeeAccounts':
                        return (
                              <table className='text-center min-w-full table-auto'>
                                    <thead>
                                          <tr>
                                                <th className='border-2 border-deepBlue p-2'>Name</th>
                                                <th className='border-2 border-deepBlue p-2'>username</th>
                                                <th className='border-2 border-deepBlue p-2'>status</th>
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
                        <div onClick={(e) => e.stopPropagation()} className='relative text-xl z-10 border-4 border-darkBloe bg-white p-10 rounded-2xl shadow-lg max-w-3xl w-[40rem]'>

                              <p className='text-3xl font-bold mb-6'>Print Settings</p>
                              <IoMdClose onClick={() => setShowPrint(!showPrint)} className='text-3xl absolute top-4 right-4 cursor-pointer hover:text-red-600' />

                              <div className='mb-8'>
                                    <div className='bg-gray-300 p-6 rounded-lg mb-8'>
                                          <p className='text-xl font-semibold mb-4'>Overview</p>
                                          <p className='text-md'>Selected Date: <span className='font-bold'>{selectedDate || 'Not selected'}</span></p>
                                          <p className='text-md'>Category: <span className='font-bold'>{selectedOption ? selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1) : 'None'}</span></p>
                                    </div>

                                    <div>
                                          <p className='font-semibold text-lg'>Filter By Date</p>
                                          <button onClick={handleDateSelection} className='mt-4 mb-6 w-full h-12 bg-green-500 hover:bg-green-400 transition-all rounded-2xl p-3 text-white flex items-center justify-center relative group'>
                                                <FaFilter className='inline mr-2' /> MM / DD / YYYY
                                                <span className="absolute left-full w-40 ml-2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">Select a date for the report</span>
                                          </button>

                                          <div className='mt-4'>
                                                <label htmlFor="dropdown" className="block text-md font-medium mb-2">Choose a category:</label>
                                                <select id="dropdown" value={selectedOption} onChange={handleSelectChange} className="w-full p-3 bg-gray-100 border rounded-md focus:border-blue-400 transition">
                                                      <option value="">--Select an option--</option>
                                                      <option value="employeeAccounts">Accounts Reports</option>
                                                      <option value="vehicles">Vehicles Reports</option>
                                                      <option value="earnings">Earnings Reports</option>
                                                </select>
                                          </div>

                                          {selectedOption && (
                                                <p className="mt-4 text-sm">
                                                      You selected: <span className="font-semibold">{selectedOption === 'employeeAccounts' ? 'Employee Accounts' : selectedOption === 'vehicles' ? 'Vehicles' : 'Earnings'}</span>
                                                </p>
                                          )}
                                    </div>

                                    {/* Data Table */}
                                    <div id="printableContent" className='hidden mt-8'>
                                          <h2 className='text-xl font-bold mb-4'>{selectedOption ? selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1) + ' Report' : ''}</h2>
                                          {renderTable()}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className='mt-10 flex justify-end gap-4'>
                                          <button onClick={() => setShowPrint(!showPrint)} className='py-3 px-6 hover:scale-95 bg-pink transition-all rounded-lg text-white'>Cancel</button>
                                          <button onClick={handlePrint} className='py-3 px-8 rounded-lg bg-bloe hover:scale-95 transition-all text-white'>Print</button>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      );
}

export default Print;