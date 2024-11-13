import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Settings = () => {
      const fileInputRef = useRef(null);
      const [selectedImage, setSelectedImage] = useState('/capture1.png'); // Default image
      const [formData, setFormData] = useState({
            companyName: '',
            parkingRules: '',
            twoWheels: '',
            threeAndFourWheels: '',
            ticket34: '',
            ticket2: '',
            hoursLimit: '',
            overtimeFees: '',
      });
      const [formError, setFormError] = useState('');
      const navigate = useNavigate();
      const [currentStep, setCurrentStep] = useState(1);

      const handleUpload = () => {
            fileInputRef.current.click();
      };

      const handleFileChange = async (e) => {
            const file = e.target.files[0];

            if (file) {
                  const reader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.onloadend = async () => {
                        try {
                              const response = await axios.post('https://capstone-parking.onrender.com/upload', { image: reader.result });

                              setSelectedImage(response.data.filePath); // Use Cloudinary URL directly from the response
                        } catch (error) {
                              setFormError('Error uploading file. Please try again.');
                        }
                  };
            }
      };


      const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData({
                  ...formData,
                  [name]: value,
            });
      };

      const handleSubmit = async () => {
            const { companyName, parkingRules, twoWheels, threeAndFourWheels, ticket34, ticket2, hoursLimit, overtimeFees } = formData;

            if (!companyName || !parkingRules || !twoWheels || !threeAndFourWheels || !ticket34 || !ticket2 || !hoursLimit || !overtimeFees) {
                  setFormError('Please fill in all the fields.');
                  return;
            }

            try {
                  await axios.put('https://capstone-parking.onrender.com/settings', formData);

                  Swal.fire({
                        title: 'Settings Updated!',
                        text: 'Your settings have been successfully updated!',
                        icon: 'success',
                  });
                  navigate('/admin/home/create-account');
            } catch (error) {
                  setFormError('Error updating settings. Please try again.');
            }
      };

      const handlePreviousStep = () => {
            if (currentStep > 1) {
                  setCurrentStep((prev) => prev - 1);
            }
      };

      const handleNextOrSave = () => {
            if (currentStep === 6) {
                  handleSubmit();
            } else {
                  setCurrentStep((prev) => prev + 1);
            }
      };

      const stepLabels = ['Company Info', 'Parking Rules', 'Wheels Data', 'Pricing', 'Time Limit', 'Overtime Fees'];

      return (
            <div className="mx-[10%] font-bold h-max-700:mt-[35vh] mt-[25vh] w-[80vw] text-deepBlue">
                  <div className="border-4 border-bloe relative p-8 bg-white rounded-2xl shadow-2xl h-[750px] flex flex-col justify-between">
                        <p className="border-4 font-bold border-deepBlue absolute top-4 left-[-35px] bg-yeelow py-1 px-8 text-lg rounded-3xl">
                              Company Settings
                        </p>

                        {/* Step Indicator */}
                        <div className="flex font-bold text-2xl mt-8 justify-center mb-8 space-x-4">
                              {stepLabels.map((label, index) => (
                                    <div key={index} className="flex flex-col items-center space-y-2">
                                          <div
                                                className={`animate-bounce w-8 h-8 flex items-center justify-center rounded-full text-white ${index < currentStep ? 'bg-green-400' : 'bg-gray-300'}`}
                                          >
                                                {index + 1}
                                          </div>
                                          <span className={`${index < currentStep ? 'text-green-400' : 'text-gray-400'} text-sm`}>
                                                {label}
                                          </span>
                                    </div>
                              ))}
                        </div>

                        {/* Error Message */}
                        {formError && <p className="text-red-500 text-center mb-4">{formError}</p>}

                        {/* Form Steps */}
                        <div className="flex-grow space-y-2">
                              {currentStep === 1 && (
                                    <div className="space-y-6 text-center">
                                          <div className="relative flex justify-center">
                                                <img
                                                      src={selectedImage}
                                                      alt="Click to upload"
                                                      className="hover:scale-110 transition-transform w-72 h-72 rounded-full border-4 border-blue-300 shadow-md object-cover cursor-pointer hover:opacity-80"
                                                      onClick={handleUpload}
                                                />
                                                <input
                                                      type="file"
                                                      ref={fileInputRef}
                                                      style={{ display: 'none' }}
                                                      accept="image/*"
                                                      onChange={handleFileChange}
                                                />
                                          </div>
                                          <input
                                                type="text"
                                                name="companyName"
                                                value={formData.companyName}
                                                onChange={handleChange}
                                                placeholder="Company Name"
                                                className="text-center text-xl font-bold w-full p-4 border-4 border-bloe rounded-lg focus:outline-none focus:ring-2 focus:ring-darkBloe"
                                                required
                                          />
                                    </div>
                              )}

                              {currentStep === 2 && (
                                    <div className="flex flex-col items-center">
                                          <h3 className="text-2xl font-semibold text-gray-700">Parking Rules (<span className='text-pink'>Visible in Ticket</span>)</h3>
                                          <img src="/parkingRules.gif" className='w-56 h-56' alt="" />
                                          <textarea

                                                name="parkingRules"
                                                value={formData.parkingRules}
                                                onChange={handleChange}
                                                placeholder=" Parking Rules
                                                
            Park Within Lines – Ensure your vehicle is parked within the designated space. Handicapped Spaces – Reserved for vehicles with valid 
            permits. Reserved Spaces – For employees or specific users. Towing enforced. Pedestrian Safety – Yield to pedestrians at all times. 
            Overnight Parking – Not allowed. Large Vehicle Parking – Park in designated spots for larger vehicles. Failure to comply may result in fines."
                                                className="w-full text-center text-xl font-bold p-4 border-4 border-bloe rounded-lg focus:outline-none focus:ring-2 focus:ring-darkBloe"
                                                rows="5"
                                                required
                                          />
                                    </div>
                              )}

                              {currentStep === 3 && (
                                    <div className="space-y-9 text-center">
                                          <h3 className="text-2xl mt-12 font-semibold text-gray-700">Maximum Parking Spaces by Category</h3>
                                          <div className="grid grid-cols-2 gap-4">
                                                <div className='flex flex-col items-center'>
                                                      <img src="/motorICON.png" className='w-56 h-56' alt="" />
                                                      <input
                                                            type="number"
                                                            name="twoWheels"
                                                            value={formData.twoWheels}
                                                            onChange={handleChange}
                                                            placeholder="2-Wheel Vehicles"
                                                            className="text-center w-full p-4 border-4 border-bloe rounded-lg focus:outline-none focus:ring-2 focus:ring-darkBloe"
                                                            required
                                                      />
                                                </div>

                                                <div className='flex flex-col items-center'>
                                                      <div className='flex gap-4 items-center'>
                                                            <img src="/carICON.png" className='w-56 h-56' alt="" />
                                                            <img src="/tricyICON.png" className='w-48 h-44' alt="" />
                                                      </div>
                                                      <input
                                                            type="number"
                                                            name="threeAndFourWheels"
                                                            value={formData.threeAndFourWheels}
                                                            onChange={handleChange}
                                                            placeholder="3/4-Wheel Vehicles"
                                                            className="text-center w-full p-4 border-4 border-bloe rounded-lg focus:outline-none focus:ring-2 focus:ring-darkBloe"
                                                            required
                                                      />
                                                </div>
                                          </div>
                                    </div>
                              )}

                              {currentStep === 4 && (
                                    <div className="flex flex-col items-center">
                                          <h3 className="text-2xl text-center font-semibold text-gray-700">Parking Prices Per Ticket</h3>
                                          <img src="/parkingPrices.png" className='w-56 h-56' alt="" />

                                          <h3 className="text-xl mb-2 text-center font-semibold text-gray-700">Price for 3 and 4 wheeler(PHP)</h3>
                                          <input
                                                type="number"
                                                name="ticket34"
                                                value={formData.ticket34}
                                                onChange={handleChange}
                                                placeholder="Ticket Price (PHP)"
                                                className="w-[600px] text-center p-4 border-4 border-bloe rounded-lg focus:outline-none focus:ring-2 focus:ring-darkBloe"
                                                required
                                          />

                                          <h3 className="text-xl mt-4 mb-2 text-center font-semibold text-gray-700">Price for 2 wheeler(PHP)</h3>
                                          <input
                                                type="number"
                                                name="ticket2"
                                                value={formData.ticket2}
                                                onChange={handleChange}
                                                placeholder="Ticket Price (PHP)"
                                                className="w-[600px] text-center p-4 border-4 border-bloe rounded-lg focus:outline-none focus:ring-2 focus:ring-darkBloe"
                                                required
                                          />
                                    </div>
                              )}

                              {currentStep === 5 && (
                                    <div className="space-y-4 flex flex-col items-center">
                                          <img src="/timeLimit.gif" className='w-72 h-64' alt="" />

                                          <h3 className="text-2xl text-center font-semibold text-gray-700">
                                                (<span className='text-pink'>Optional </span>) Hours Limit. You can type <span className='text-bloe text-3xl'>"0"</span> if none
                                          </h3>
                                          <input
                                                type="number"
                                                name="hoursLimit"
                                                value={formData.hoursLimit}
                                                onChange={handleChange}
                                                placeholder="Hours Limit"
                                                className="w-full text-center p-4 border-4 border-bloe rounded-lg focus:outline-none focus:ring-2 focus:ring-darkBloe"
                                          />
                                    </div>
                              )}

                              {currentStep === 6 && (
                                    <div className="space-y-4 flex flex-col items-center">
                                          <img src="/extraCharges.gif" className='w-72 h-64' alt="" />
                                          <h3 className="text-2xl text-center font-semibold text-gray-700">
                                                (<span className='text-pink'>Optional </span>) Overtime Extra Charges! You can type <span className='text-bloe text-3xl'>"0"</span> if none
                                          </h3>
                                          <input
                                                type="number"
                                                name="overtimeFees"
                                                value={formData.overtimeFees}
                                                onChange={handleChange}
                                                placeholder="Overtime Fees (PHP)"
                                                className="w-full p-4 text-center border-4 border-bloe rounded-lg focus:outline-none focus:ring-2 focus:ring-darkBloe"
                                          />
                                    </div>
                              )}
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex justify-between text-xl space-x-4 mt-4 font-bold">
                              <button
                                    type="button"
                                    className="w-full bg-gray-600 hover:scale-95 text-white py-3 rounded-lg hover:bg-gray-700 focus:outline-none transition-colors"
                                    onClick={handlePreviousStep}
                                    disabled={currentStep === 1}
                              >
                                    Back
                              </button>
                              <button
                                    type="button"
                                    className={`w-full ${currentStep === 6 ? 'bg-green-500' : 'bg-deepBlue'} text-white py-3 rounded-lg hover:scale-95 focus:outline-none transition-colors`}
                                    onClick={handleNextOrSave}
                              >
                                    {currentStep === 6 ? 'Save Changes' : 'Next'}
                              </button>
                        </div>
                  </div>
            </div>
      );
};

export default Settings;
