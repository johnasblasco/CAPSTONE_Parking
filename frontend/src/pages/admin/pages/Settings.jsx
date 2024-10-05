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
            <div className="text-bloe font-bold min-h-screen h-max-700:mt-[35vh] mt-[20vh] flex justify-center items-center">
                  <div className="ml-5 w-[70%]  flex gap-8 items-start p-8">

                        {/* Left Card (Details) */}
                        <div className="bg-white p-8 rounded-xl shadow-md flex-1 transition-transform duration-300 hover:scale-105">
                              <h2 className="text-6xl font-bold mb-6 text-center text-bloe">DETAILS</h2>
                              <div className="flex flex-col items-center mb-6">
                                    <div
                                          onClick={handleUpload}
                                          className="cursor-pointer mb-4 transition-transform duration-300 hover:scale-110"
                                    >
                                          <img
                                                src={selectedImage}
                                                alt="Click to upload"
                                                className="w-72 h-72 rounded-full border-4 border-pink-300 shadow-md"
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
                                          className="p-4 border-4 text-center bg-vanilla border-bloe rounded-full mb-4 w-11/12 text-lg transition-all duration-300 focus:bg-blue-50 focus:border-blue-500 hover:shadow-lg"
                                          required
                                    />
                                    <textarea
                                          name="parkingRules"
                                          value={formData.parkingRules}
                                          onChange={handleChange}
                                          placeholder="Parking Rules"
                                          className="p-4 text-center border-4 bg-vanilla border-bloe rounded-3xl mb-4 w-11/12 text-lg transition-all duration-300 focus:bg-blue-50 focus:border-blue-500 hover:shadow-lg"
                                          rows="8"
                                          required
                                    />
                              </div>
                        </div>

                        {/* Right Card (Settings) */}
                        <div className="bg-white h-[835px] py-8 rounded-xl shadow-md flex-1 transition-transform duration-300 hover:scale-105">


                              <div className="grid gap-4 justify-items-center">


                                    <p className='mt-6 text-2xl text-slate-500 text-center'>Amount of Parking Spaces</p>
                                    <div className='flex justify-center gap-4'>
                                          <input
                                                type="number"
                                                name="twoWheels"
                                                value={formData.twoWheels}
                                                onChange={handleChange}
                                                placeholder="Total 2 Wheels"
                                                className="p-4 w-[30%] border-4 text-center bg-vanilla border-bloe rounded-full text-lg transition-all duration-300 focus:bg-blue-50 focus:border-blue-500 hover:shadow-lg"
                                                required
                                          />
                                          <input
                                                type="number"
                                                name="threeAndFourWheels"
                                                value={formData.threeAndFourWheels}
                                                onChange={handleChange}
                                                placeholder="Total 3/4 Wheels"
                                                className="p-4 border-4 w-[30%] text-center bg-vanilla border-bloe rounded-full text-lg transition-all duration-300 focus:bg-blue-50 focus:border-blue-500 hover:shadow-lg"
                                                required
                                          />
                                    </div>


                                    <p className='mt-6 text-2xl text-slate-500 text-center'>Price Per Ticket</p>
                                    <input
                                          type="number"
                                          name="pricePerTicket"
                                          value={formData.pricePerTicket}
                                          onChange={handleChange}
                                          placeholder="PHP 50.00"
                                          className="p-4 w-[70%] border-4 text-center bg-vanilla border-bloe rounded-full text-xl transition-all duration-300 focus:bg-blue-50 focus:border-blue-500 hover:shadow-lg"
                                          required
                                    />

                                    <p className='mt-6 text-2xl text-slate-500 text-center'>(optional) Hours Limit</p>
                                    <input
                                          type="number"
                                          name="hoursLimit"
                                          value={formData.hoursLimit}
                                          onChange={handleChange}
                                          placeholder="3 HOURS"
                                          className="p-4 border-4 w-[70%] text-center bg-vanilla border-bloe rounded-full text-xl transition-all duration-300 focus:bg-blue-50 focus:border-blue-500 hover:shadow-lg"
                                    />

                                    <p className='mt-6 text-2xl text-slate-500 text-center'>(optional) Ovetime Fee</p>
                                    <input
                                          type="number"
                                          name="overTimeFees"
                                          value={formData.overTimeFees}
                                          onChange={handleChange}
                                          placeholder="PHP 20.00"
                                          className="p-4 border-4 w-[70%] bg-vanilla text-center border-bloe rounded-full text-xl transition-all duration-300 focus:bg-blue-50 focus:border-blue-500 hover:shadow-lg"
                                    />

                                    {formError ? <p className="text-red-500 text-center text-lg">{formError}</p> : <br />}

                                    <button
                                          type="submit"
                                          className="px-12  bg-greenWich/40 rounded-full py-4 text-xl font-bold hover:scale-90 border-4 border-bloe"
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
