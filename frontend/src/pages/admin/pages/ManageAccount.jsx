import React, { useEffect, useState } from 'react'
import axios from 'axios'
const ManageAccount = () => {

      const [users, setUsers] = useState([]);
      const [oyGalaw, setOyGalaw] = useState(false);
      useEffect(() => {
            axios.get("http://localhost:8000/user")
                  .then(response => {
                        setUsers(response.data)
                  })
                  .catch(err => console.log(err))

      }, [oyGalaw])

      const handleAction = async (currentObject) => {

            currentObject.status ?
                  await axios.put(`http://localhost:8000/user/${currentObject._id}`, { ...currentObject, status: false })
                  :
                  await axios.put(`http://localhost:8000/user/${currentObject._id}`, { ...currentObject, status: true })

            setOyGalaw(!oyGalaw);
      }


      console.log("manage-user here")
      console.log(users)


      return (
            <div className='absolute left-[200px] top-[100px] overflow-x-hidden max-sm:hidden'>
                  <div className="ml-4 bg-[#D9D9D9] min-h-screen rounded-3xl" style={{ width: 'calc(100vw - 250px)' }}>
                        <div className="title flex justify-center">
                              <h2 className='text-5xl my-8 font-extrabold' >Manage Account</h2>
                        </div>

                        {/* CONTENT */}

                        <div className="bg-[#D6D0C4] mx-8 rounded-3xl h-auto ">

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
                                                      return (
                                                            <tr className='h-12 hover:bg-[#C9B7B7] rounded-3xl' key={index}>

                                                                  <td><button className='bg-[#6181D3] py-1 px-4 rounded-lg text-white hover:bg-[#425a96] '>Edit</button></td>
                                                                  <td className='w-2'>{index + 1}</td>
                                                                  <td>{user.username}</td>
                                                                  <td>{user.name}</td>
                                                                  <td>{user.status ? "Active" : "Inactive"}</td>

                                                                  <td>{user.status ?
                                                                        (
                                                                              <button onClick={() => handleAction(user)} className='text-white bg-[#B96F6F] py-1 px-4 rounded-lg'>Deactivate</button>
                                                                        )
                                                                        :
                                                                        (
                                                                              <button onClick={() => handleAction(user)} className='text-white bg-[#53AC5C] py-1 px-[25px] rounded-lg'>Activate</button>
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
      )
}

export default ManageAccount