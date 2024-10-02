import React, { useState, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const Settings = () => {
      const [companyName, setCompanyName] = useState("");
      const [parkingRules, setParkingRules] = useState("");
      const [twoWheels, setTwoWheels] = useState(0);
      const [threeAndFourWheels, setThreeAndFourWheels] = useState(0);
      const [pricePerTicket, setPricePerTicket] = useState(0);
      const [hoursLimit, setHoursLimit] = useState(0);
      const [overTimeFees, setOverTimeFees] = useState(0);
      const [selectedImage, setSelectedImage] = useState('/capture.png'); // Default image
      const fileInputRef = useRef(null);

      const formatParkingRules = (rules) => {
            return rules.split('\n').map(line => `${line.trim()}`).join('\n');
      };

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
                        console.error('Error uploading file:', error);
                  }
            }
      };

      const handleButton = () => {
            if (!companyName || !parkingRules || !twoWheels || !threeAndFourWheels || !pricePerTicket) {
                  Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Please fill out all required fields!',
                  });
                  return;
            }

            const formattedParkingRules = formatParkingRules(parkingRules);

            const data = {
                  companyName,
                  parkingRules: formattedParkingRules,
                  twoWheels,
                  threeAndFourWheels,
                  pricePerTicket,
                  hoursLimit,
                  overTimeFees,
                  image: selectedImage // Include the image URL in the data
            };

            axios.put('http://localhost:8000/settings', data)
                  .then(res => {
                        Swal.fire({
                              position: "center",
                              icon: "success",
                              title: "Company Details Registered Successfully",
                              showConfirmButton: false,
                              timer: 1500
                        });
                        console.log(res.data);
                  })
                  .catch(err => {
                        console.log(err);
                  });
      };

      return (
            <div className='mx-[10%] h-max-700:mt-[35vh] mt-[25vh] w-[80vw] text-deepBlue'>
                  <div className="font-bold relative pt-12 shadow-2xl border-4 border-bloe bg-white mx-8 rounded-3xl min-h-screen h-auto">
                        <div className='flex min-h-screen justify-center p-20'>
                              {/* Left */}
                              <div className='px-16 flex flex-col items-center'>
                                    <p className='text-6xl text-bloe'>DETAILS</p>
                                    <div
                                          onClick={handleUpload}
                                          className="cursor-pointer my-10"
                                          style={{
                                                overflow: 'hidden',
                                                borderRadius: selectedImage === '/capture.png' ? '0%' : '50%',
                                          }}
                                    >
                                          <img
                                                src={selectedImage}
                                                alt="Click to upload"
                                                style={{
                                                      width: '400px',
                                                      height: '376px',
                                                      objectFit: 'cover',
                                                }}
                                          />
                                    </div>
                                    <input
                                          onChange={e => setCompanyName(e.target.value)}
                                          type="text"
                                          className='text-center rounded-3xl w-[90%] py-4 border-4 border-bloe'
                                          placeholder='Company Name'
                                          required
                                    />
                                    <textarea
                                          onChange={e => setParkingRules(e.target.value)}
                                          className='overflow-y-auto rounded-3xl p-4 text-pretty text-center border-4 m-4 border-bloe'
                                          rows="9"
                                          cols="40"
                                          placeholder='Company Rules'
                                          required
                                    ></textarea>
                              </div>

                              {/* Right */}
                              <div className='mx-auto px-40 text-center'>
                                    <p className='text-3xl text-bloe my-4'>Total Parking Spaces</p>
                                    <div className='flex gap-4 justify-center'>
                                          <input
                                                onChange={e => setTwoWheels(e.target.value)}
                                                type="number"
                                                className='border-4 p-4 w-40 rounded-3xl text-center border-bloe'
                                                placeholder='2 wheels'
                                                required
                                          />
                                          <input
                                                onChange={e => setThreeAndFourWheels(e.target.value)}
                                                type="number"
                                                className='border-4 p-4 w-40 rounded-3xl text-center border-bloe'
                                                placeholder='3/4 wheels'
                                                required
                                          />
                                    </div>

                                    <p className='mt-8 text-3xl'>Price per ticket</p>
                                    <input
                                          onChange={e => setPricePerTicket(e.target.value)}
                                          type="number"
                                          className='rounded-3xl m-2 w-full text-4xl text-center py-4 border-4 border-bloe'
                                          placeholder='PHP 30.00'
                                          required
                                    />

                                    <p className='mt-8 text-3xl'>(Optional) Hours Limit</p>
                                    <input
                                          onChange={e => setHoursLimit(e.target.value)}
                                          type="number"
                                          className='rounded-3xl m-2 w-full text-4xl text-center py-4 border-4 border-bloe'
                                          placeholder='3 HOURS'
                                    />

                                    <p className='mt-8 text-3xl'>(Optional) Overtime Ticket</p>
                                    <input
                                          onChange={e => setOverTimeFees(e.target.value)}
                                          type="number"
                                          className='rounded-3xl m-2 w-full text-4xl text-center py-4 border-4 border-bloe'
                                          placeholder='PHP 20.00'
                                    />

                                    <button
                                          onClick={handleButton}
                                          className='mt-12 bg-greenWich  hover:contrast-150 hover:scale-90 text-offWhite py-8 px-16 rounded-3xl text-xl font-bold'
                                    >
                                          Save Changes
                                    </button>
                              </div>
                        </div>
                  </div>

                  <input
                        ref={fileInputRef}
                        type="file"
                        style={{ display: 'none' }}
                        accept="image/*"
                        onChange={handleFileChange}
                  />
            </div>
      );
};

export default Settings;
