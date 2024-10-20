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
            confirmPassword: '',
            isChecked: false,
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
            const { name, value, type, checked } = e.target;
            setFormData({
                  ...formData,
                  [name]: type === 'checkbox' ? checked : value,
            });
      };

      const handleSubmit = async (e) => {
            e.preventDefault();

            const { name, username, password, confirmPassword, isChecked } = formData;

            if (!isChecked) {
                  setFormError('Please agree to the terms by checking the box.');
                  return;
            }

            if (password !== confirmPassword) {
                  setFormError('Passwords do not match.');
                  return;
            }

            if (!name || !username || !password || !confirmPassword) {
                  setFormError('Please fill in all the fields.');
                  return;
            }

            try {
                  await axios.put('http://localhost:8000/admin', {
                        name,
                        username,
                        password,
                  });


                  navigate('/admin/home/settings');
            } catch (error) {
                  setFormError('Error updating admin details. Please try again.');
                  console.error('Error:', error);
            }
      };

      const [loading, setLoading] = useState(true);

      useEffect(() => {
            setTimeout(() => {
                  setLoading(false)
            }, 1000)
      }, [])

      if (loading) {
            return (
                  <div className="bg-[url('/BG.png')] bg-cover flex justify-center items-center h-screen">

                        <img src="/moving-car.gif" alt="" />
                  </div>
            );
      }

      return (
            <>
                  <div className="min-h-screen pb-20 bg-[url('/BG.png')] bg-cover bg-bottom bg-no-repeat flex justify-center">

                        {/* back button */}
                        <div data-aos="fade-down" className='z-20 absolute w-48 h-48 left-12 cursor-pointer top-[-30px] hover:scale-y-90 '>
                              <img onClick={() => navigate("/")} src="/BACK.png" alt="" className='absolute w-48 h-48 left-12 cursor-pointer top-[-30px] hover:scale-y-90 ' />
                        </div>

                        <div data-aos="zoom-in">
                              <div className="transition-transform duration-300 hover:scale-105 h-max-700:w-screen ml-40 h-max-700:px-30 py-20 h-max-700:ml-10  mt-16 bg-[url('/Polygon.png')] h-max-700:h-auto h-[90vh] w-[70vw] h-max-700:bg-cover bg-contain bg-no-repeat">
                                    <form onSubmit={handleSubmit}>
                                          <div className="flex ml-[-200px] justify-center h-full">
                                                <div className="flex flex-col px-4 w-[35%] gap-7 font-bold text-xl">
                                                      <h2 className="text-4xl tracking-wider text-[#001858] font-extrabold">SETTING UP</h2>
                                                      <p className="text-2xl w-[90%] text-balance text-[#001858]">
                                                            Welcome to ParKaid! Let's get you started.
                                                      </p>
                                                      <p className="w-[70%] text-balance text-[#001858]">
                                                            As you Signup. You will be assigned to be the Admin of our System.
                                                      </p>
                                                      <input
                                                            type="text"
                                                            name="name"
                                                            value={formData.name}
                                                            onChange={handleChange}
                                                            placeholder="Admin Name"
                                                            className="p-3 rounded-2xl w-[70%] border-4 bg-vanilla border-[#001858] transition-all duration-300  focus:border-bloe outline-none"
                                                            required
                                                      />
                                                      <input
                                                            type="text"
                                                            name="username"
                                                            value={formData.username}
                                                            onChange={handleChange}
                                                            placeholder="Username"
                                                            className="p-3 rounded-2xl w-[70%] border-4 bg-vanilla border-[#001858] transition-all duration-300  focus:border-bloe outline-none"
                                                            required
                                                      />
                                                      <input
                                                            type="password"
                                                            name="password"
                                                            value={formData.password}
                                                            onChange={handleChange}
                                                            placeholder="Password"
                                                            className="p-3 rounded-2xl w-[70%] border-4 bg-vanilla border-[#001858] transition-all duration-300  focus:border-bloe outline-none"
                                                            required
                                                      />
                                                      <input
                                                            type="password"
                                                            name="confirmPassword"
                                                            value={formData.confirmPassword}
                                                            onChange={handleChange}
                                                            placeholder="Re-type Password"
                                                            className="p-3 rounded-2xl w-[70%] border-4 bg-vanilla border-[#001858] transition-all duration-300  focus:border-bloe outline-none"
                                                            required
                                                      />
                                                </div>

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
                                                            PROCEED?
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
