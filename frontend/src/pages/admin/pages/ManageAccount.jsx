import React, { useEffect, useState, useRef } from 'react'
import { IoCloseOutline } from "react-icons/io5";
import axios from 'axios'
import etits, { Toaster } from 'react-hot-toast';
import { MdLocalPrintshop } from "react-icons/md";

import { FaFilter } from "react-icons/fa";

const ManageAccount = () => {

      const invoiceRef = useRef(null);

      const [users, setUsers] = useState([]);
      const [editName, setEditName] = useState("");
      const [editUsername, setEditUsername] = useState("");
      const [editPassword, setEditPassword] = useState("");


      const [showDeact, setShowDeact] = useState(false);
      const [showAct, setShowAct] = useState(false);

      const [editShow, setEditShow] = useState(false);


      // Filter Function
      const handleAct = () => {
            setShowAct(!showAct);
            setShowDeact(false);
            setOyGalaw(!oyGalaw)


      }
      const handleDeact = () => {
            setShowDeact(!showDeact);
            setShowAct(false);
            setOyGalaw(!oyGalaw)

      }







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
                        // setUsers(response.data)
                        if (!showAct && !showDeact)
                              setUsers(response.data)
                        else if (showAct)
                              setUsers(
                                    response.data.filter(user => user.status === true)
                              )
                        else if (showDeact)
                              setUsers(
                                    response.data.filter(user => user.status === false)
                              )
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

      console.log("nag rendered")
      console.log("SHOW ACTIVATE ONLY", showAct)
      console.log("SHOW DEACTIVATE ONLY", showDeact)


      const handlePrint = () => {
            if (!invoiceRef.current) {
                  console.error("Invoice reference is missing");
                  return;
            }

            const printWindow = window.open('', '', 'height=842,width=595');
            const invoiceContent = invoiceRef.current.innerHTML;

            if (!printWindow) {
                  console.error("Failed to open print window");
                  return;
            }

            const printContent = `
              <html>
                <head>
                  <title>Print Employees Account</title>
                  <style>
                    @media print {
                      @page { size: A4; margin: 20mm; }
                      body { font-family: Arial, sans-serif; margin: 0; }
                      table { width: 100%; border-collapse: collapse; }
                      th, td { border: 1px solid black; padding: 8px; text-align: center; }
                      th { background-color: #f2f2f2; }
                      .no-print { display: none; }
                    }
                  </style>
                </head>
                <body>
                  <h2>Employees Accounts</h2>
                  ${invoiceContent}
                </body>
              </html>
            `;

            printWindow.document.open();
            printWindow.document.write(printContent);
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
      };
      return (
            <>

                  <div className='mx-[10%] h-max-700:mt-[35vh] mt-[25vh] w-[80vw] text-deepBlue'>

                        {/* CONTENT */}

                        <div className="font-bold w-[96%] relative pt-14 pb-8 bg-white border-4 border-bloe mx-auto px-12 rounded-3xl ">


                              <p className='border-4 font-bold border-deepBlue absolute top-4 left-[-35px] bg-yeelow py-1 px-8 text-lg rounded-3xl '>Manage Account</p>

                              <div className='mt-4 flex justify-between items-center gap-4'>
                                    {/* Left side: Activate and Deactivate buttons */}
                                    <div className='flex gap-4'>
                                          <button onClick={handleAct} className='font-extrabold h-12 bg-green-500 hover:scale-95 rounded-2xl p-2 px-4 text-white'>
                                                <FaFilter className='inline text-2xl' /> Activate Only
                                          </button>
                                          <button onClick={handleDeact} className='font-extrabold h-12 bg-red-600 hover:scale-95 rounded-2xl p-2  text-white'>
                                                <FaFilter className='inline text-2xl' /> Deactivate Only
                                          </button>
                                    </div>

                                    {/* Right side: Print button */}
                                    <button onClick={handlePrint} className='font-extrabold h-12 bg-bloe hover:scale-95 rounded-2xl p-2 px-4 text-white'>
                                          <MdLocalPrintshop className='inline text-2xl' /> Print Reports
                                    </button>
                              </div>




                              {/* table */}
                              <div ref={invoiceRef}>
                                    <table className='mt-4 w-full h-auto '>
                                          <thead>
                                                <tr className='border-b-4 border-bloe'>

                                                      <th className="border-r-4 border-bloe" >Number</th>
                                                      <th className="border-r-4 border-bloe" >Username</th>
                                                      <th className="border-r-4 border-bloe" >Name</th>
                                                      <th className="border-r-4 border-bloe" >Status</th>
                                                      <th className='no-print'>Action</th>

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

                                                                        <td className="w-[30%] no-print">

                                                                              <button
                                                                                    className='bg-deepBlue py-1 px-8 mx-4 rounded-lg text-white hover:scale-95 '
                                                                                    onClick={() => handleEditButton(user.name, user.username, user.password)}
                                                                              >
                                                                                    Edit
                                                                              </button>

                                                                              {user.status ?
                                                                                    (
                                                                                          <button onClick={() => handleAction(user)} className='text-white bg-greenWich hover:scale-95  py-1 px-[25px]  rounded-lg'>Activated</button>

                                                                                    )
                                                                                    :
                                                                                    (
                                                                                          <button onClick={() => handleAction(user)} className='text-white bg-[#972222] hover:scale-95  py-1  px-4 rounded-lg'>Deactivated</button>
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
                  < Toaster
                  />

            </>

      )
}

export default ManageAccount