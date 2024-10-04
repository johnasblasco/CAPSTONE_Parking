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
                        console.log('File uploaded:', imageUrl);
                  } catch (error) {
                        console.error('Error uploading file:', error.response ? error.response.data : error.message);
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
                        title: "Settings Updated!",
                        text: "Your settings have been successfully updated!",
                        icon: "success",
                  });
            } catch (error) {
                  setFormError('Error updating settings. Please try again.');
                  console.error('Error:', error);
            }
      };

      return (
            <div className="min-h-screen h-max-700:mt-[25vh] mt-[10vh] flex justify-center items-center">
                  <div className="w-full max-w-6xl flex gap-8 items-start p-8">

                        {/* Left Card (Details) */}
                        <div className="bg-white h-[680px] p-8 rounded-xl shadow-md flex-1 transition-transform duration-300 hover:scale-105">
                              <h2 className="text-4xl font-bold mb-6 text-center text-blue-600">DETAILS</h2>
                              <div className="flex flex-col items-center mb-6">
                                    <div
                                          onClick={handleUpload}
                                          className="cursor-pointer mb-4 transition-transform duration-300 hover:scale-110"
                                    >
                                          <img
                                                src={selectedImage}
                                                alt="Click to upload"
                                                className="w-40 h-40 rounded-full border-4 border-pink-300 shadow-md"
                                          />
                                    </div>
                                    <input
                                          type="file"
                                          ref={fileInputRef}
                                          style={{ display: 'none' }}
                                          accept="image/*"
                                          onChange={handleFileChange}
                                    />
                                    <input
                                          type="text"
                                          name="companyName"
                                          value={formData.companyName}
                                          onChange={handleChange}
                                          placeholder="Company Name"
                                          className="p-4 border text-center border-gray-300 rounded-full mb-4 w-11/12 text-lg transition-all duration-300 focus:bg-yellow-50 focus:border-yellow-500 hover:shadow-lg"
                                          required
                                    />
                                    <textarea
                                          name="parkingRules"
                                          value={formData.parkingRules}
                                          onChange={handleChange}
                                          placeholder="Parking Rules"
                                          className="p-4 text-center border border-gray-300 rounded-3xl mb-4 w-11/12 text-lg transition-all duration-300 focus:bg-yellow-50 focus:border-yellow-500 hover:shadow-lg"
                                          rows="8"
                                          required
                                    />
                              </div>
                        </div>

                        {/* Right Card (Settings) */}
                        <div className="bg-white h-[680px]  p-8 rounded-xl shadow-md flex-1 transition-transform duration-300 hover:scale-105">
                              <h2 className="text-4xl font-bold mb-6 text-center text-blue-600">Settings</h2>

                              <div className="grid gap-4">
                                    <input
                                          type="number"
                                          name="twoWheels"
                                          value={formData.twoWheels}
                                          onChange={handleChange}
                                          placeholder="Total 2 Wheels"
                                          className="p-4 border text-center border-gray-300 rounded-full text-lg transition-all duration-300 focus:bg-yellow-50 focus:border-yellow-500 hover:shadow-lg"
                                          required
                                    />
                                    <input
                                          type="number"
                                          name="threeAndFourWheels"
                                          value={formData.threeAndFourWheels}
                                          onChange={handleChange}
                                          placeholder="Total 3/4 Wheels"
                                          className="p-4 border text-center border-gray-300 rounded-full text-lg transition-all duration-300 focus:bg-yellow-50 focus:border-yellow-500 hover:shadow-lg"
                                          required
                                    />
                                    <input
                                          type="number"
                                          name="pricePerTicket"
                                          value={formData.pricePerTicket}
                                          onChange={handleChange}
                                          placeholder="Price per Ticket"
                                          className="p-4 border text-center border-gray-300 rounded-full text-lg transition-all duration-300 focus:bg-yellow-50 focus:border-yellow-500 hover:shadow-lg"
                                          required
                                    />
                                    <input
                                          type="number"
                                          name="hoursLimit"
                                          value={formData.hoursLimit}
                                          onChange={handleChange}
                                          placeholder="Hours Limit (optional)"
                                          className="p-4 border text-center border-gray-300 rounded-full text-lg transition-all duration-300 focus:bg-yellow-50 focus:border-yellow-500 hover:shadow-lg"
                                    />
                                    <input
                                          type="number"
                                          name="overTimeFees"
                                          value={formData.overTimeFees}
                                          onChange={handleChange}
                                          placeholder="Overtime Fees (optional)"
                                          className="p-4 border text-center border-gray-300 rounded-full text-lg transition-all duration-300 focus:bg-yellow-50 focus:border-yellow-500 hover:shadow-lg"
                                    />

                                    {formError && <p className="text-red-500 text-center text-lg">{formError}</p>}

                                    <button
                                          type="submit"
                                          className="bg-gradient-to-r bg-greenWich text-white rounded-full py-3 text-xl font-bold hover:from-green-500 hover:to-blue-600 transition-all duration-300"
                                          onClick={handleSubmit}
                                    >
                                          Save Changes
                                    </button>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default Settings;
