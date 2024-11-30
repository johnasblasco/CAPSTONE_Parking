import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { MdLocalPrintshop } from "react-icons/md";
import Swal from 'sweetalert2';

const ManageAccount = () => {
      const invoiceRef = useRef(null);
      const [users, setUsers] = useState([]);
      const [inactiveUsers, setInactiveUsers] = useState([]);
      const [search, setSearch] = useState("");
      const [oyGalaw, setOyGalaw] = useState(false);

      // Debounce function for search
      const debounce = (func, wait) => {
            let timeout;
            return (...args) => {
                  clearTimeout(timeout);
                  timeout = setTimeout(() => {
                        func.apply(this, args);
                  }, wait);
            };
      };

      const handleSearch = useCallback(
            debounce((searchTerm) => {
                  setSearch(searchTerm);
            }, 500),
            []
      );

      useEffect(() => {
            // Fetch all users
            axios.get("https://capstone-parking.onrender.com/user")
                  .then(response => {
                        const activeUsers = response.data.filter(user => user.status === true); // Active users
                        const inactiveUsers = response.data.filter(user => user.status === false); // Inactive users
                        setUsers(activeUsers);
                        setInactiveUsers(inactiveUsers);
                  })
                  .catch(err => console.log('Error fetching users:', err));
      }, [oyGalaw]); // Dependency to re-fetch on action

      const handleSaveButton = async (user) => {
            try {
                  const { value: formValues } = await Swal.fire({
                        title: "Edit Name, Username, and Password",
                        html: `
          <input id="swal-input1" class="swal2-input" placeholder="Name" value="${user.name}">
          <input id="swal-input2" class="swal2-input" placeholder="Username" value="${user.username}">
          <input id="swal-input3" type="password" class="swal2-input" placeholder="New Password">`,
                        focusConfirm: false,
                        preConfirm: () => {
                              const name = document.getElementById("swal-input1").value;
                              const username = document.getElementById("swal-input2").value;
                              const password = document.getElementById("swal-input3").value;
                              if (!name || !username || !password) {
                                    Swal.showValidationMessage("All fields are required!");
                                    return null;
                              }
                              return { name, username, password };
                        }
                  });

                  if (formValues) {
                        await axios.put(`https://capstone-parking.onrender.com/user/${user._id}`, {
                              name: formValues.name,
                              username: formValues.username,
                              password: formValues.password
                        });

                        Swal.fire("Edit success");
                        setOyGalaw(!oyGalaw);
                  }
            } catch (error) {
                  console.log(error);
            }
      };



      const handleAcceptUser = async (userId) => {
            try {
                  const response = await axios.put(
                        `https://capstone-parking.onrender.com/user/${userId}`,
                        { status: true }  // Ensure status is sent as a boolean
                  );
                  console.log(response.data);  // Log the response for debugging
                  setOyGalaw(!oyGalaw);  // Refresh state to reflect changes
            } catch (error) {
                  console.error("Error activating user:", error.response?.data || error.message);
            }
      };




      const handleDeleteUser = async (userId) => {
            try {
                  // Delete the user
                  await axios.delete(`https://capstone-parking.onrender.com/user/${userId}`);
                  setOyGalaw(!oyGalaw); // Trigger re-fetch of data
            } catch (error) {
                  console.log(error);
            }
      };

      return (
            <>
                  <div className='mx-[10%] h-max-700:mt-[35vh] mt-[25vh] w-[80vw] text-deepBlue'>
                        {/* Inactive Users Section */}
                        <div className="my-8 pt-3 rounded-xl bg-white shadow-md">
                              <p className="border-4 font-bold border-deepBlue w-fit ml-[-30px] bg-yellow-400 py-1 px-10 text-lg rounded-full shadow-lg">
                                    New Accounts
                              </p>
                              <ul className="list-none p-0 mt-4">
                                    {inactiveUsers.length === 0 ? (
                                          <p className="text-center text-gray-600">No new users</p>
                                    ) : (
                                          inactiveUsers
                                                .filter((user) => user.name.toUpperCase().includes(search.toUpperCase()))
                                                .map((user) => (
                                                      <li key={user._id} className="font-bold flex justify-between items-center p-3 border-b hover:bg-gray-50 transition-colors">
                                                            <span className="text-lg font-semibold">{user.name} - {user.username}</span>
                                                            <div className="flex space-x-2">
                                                                  <button
                                                                        className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-sm hover:bg-green-600 transition-colors"
                                                                        onClick={() => handleAcceptUser(user._id)}
                                                                        aria-label={`Accept ${user.name}`}
                                                                  >
                                                                        Accept
                                                                  </button>
                                                                  <button
                                                                        className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-sm hover:bg-red-600 transition-colors"
                                                                        onClick={() => handleDeleteUser(user._id)}
                                                                        aria-label={`Delete ${user.name}`}
                                                                  >
                                                                        Delete
                                                                  </button>
                                                            </div>
                                                      </li>
                                                ))
                                    )}
                              </ul>
                        </div>

                        <div className="font-bold min-h-[700px] relative pt-14 pb-8 bg-white border-4 border-bloe mx-auto px-12 rounded-2xl">
                              <p className='border-4 font-bold border-deepBlue absolute top-4 left-[-35px] bg-yeelow py-1 px-8 text-lg rounded-3xl'>Manage Account</p>

                              {/* SEARCH */}
                              <div className='mt-4 mb-20 ml-36 flex items-center gap-4'>
                                    <div className='flex mx-auto items-center gap-4'>
                                          <input
                                                onChange={(e) => handleSearch(e.target.value)}
                                                className="w-[25vw] border-gray-500 py-2 px-4 rounded-2xl font-bold text-xl text-center border-4 outline-8 outline-bloe placeholder-deepBlue/50"
                                                type="text"
                                                placeholder='Search by Account Name'
                                          />
                                          <button onClick={() => { }} className='bg-bloe hover:scale-95 hover:brightness-125 text-white text-xl  font-bold py-2 px-8 rounded-2xl border-2 border-bloe shadow-xl'>Search</button>
                                    </div>

                              </div>

                              {/* Active Users Table */}
                              <div>
                                    <table className='mt-4 w-full h-auto border-collapse'>
                                          <thead>
                                                <tr className='border-b-4 border-bloe'>
                                                      <th className="border-r-4 border-bloe px-2 py-2">Number</th>
                                                      <th className="border-r-4 border-bloe px-2 py-2">Name</th>
                                                      <th className="border-r-4 border-bloe px-2 py-2">Username</th>
                                                      <th className="border-r-4 border-bloe px-2 py-2">Status</th>
                                                      <th className='no-print border-bloe px-2 py-2'>Action</th>
                                                </tr>
                                          </thead>
                                          <tbody className='text-center'>
                                                {users
                                                      .filter((user) => user.name.toUpperCase().includes(search.toUpperCase()))
                                                      .map((user, index) => (
                                                            <tr className='hover:bg-vanilla h- 12 rounded-3xl' key={index}>
                                                                  <td className="border-r-4 border-bloe px-2 py-2">{index + 1}</td>
                                                                  <td className="border-r-4 border-bloe px-2 py-2">{user.name}</td>
                                                                  <td className="border-r-4 border-bloe px-2 py-2">{user.username}</td>
                                                                  <td className="border-r-4 border-bloe px-2 py-2">{user.status ? "Active" : "Inactive"}</td>
                                                                  <td className="no-print">
                                                                        <button
                                                                              className='bg-deepBlue py-1 px-8 rounded-lg text-white hover:scale-95'
                                                                              onClick={() => handleSaveButton(user)}
                                                                              aria-label={`Edit ${user.name}`}
                                                                        >
                                                                              Edit
                                                                        </button>
                                                                  </td>
                                                            </tr>
                                                      ))}
                                          </tbody>
                                    </table>
                              </div>
                        </div>
                  </div>

                  {/* TOASTER */}
                  <Toaster />
            </>
      );
};

export default ManageAccount;
