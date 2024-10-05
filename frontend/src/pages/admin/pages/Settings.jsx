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
            pricePerTicket: '',
            hoursLimit: '',
            overTimeFees: '',
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
                  const formData = new FormData();
                  formData.append('image', file);

                  try {
                        const response = await axios.post('http://localhost:8000/upload', formData, {
                              headers: {
                                    'Content-Type': 'multipart/form-data',
                              },
                        });

                        const imageUrl = `http://localhost:8000${response.data.filePath}`;
                        setSelectedImage(imageUrl);
                  } catch (error) {
                        setFormError('Error uploading file. Please try again.');
                  }
            }
      };

      const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData({
                  ...formData,
                  [name]: value,
            });
      };

      const handleSubmit = async (e) => {
            e.preventDefault();

            const { companyName, parkingRules, twoWheels, threeAndFourWheels, pricePerTicket } = formData;

            if (!companyName || !parkingRules || !twoWheels || !threeAndFourWheels || !pricePerTicket) {
                  setFormError('Please fill in all the fields.');
                  return;
            }

            try {
                  await axios.put('http://localhost:8000/settings', formData);

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

      const handleNextStep = () => {
            setCurrentStep((prev) => prev + 1);
      };
      const handlePreviousStep = () => {
            if (currentStep > 1) {
                  setCurrentStep((prev) => prev - 1);
            }
      };


      const stepLabels = ['Company Info', 'Parking Rules', 'Wheels Data', 'Pricing', 'Time Limit', 'Overtime Fees'];

      return (
            <div className="flex mt-[10vh] h-max-700:mt-[35vh] h-screen justify-center items-center ">
                  <div className="relative max-w-3xl w-full p-8 bg-white rounded-lg shadow-2xl">

                        <p className='border-4 font-bold border-deepBlue absolute top-4 left-[-35px] bg-yeelow py-1 px-8 text-lg rounded-3xl '>Settings</p>


                        {/* Step Indicator */}
                        <div className="flex font-bold text-2xl mt-8 justify-center mb-8 space-x-4">
                              {stepLabels.map((label, index) => (
                                    <div key={index} className="flex flex-col items-center space-y-2">
                                          <div className={`animate-bounce w-8 h-8 flex items-center justify-center rounded-full text-white ${index < currentStep ? 'bg-blue-600' : 'bg-gray-300'}`}>
                                                {index + 1}
                                          </div>
                                          <span className={`${index < currentStep ? 'text-blue-600' : 'text-gray-400'} text-xs`}>
                                                {label}
                                          </span>
                                    </div>
                              ))}
                        </div>

                        {/* Error Message */}
                        {formError && <p className="text-red-500 text-center mb-4">{formError}</p>}

                        {/* Form Steps */}
                        <div className="space-y-6">
                              {currentStep === 1 && (
                                    <div className="space-y-6 text-center">
                                          <div className="relative flex justify-center">
                                                <img
                                                      src={selectedImage}
                                                      alt="Click to upload"
                                                      className="hover:scale-110 transition-transform w-56 h-56 rounded-full border-4 border-blue-300 shadow-md object-cover cursor-pointer hover:opacity-80"
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
                                                className="text-center text-xl font-bold w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                                required
                                          />
                                          <div className="flex justify-between space-x-4">
                                                <button
                                                      type="button"
                                                      className="w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 focus:outline-none transition-colors"
                                                      onClick={handlePreviousStep}
                                                      disabled={currentStep === 1}
                                                >
                                                      Back
                                                </button>
                                                <button
                                                      type="button"
                                                      className="w-full bg-blue-600 font-bold text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none transition-colors"
                                                      onClick={handleNextStep}
                                                >
                                                      Next
                                                </button>
                                          </div>
                                    </div>
                              )}

                              {currentStep === 2 && (
                                    <div className="space-y-6">
                                          <textarea
                                                name="parkingRules"
                                                value={formData.parkingRules}
                                                onChange={handleChange}
                                                placeholder="Parking Rules"
                                                className="w-full text-center text-xl font-bold p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                                rows="6"
                                                required
                                          />
                                          <div className="flex justify-between space-x-4">
                                                <button
                                                      type="button"
                                                      className="w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 focus:outline-none transition-colors"
                                                      onClick={handlePreviousStep}
                                                >
                                                      Back
                                                </button>
                                                <button
                                                      type="button"
                                                      className="w-full font-bold bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none transition-colors"
                                                      onClick={handleNextStep}
                                                >
                                                      Next
                                                </button>
                                          </div>
                                    </div>
                              )}

                              {currentStep === 3 && (
                                    <div className="space-y-6 text-center">
                                          <h3 className="text-xl font-semibold text-gray-700">Parking Spaces by Category</h3>
                                          <div className="grid grid-cols-2 gap-4">
                                                <input
                                                      type="number"
                                                      name="twoWheels"
                                                      value={formData.twoWheels}
                                                      onChange={handleChange}
                                                      placeholder="2-Wheel Vehicles"
                                                      className="text-center w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                                      required
                                                />
                                                <input
                                                      type="number"
                                                      name="threeAndFourWheels"
                                                      value={formData.threeAndFourWheels}
                                                      onChange={handleChange}
                                                      placeholder="3/4-Wheel Vehicles"
                                                      className="text-center w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                                      required
                                                />
                                          </div>
                                          <div className="flex justify-between space-x-4">
                                                <button
                                                      type="button"
                                                      className="w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 focus:outline-none transition-colors"
                                                      onClick={handlePreviousStep}
                                                >
                                                      Back
                                                </button>
                                                <button
                                                      type="button"
                                                      className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none transition-colors"
                                                      onClick={handleNextStep}
                                                >
                                                      Next
                                                </button>
                                          </div>
                                    </div>
                              )}

                              {currentStep === 4 && (
                                    <div className="space-y-6">
                                          <input
                                                type="number"
                                                name="pricePerTicket"
                                                value={formData.pricePerTicket}
                                                onChange={handleChange}
                                                placeholder="Ticket Price (PHP)"
                                                className="w-full text-center p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                                required
                                          />
                                          <div className="flex justify-between space-x-4">
                                                <button
                                                      type="button"
                                                      className="w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 focus:outline-none transition-colors"
                                                      onClick={handlePreviousStep}
                                                >
                                                      Back
                                                </button>
                                                <button
                                                      type="button"
                                                      className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none transition-colors"
                                                      onClick={handleNextStep}
                                                >
                                                      Next
                                                </button>
                                          </div>
                                    </div>
                              )}

                              {currentStep === 5 && (
                                    <div className="space-y-6">

                                          <h3 className="text-xl text-center font-semibold text-gray-700">(Optional) Hours Limit. You can type 0 if none</h3>
                                          <input
                                                type="number"
                                                name="hoursLimit"
                                                value={formData.hoursLimit}
                                                onChange={handleChange}
                                                placeholder="Hours Limit"
                                                className="w-full text-center p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"

                                          />
                                          <div className="flex justify-between space-x-4">
                                                <button
                                                      type="button"
                                                      className="w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 focus:outline-none transition-colors"
                                                      onClick={handlePreviousStep}
                                                >
                                                      Back
                                                </button>
                                                <button
                                                      type="button"
                                                      className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none transition-colors"
                                                      onClick={handleNextStep}
                                                >
                                                      Next
                                                </button>
                                          </div>
                                    </div>
                              )}

                              {currentStep === 6 && (
                                    <div className="space-y-6">
                                          <h3 className="text-xl text-center font-semibold text-gray-700">(Optional) Overtime Fees. You can type 0 if none</h3>
                                          <input
                                                type="number"
                                                name="overTimeFees"
                                                value={formData.overTimeFees}
                                                onChange={handleChange}
                                                placeholder="Overtime Fees (PHP)"
                                                className="w-full p-4 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"

                                          />
                                          <div className="flex justify-between space-x-4">
                                                <button
                                                      type="button"
                                                      className="w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 focus:outline-none transition-colors"
                                                      onClick={handlePreviousStep}
                                                >
                                                      Back
                                                </button>
                                                <button
                                                      type="submit"
                                                      className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 focus:outline-none transition-colors"
                                                      onClick={handleSubmit}
                                                >
                                                      Save Changes
                                                </button>
                                          </div>
                                    </div>
                              )}
                        </div>
                  </div>
            </div>
      );


};

export default Settings;
