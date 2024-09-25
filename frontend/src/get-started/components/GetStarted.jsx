import React, { useRef, useState } from 'react';
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
                        console.error('Error uploading file:', error);
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
                  // Send a PUT request to update admin details
                  await axios.put('http://localhost:8000/admin', {
                        name,
                        username,
                        password,
                  });

                  // On success, navigate to another page (e.g., login)
                  Swal.fire({
                        title: "WELCOME TO PARKAID!",
                        text: "Your Account has been created successfully!",
                        icon: "success"
                  });
                  navigate('/admin/home/login-history');
            } catch (error) {
                  setFormError('Error updating admin details. Please try again.');
                  console.error('Error:', error);
            }
      };

      return (
            <>
                  <div className="min-h-screen pb-20 bg-[url('BG.png')] bg-cover bg-bottom bg-no-repeat flex justify-center">

                        <div className="h-max-700:w-screen h-max-700:px-30 py-20  h-max-700:ml-10 ml-40  mt-16 bg-[url('Polygon.png')] h-max-700:h-auto h-[90vh] w-[70vw] h-max-700:bg-cover bg-contain bg-no-repeat">
                              <form onSubmit={handleSubmit}>
                                    <div className="flex ml-[-200px] justify-center h-full">
                                          <div className="flex flex-col px-4 w-[35%] gap-7">
                                                <h2 className="text-4xl tracking-wider text-[#001858] font-extrabold">SETTING UP</h2>
                                                <p className=" text-2xl w-[90%] text-balance text-[#001858]">
                                                      Welcome to ParKaid! Let's get you started by setting up your account.
                                                </p>
                                                <p className="w-[70%] text-balance text-[#001858]">
                                                      As you Signup. You will be assigned to be the Admin of our System We'll ask you to provide some basic information to get started.
                                                </p>
                                                <input
                                                      type="text"
                                                      name="name"
                                                      value={formData.name}
                                                      onChange={handleChange}
                                                      placeholder="Name"
                                                      className="p-3 rounded-2xl w-[70%] border-4 bg-[#FFEFBA] border-[#001858]"
                                                      required
                                                />
                                                <input
                                                      type="text"
                                                      name="username"
                                                      value={formData.username}
                                                      onChange={handleChange}
                                                      placeholder="Username"
                                                      className="p-3 rounded-2xl w-[70%] border-4 bg-[#FFEFBA] border-[#001858]"
                                                      required
                                                />
                                                <input
                                                      type="password"
                                                      name="password"
                                                      value={formData.password}
                                                      onChange={handleChange}
                                                      placeholder="Password"
                                                      className="p-3 rounded-2xl w-[70%] border-4 bg-[#FFEFBA] border-[#001858]"
                                                      required
                                                />
                                                <input
                                                      type="password"
                                                      name="confirmPassword"
                                                      value={formData.confirmPassword}
                                                      onChange={handleChange}
                                                      placeholder="Re-type Password"
                                                      className="p-3 rounded-2xl w-[70%] border-4 bg-[#FFEFBA] border-[#001858]"
                                                      required
                                                />
                                          </div>

                                          <div className="flex flex-col gap-8 items-center">
                                                <div
                                                      onClick={handleUpload}
                                                      className="cursor-pointer"
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

                                                <button type="submit" className="w-fit py-4 px-8 rounded-full text-2xl font-bold border-4 border-[#001858] bg-[#8ED8A9] text-[#001858]">
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
                                                      <label htmlFor="chk" className='text-darkBloe'>
                                                            By clicking this, you agree to our Terms of Service and Privacy Policy.
                                                      </label>
                                                </div>

                                                {formError && <p className="text-red-600">{formError}</p>}
                                          </div>
                                    </div>
                              </form>
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
