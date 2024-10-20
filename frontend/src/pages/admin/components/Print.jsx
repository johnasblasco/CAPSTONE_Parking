import React, { useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import Swal from 'sweetalert2';

const Print = ({ setShowPrint, showPrint }) => {
      const [selectedOption, setSelectedOption] = useState('');
      const [selectedDate, setSelectedDate] = useState('');

      const handleSelectChange = (e) => {
            setSelectedOption(e.target.value);
      };

      // FILTER
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

      return (
            <div onClick={() => setShowPrint(!showPrint)} className='z-1 fixed bg-black/50 inset-0 flex items-center justify-center z-50'>
                  <div data-aos="zoom-out" data-aos-duration="200">
                        <div onClick={(e) => e.stopPropagation()} className='relative text-xl z-10 border-4 border-darkBloe bg-white p-10 rounded-2xl shadow-lg max-w-3xl w-[40rem]'>

                              <p className='text-3xl font-bold mb-6'>Print Settings</p>
                              <IoMdClose onClick={() => setShowPrint(!showPrint)} className='text-3xl absolute top-4 right-4 cursor-pointer hover:text-red-600' />

                              <div className='mb-8'>
                                    {/* Overview Section */}
                                    <div className='bg-gray-100 p-6 rounded-lg mb-8'>
                                          <p className='text-xl font-semibold mb-4'>Overview</p>
                                          <p className='text-md'>Selected Date: <span className='font-bold'>{selectedDate || 'Not selected'}</span></p>
                                          <p className='text-md'>Category: <span className='font-bold'>{selectedOption ? selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1) : 'None'}</span></p>
                                    </div>

                                    {/* Filter Section */}
                                    <div>
                                          <p className='font-semibold text-lg'>Filter By Date</p>
                                          <button onClick={handleDateSelection} className='mt-4 mb-6 w-full h-12 bg-green-500 hover:bg-green-400 transition-all rounded-2xl p-3 text-white flex items-center justify-center relative group'>
                                                <FaFilter className='inline mr-2' /> MM / DD / YYYY
                                                <span className="absolute left-full w-40 ml-2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">Select a date for the report</span>
                                          </button>

                                          <div className='mt-4'>
                                                <label htmlFor="dropdown" className="block text-md font-medium mb-2">Choose a category:</label>
                                                <select id="dropdown" value={selectedOption} onChange={handleSelectChange} className="w-full p-3 border rounded-md focus:border-blue-400 transition">
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

                                    {/* Action Buttons */}
                                    <div className='mt-10 flex justify-end gap-4'>
                                          <button onClick={() => setShowPrint(!showPrint)} className='py-3 px-6 hover:scale-95 bg-pink transition-all rounded-lg text-white'>Cancel</button>
                                          <button className='py-3 px-8 rounded-lg bg-bloe hover:scale-95 transition-all text-white'>Print</button>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      );
}

export default Print;
