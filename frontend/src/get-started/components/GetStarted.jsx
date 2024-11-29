import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const GetStarted = () => {
      const fileInputRef = useRef(null);
      const [selectedImage, setSelectedImage] = useState('/capture.png');
      const [formData, setFormData] = useState({
            name: '',
            username: '',
            password: '',
            confirmPassword: '', // Added confirmPassword field
            isChecked: false,
      });
      const [formError, setFormError] = useState('');
      const navigate = useNavigate();
      const [loading, setLoading] = useState(true);

      const handleUpload = () => {
            fileInputRef.current.click();
      };

      const handleFileChange = async (e) => {
            const file = e.target.files[0];

            if (file) {
                  const formData = new FormData();
                  formData.append('image', file);

                  try {
                        const response = await axios.post('https://capstone-parking.onrender.com/upload', formData, {
                              headers: {
                                    'Content-Type': 'multipart/form-data',
                              },
                        });

                        const imageUrl = `https://capstone-parking.onrender.com${response.data.filePath}`;
                        setSelectedImage(imageUrl);
                        console.log('File uploaded:', imageUrl);
                  } catch (error) {
                        console.error('Error uploading file:', error.response ? error.response.data : error.message);
                        setFormError('Error uploading file. Please try again.');
                  }
            }
      };

      const handleChange = (e) => {
            const { name, value, type, checked } = e.target;
            setFormData({
                  ...formData,
                  [name]: type === 'checkbox' ? checked : value,
            });
      };

      const handleSubmit = async (e) => {
            e.preventDefault();

            const { name, username, password, confirmPassword, isChecked } = formData;

            // Validate terms agreement
            if (!isChecked) {
                  Swal.fire('Error', 'Please agree to the terms by checking the box.', 'error');
                  return;
            }

            // Validate required fields
            if (!name || !username || !password || !confirmPassword) {
                  Swal.fire('Error', 'Please fill in all the fields.', 'error');
                  return;
            }

            // Validate matching passwords
            if (password !== confirmPassword) {
                  Swal.fire('Error', 'Passwords do not match.', 'error');
                  return;
            }

            try {
                  // Fetch all users and check if the username exists
                  const response = await axios.get('https://capstone-parking.onrender.com/user');
                  const users = response.data;

                  const usernameExists = users.some(user => user.username === username);

                  if (usernameExists) {
                        Swal.fire('Error', 'The username is already taken. Please choose another.', 'error');
                        return; // Stop further execution
                  }

                  // If username is unique, proceed with registration
                  const userData = {
                        name,
                        username,
                        password,
                        status: false,
                        login: false,
                  };

                  await axios.post('https://capstone-parking.onrender.com/user', userData);

                  Swal.fire('Success', 'User created! Awaiting admin activation.', 'success').then(() => {
                        setFormData({
                              name: '',
                              username: '',
                              password: '',
                              confirmPassword: '',
                              isChecked: false,
                        });
                        navigate('/');
                  });
            } catch (error) {
                  console.error('Error creating user:', error.response?.data || error.message);
                  Swal.fire('Error', 'An error occurred. Please try again.', 'error');
            }
      };




      useEffect(() => {
            setTimeout(() => {
                  setLoading(false);
            }, 1000);
      }, []);

      if (loading) {
            return (
                  <div className="bg-[url('/BG.png')] bg-cover flex justify-center items-center h-screen">
                        <img src="/moving-car.gif" alt="Loading..." />
                  </div>
            );
      }
      return (
            <>
                  <div className="min-h-screen pb-20 bg-[url('/BG.png')] bg-cover bg-bottom bg-no-repeat flex justify-center">
                        {/* Back Button */}
                        <div data-aos="fade-down" className='z-20 absolute left-12 w-40 h-32 cursor-pointer top-2 hover:scale-y-90'>
                              <img onClick={() => navigate("/")} src="/BACK.png" alt="Back" className='absolute left-12 cursor-pointer top-[-30px] hover:scale-y-90' />
                        </div>

                        <div data-aos="zoom-in">
                              <div className="md:mt-[15vh] transition-transform duration-300 hover:scale-105 ml-40 h-max-700:px-30 py-20 h-max-700:ml-10 mt-16 bg-[url('/Polygon.png')] h-max-700:h-auto h-[750px] w-[1400px] h-max-700:bg-cover bg-contain bg-no-repeat">
                                    <form onSubmit={handleSubmit}>
                                          <div className="flex ml-[-200px] justify-center h-full">
                                                {/* Form Fields */}
                                                <div className="flex flex-col px-4 w-[35%] gap-7 font-bold text-xl">
                                                      <h2 className="text-4xl tracking-wider text-[#001858] font-extrabold">GET STARTED</h2>
                                                      <p className="text-2xl w-[90%] text-balance text-[#001858]">
                                                            Welcome to ParKaid! Let's get you started.
                                                      </p>
                                                      <p className="w-[70%] text-balance text-[#001858]">
                                                            Create a user account to begin.
                                                      </p>

                                                      {/* Input Fields */}
                                                      <input
                                                            type="text"
                                                            name="name"
                                                            value={formData.name}
                                                            onChange={handleChange}
                                                            placeholder="Full Name"
                                                            className="p-3 rounded-2xl w-[70%] border-4 bg-vanilla border-[#001858] transition-all duration-300 focus:border-bloe outline-none"
                                                            required
                                                      />
                                                      <input
                                                            type="text"
                                                            name="username"
                                                            value={formData.username}
                                                            onChange={handleChange}
                                                            placeholder="Username"
                                                            className="p-3 rounded-2xl w-[70%] border-4 bg-vanilla border-[#001858] transition-all duration-300 focus:border-bloe outline-none"
                                                            required
                                                      />
                                                      <input
                                                            type="password"
                                                            name="password"
                                                            value={formData.password}
                                                            onChange={handleChange}
                                                            placeholder="Password"
                                                            className="p-3 rounded-2xl w-[70%] border-4 bg-vanilla border-[#001858] transition-all duration-300 focus:border-bloe outline-none"
                                                            required
                                                      />
                                                      <input
                                                            type="password"
                                                            name="confirmPassword"
                                                            value={formData.confirmPassword}
                                                            onChange={handleChange}
                                                            placeholder="Confirm Password"
                                                            className="p-3 rounded-2xl w-[70%] border-4 bg-vanilla border-[#001858] transition-all duration-300 focus:border-bloe outline-none"
                                                            required
                                                      />
                                                </div>

                                                {/* Upload Section */}
                                                <div className="flex flex-col gap-8 items-center">
                                                      <div
                                                            onClick={handleUpload}
                                                            className="cursor-pointer transition-transform duration-300 hover:scale-105"
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

                                                      <button type="submit" className="w-fit py-3 px-12 rounded-full text-2xl font-bold border-4 border-[#001858] bg-greenWich/80 hover:scale-105 hover:contrast-125 hover:shadow-lg text-bloe transition-all duration-300">
                                                            REGISTER
                                                      </button>

                                                      <div className="w-56 text-wrap">
                                                            <input
                                                                  className="h-5 w-5 mx-2"
                                                                  type="checkbox"
                                                                  name="isChecked"
                                                                  checked={formData.isChecked}
                                                                  onChange={handleChange}
                                                                  id="chk"
                                                            />
                                                            <label htmlFor="chk" className='text-[#001858]'>
                                                                  By clicking this, you agree to our Terms of Service and Privacy Policy.
                                                            </label>
                                                      </div>

                                                      {formError && <p className="text-red-600">{formError}</p>}
                                                </div>
                                          </div>
                                    </form>
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
            </>
      );
};

export default GetStarted;
