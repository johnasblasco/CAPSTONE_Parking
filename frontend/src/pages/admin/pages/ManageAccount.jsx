import React, { useEffect, useState } from 'react'
import { IoCloseOutline } from "react-icons/io5";
import axios from 'axios'
import etits, { Toaster } from 'react-hot-toast';
import Navbar from '../components/Navbar';
import Header from '../components/Header';

const ManageAccount = () => {

      const [users, setUsers] = useState([]);
      const [editName, setEditName] = useState("");
      const [editUsername, setEditUsername] = useState("");
      const [editPassword, setEditPassword] = useState("");

      const [editShow, setEditShow] = useState(false);


      // Cleanup function to clear all toasts when component unmounts
      useEffect(() => {
            return () => {
                  etits.dismiss(); // Dismiss all toasts
            };
      }, []);


      const handleEditButton = (name, username, password) => {
            setEditName(name)
            setEditUsername(username)
            setEditPassword(password)
            setEditShow(!editShow)

      }

      // newData
      let id;
      const [newName, setNewName] = useState("")
      const [newUsername, setNewUserName] = useState("")
      const [newPassword, setNewPassword] = useState("")

      const handleSaveButton = async () => {
            try {
                  await axios.put(`http://localhost:8000/user/${id}`, {
                        name: newName,
                        username: newUsername,
                        password: newPassword
                  })
                  etits.success("Edit success")
                  // clear value
                  setNewName("")
                  setNewUserName("")
                  setNewPassword("")

                  // palitan ng laman placeholder
                  setEditName(newName)
                  setEditUsername(newUsername)
                  setEditPassword(newPassword)

                  // render
                  setOyGalaw(!oyGalaw)

            } catch (error) {
                  console.log(error)
            }

      }


      const [oyGalaw, setOyGalaw] = useState(false);
      useEffect(() => {
            axios.get("http://localhost:8000/user")
                  .then(response => {
                        setUsers(response.data)
                  })
                  .catch(err => console.log(err))

      }, [oyGalaw])

      const handleAction = async (currentObject) => {

            if (currentObject.status) {
                  await axios.put(`http://localhost:8000/user/${currentObject._id}`, { ...currentObject, status: false })
                  etits.error("DEACTIVATED")

            }

            else {
                  await axios.put(`http://localhost:8000/user/${currentObject._id}`, { ...currentObject, status: true })
                  etits.success("ACTIVATED")
            }
            setOyGalaw(!oyGalaw);


      }
      const clearDataWhenEx = () => {
            setNewName("")
            setNewUserName("")
            setNewPassword("")
            setEditShow(!editShow)
      }

      console.log("manage-user here")
      console.log(users)


      return (
            <>
                  <Header />

                  <div className='absolute left-[200px] top-[100px] overflow-x-hidden max-sm:hidden'>
                        <div className="ml-4 bg-[#D9D9D9] min-h-screen rounded-3xl" style={{ width: 'calc(100vw - 250px)' }}>
                              <div className="title flex justify-center">
                                    <h2 className='text-5xl my-8 font-extrabold' >Manage Account</h2>
                              </div>

                              {/* CONTENT */}

                              <div className="bg-[#D6D0C4] mx-8 rounded-3xl min-h-screen h-auto ">

                                    <div className="flex justify-center">
                                          <span className='bg-[#94AB95] px-4 py-1 m-4 rounded-2xl '>List</span>
                                    </div>

                                    {/* table */}

                                    <table className='w-5/6 mx-auto h-auto'>
                                          <thead>
                                                <tr>
                                                      <th className=''></th>
                                                      <th>Number</th>
                                                      <th>Username</th>
                                                      <th>Name</th>
                                                      <th>Status</th>
                                                      <th>Action</th>


                                                </tr>
                                                <tr>
                                                      <td className='bg-gray-900 p-[0.1px]' colSpan="6" />
                                                </tr>
                                                <tr>
                                                      <td><br /></td>
                                                </tr>
                                          </thead>
                                          <tbody className='text-center'>
                                                {
                                                      users.map((user, index) => {

                                                            id = user._id;

                                                            return (
                                                                  <tr className='h-12 hover:bg-[#C9B7B7] rounded-3xl' key={index}>

                                                                        <td><button
                                                                              className='bg-[#6181D3] py-1 px-4 rounded-lg text-white hover:bg-[#425a96] '
                                                                              onClick={() => handleEditButton(user.name, user.username, user.password)}
                                                                        >Edit</button></td>
                                                                        <td className='w-2'>{index + 1}</td>
                                                                        <td>{user.username}</td>
                                                                        <td>{user.name}</td>
                                                                        <td>{user.status ? "Active" : "Inactive"}</td>

                                                                        <td>{user.status ?
                                                                              (
                                                                                    <button onClick={() => handleAction(user)} className='text-white bg-[#B96F6F] hover:bg-[#a54f4f]  py-1 px-4 rounded-lg'>Deactivate</button>

                                                                              )
                                                                              :
                                                                              (
                                                                                    <button onClick={() => handleAction(user)} className='text-white bg-[#5cc967] hover:bg-[#3c8143]  py-1 px-[25px] rounded-lg'>Activate</button>
                                                                              )
                                                                        }</td>
                                                                  </tr>

                                                            )
                                                      })
                                                }

                                          </tbody>
                                    </table>

                              </div>

                        </div>
                  </div >
                  {/* TOASTER */}
                  <Toaster
                  />

                  {/* POP UP */}
                  {
                        editShow &&
                        // background
                        <div className='bg-black/40 fixed z-50 w-screen h-screen z-100 flex items-center justify-center'>

                              <div className='bg-[#D9D9D9] w-[60vw] absolute left-[25vw] top-[20%] rounded-3xl '>

                                    {/* EKIS */}
                                    <IoCloseOutline className='absolute text-4xl right-5 top-5 cursor-pointer' onClick={clearDataWhenEx} />

                                    {/* content */}
                                    <div className=' overflow-auto mt-16 mx-32 h-[65vh] pb-5 flex flex-col gap-6'>

                                          <div className='flex items-center gap-16'>
                                                <label htmlFor="">Full Name</label>
                                                <input className='py-4 px-8 rounded-xl flex-1 bg-[#C4B9A9] placeholder-gray-800' placeholder={editName} value={newName} onChange={e => setNewName(e.target.value)} type="text" />
                                          </div>

                                          <div className='flex items-center gap-6'>
                                                <label htmlFor="">New Username</label>
                                                <input className='py-4 px-8 rounded-xl flex-1 bg-[#C4B9A9] placeholder-gray-800' placeholder={editUsername} value={newUsername} onChange={e => setNewUserName(e.target.value)} type="text" />
                                          </div>

                                          <div className='flex items-center gap-8'>
                                                <label htmlFor="">New Password</label>
                                                <input className='py-4 px-8 rounded-xl flex-1 bg-[#C4B9A9] placeholder-gray-800' placeholder={editPassword} value={newPassword} onChange={e => setNewPassword(e.target.value)} type="password" />
                                          </div>

                                          <div className='flex justify-center w-full' >
                                                <button className=' hover:bg-[#56945c] bg-[#75B37B] text-white py-4 px-8 w-fit mt-6 rounded-2xl text-lg font-bold' onClick={handleSaveButton}>Save</button>
                                          </div>
                                    </div>


                              </div>
                        </div>
                  }
                  {/* NAV */}
                  <Navbar />
            </>

      )
}

export default ManageAccount