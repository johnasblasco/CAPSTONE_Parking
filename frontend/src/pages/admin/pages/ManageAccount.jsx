import React, { useEffect, useState } from 'react'
import { IoCloseOutline } from "react-icons/io5";
import axios from 'axios'
import etits, { Toaster } from 'react-hot-toast';

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

                  <div className='mx-[10%] h-max-700:mt-[35vh] mt-[25vh] w-[80vw] text-deepBlue'>



                        {/* CONTENT */}

                        <div className="font-bold relative pt-24 pb-8 bg-white border-4 border-bloe w-[80%] mx-auto px-12 rounded-3xl ">


                              <p className='border-4 font-bold border-deepBlue absolute top-4 left-[-35px] bg-yeelow py-1 px-8 text-lg rounded-3xl '>Manage Account</p>

                              {/* table */}

                              <table className='w-full h-auto '>
                                    <thead>
                                          <tr className='border-b-4 border-bloe'>

                                                <th className="border-r-4 border-bloe" >Number</th>
                                                <th className="border-r-4 border-bloe" >Username</th>
                                                <th className="border-r-4 border-bloe" >Name</th>
                                                <th className="border-r-4 border-bloe" >Status</th>
                                                <th>Action</th>

                                          </tr>


                                    </thead>
                                    <tbody className='text-center'>
                                          {
                                                users.map((user, index) => {

                                                      id = user._id;

                                                      return (
                                                            <tr className='h-12 rounded-3xl' key={index}>


                                                                  <td className="border-r-4 border-bloe" >{index + 1}</td>
                                                                  <td className="border-r-4 border-bloe" >{user.username}</td>
                                                                  <td className="border-r-4 border-bloe" >{user.name}</td>
                                                                  <td className="border-r-4 border-bloe" >{user.status ? "Active" : "Inactive"}</td>

                                                                  <td className="w-fit">

                                                                        <button
                                                                              className='bg-[#6181D3] py-1 px-8 mx-4 rounded-lg text-white hover:bg-[#425a96] '
                                                                              onClick={() => handleEditButton(user.name, user.username, user.password)}
                                                                        >
                                                                              Edit
                                                                        </button>

                                                                        {user.status ?
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


                  </div >
                  {/* TOASTER */}
                  < Toaster
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
                                    <div className=' overflow-auto mt-16 mx-32  p-10 flex flex-col gap-6'>

                                          <div className='flex items-center gap-16'>
                                                <label htmlFor="">Full Name</label>
                                                <input className='py-4 px-8 rounded-xl flex-1 bg-[#C4B9A9] placeholder-black/50 ' placeholder={editName} value={newName} onChange={e => setNewName(e.target.value)} type="text" />
                                          </div>

                                          <div className='flex items-center gap-6'>
                                                <label htmlFor="">New Username</label>
                                                <input className='py-4 px-8 rounded-xl flex-1 bg-[#C4B9A9] placeholder-black/50 ' placeholder={editUsername} value={newUsername} onChange={e => setNewUserName(e.target.value)} type="text" />
                                          </div>

                                          <div className='flex items-center gap-8'>
                                                <label htmlFor="">New Password</label>
                                                <input className='py-4 px-8 rounded-xl flex-1 bg-[#C4B9A9] placeholder-black/50 ' placeholder={editPassword} value={newPassword} onChange={e => setNewPassword(e.target.value)} type="password" />
                                          </div>

                                          <div className='flex justify-center w-full' >
                                                <button className=' hover:bg-[#56945c] bg-[#75B37B] text-white py-4 px-8 w-fit mt-6 rounded-2xl text-lg font-bold' onClick={handleSaveButton}>Save</button>
                                          </div>
                                    </div>


                              </div>
                        </div>
                  }
            </>

      )
}

export default ManageAccount